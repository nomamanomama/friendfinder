var friends = require('../data/friends.js');
var maxScore = 10 * 5;
var matchScore = maxScore;
var match;
module.exports = function(app){
    app.get('/api/friends', function (req, res) {
        //This will be used to display a JSON of all possible friends.
        res.json(friends);
    })


    app.post('/api/friends', function (req, res) {
        // This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
        console.log(req.body);
        var friend = (req.body);
        var scores = friend.scores.split(",");

        friends.forEach(element => {
            var totalScore = 0;
            for (var i = 0; i < 10; i++){
                totalScore += Math.abs(parseInt(element.scores[i]) - parseInt(scores[i]) );
            }
            
            if (totalScore < matchScore){
                match = element;
                matchScore = totalScore;
            }
        });
        //add this person to list of friends
        friends.push(friend);
        //return match to posting function
        res.json(match);
    })
}

