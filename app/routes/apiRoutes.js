// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friend-data etc.
// ===============================================================================

var friendData = require("../data/friendData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/friends... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a friend ... this data is then sent to the server...
  // Then the server saves the data to the friend Data array)
  // additionally the Best Match is found and returned 
  // ---------------------------------------------------------------------------
 

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know they have a best match friend.
    // It will do this by computing and sending the best match friend object back for modal content
    // req.body is available since we're using the body-parser middleware

    var newFriend = {
      name: "",
      photo: "",
      scores: []
    };

    var newScores = [];

    Object.keys(req.body).forEach(function(key) {
      console.log(key, req.body[key]);
      if (key === 'scores[]') {
        newScores = req.body[key];
      };
    });

    newFriend.name   = req.body.name;
    newFriend.photo  = req.body.photo;
    newFriend.scores = newScores;

    console.log ("new friend: ", newFriend, " new scores: ", newScores);
    // set this to initialize the start of the check for best match
    var bestScoreMatch = 0;

    // current array is friendData that contains all data so far
    for (var idx = 0; idx < friendData.length; idx++) {
        
      var totScoreDiff = 0;
      // set up an array to hold each friend's scores
      var scoresLn = friendData[idx].scores.length;
      console.log(" ** friend Scores Array: ", friendData[idx].scores, " leng: ", scoresLn);

        // loop through the scores array to check the values
        for (var i = 0; i < scoresLn; i++) {
          var curFr = parseInt(friendData[idx].scores[i]);
          var newFr = parseInt(newScores[i]);
          console.log(" *** each score: ", curFr, " ",newFr);
          if (curFr < newFr) {
            // compute the score difference
            totScoreDiff += newFr - curFr;
          }
          else {
            totScoreDiff += curFr - newFr;
          }
        }

      console.log(" *** total score: ",idx, " ", totScoreDiff);
      // check if first time through or the difference is less than the previous best match value computed
      if (bestScoreMatch === 0 || totScoreDiff < bestScoreMatch) {
        // set the Best Match score and data fields
        bestScoreMatch    = totScoreDiff;
        var bestMatchData = friendData[idx];
        console.log ("Best Score Match: ", bestScoreMatch, " Best Match Data: ", bestMatchData);
      }       
    }
  
    // add the new friend data to the array on server now
    friendData.push(newFriend);
    
    // return the Best Match object for the modal to use
    return res.json(bestMatchData);

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];

    console.log(friendData);
  });
};
