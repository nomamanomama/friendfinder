var friends = require('../data/friends.js');

module.exports = function(app){
    app.get('/api/friends', function (req, res) {
        //This will be used to display a JSON of all possible friends.
        res.json(friends);
    })


    app.post('/api/friends', function (req, res) {
        // This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
        console.log(req.body);
        
        var scores = req.body.scores.split(",");
        
        var friend = {
            name: req.body.name,
            image: req.body.image,
            scores: scores
        };
        
        var maxScore = 10 * 5;
        var matchScore = maxScore;
        var match;

        friends.forEach(element => {
            //console.log("comparing friend: " + element.name);
            var totalScore = 0;
            for (var i = 0; i < 10; i++){
                totalScore += Math.abs(parseInt(element.scores[i]) - parseInt(scores[i]) );
            }
            //the closest match will be the smallest number.
            //if the totalscore calculated is less than my previous match score set this item as the match and update the matchscore
            //console.log("diff: " + totalScore);
            if (totalScore < matchScore){
                //console.log("Setting a new match. Replacing " + matchScore + " with " + totalScore);
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

