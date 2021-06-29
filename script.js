/* Note: This implementation incldues the following features:
1. Regular beat that mode, with leaderboard 
2. Auto-Generate Combined Number
3. Variable Number of Dice
4. Variable Number of Players 
5. Knockout mode
We've removed Lowest Combined Number to reduce bloat, making the code more legible. However, please feel free to try to implement all the features together on your own
*/
/*====================================
==============GLOBAL VARIABLES========
======================================*/
// Game modes
var GAME_MODE_CHOOSE_NUM_PLAYERS = 'GAME_MODE_CHOOSE_NUM_PLAYERS';
var GAME_MODE_CHOOSE_NUM_DICE = 'GAME_MODE_CHOOSE_NUM_DICE';
var GAME_MODE_DICE_ROLL = 'GAME_MODE_DICE_ROLL';
var GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  'GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY';
var GAME_MODE_CHOOSE_SUB_MODE = 'GAME_MODE_CHOOSE_SUB_MODE';
('GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY');
var GAME_MODE_SELECT_OPPONENTS = 'GAME_MODE_SELECT_OPPONENTS';

var SUB_MODE_REGULAR = 'regular';
var SUB_MODE_KNOCKOUT = 'knockout';

// Track the number of dice user has chosen to play with
var numDiceChosen = 0;

// Track the number of players
var numPlayers = 0;

// Track the subMode which will be either regular or knockout
var subMode = null;

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 0;

// Set an array that will contains details about each player (i.e. an array of objects)
var playerProfiles = [];

// Track the current round's winner
var roundWinner = null;

// Track which players are participating in the current round
var currRoundParticipants = [];

/*====================================
==============HELPER FUNCTIONS========
======================================*/

/**
 * Return a random number between the specified bounds
 * @param {number} lowerBound The lowest number that should be included in the range of possible numbers
 * @param {number} upperBound The highest number that should be included in the range of possible numbers
 */
var getRandNum = function (lowerBound, upperBound) {
  return Math.floor(Math.random() * upperBound) + lowerBound;
};

/**
 * Get dice rolls for curr player and populate curr player's dice array
 * Return the new dice rolls
 */
var getDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [];
  for (var i = 0; i < numDiceChosen; i += 1) {
    // Since we're rolling a dice, get a random number between 1 and 6
    var diceRoll = getRandNum(1, 6);
    // Push the diceRoll into the newDiceRolls array
    newDiceRolls.push(diceRoll);
  }

  // assign dice rolls to the respective player
  currRoundParticipants[currPlayer].diceRolls = newDiceRolls;

  // Return new dice rolls to parent function
  return newDiceRolls;
};

/**
 * Return a number that is the concatenation of num1 and num2
 * @param {number} num1
 * @param {number} num2
 */
var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

/**
 * Sort an array such that it can order any number of elements
 * @param {Array} anArray
 * @returns {Array} anArray sorted in ascending order
 */
var sortAnArray = function (anArray) {
  // get the length of the given array
  var length = anArray.length;

  //Use bubble sort to sort a given array
  // More info on bubble sort: https://www.geeksforgeeks.org/bubble-sort/
  for (var i = 0; i < length - 1; i += 1) {
    for (var j = 0; j < length - 1; j += 1) {
      if (anArray[j] > anArray[j + 1]) {
        var temp = anArray[j];
        anArray[j] = anArray[j + 1];
        anArray[j + 1] = temp;
      }
    }
  }
  return anArray;
};

/**
 * Automate choosing the player's number from the dice rolls
 * Return the player number
 * @param {number} firstNumeralIndex
 */
var getPlayerNumberAutomatically = function () {
  // Get the current player's dice array.
  // if submode is regular, get the current player's dice aray from playerProfiles

  var diceArray = currRoundParticipants[currPlayer].diceRolls;

  var playerNum;
  // Sort the array such that it can order any number of elements in ascending order
  sortAnArray(diceArray);
  //Alternatively, instead of writing our own sorting algorithm to sort arrays, we can use a native native JS method: diceArray.sort()
  // More info at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

  // By now, dice array would be sorted. Iterate thru diceArray again, this time concatenating the elements from largest to smallest
  while (diceArray.length > 0) {
    // get hold of the largest num in the array (which is also the last element since we sorted it in ascending order earlier)
    var largestNum = diceArray.pop();
    // On the first iteration, there is no need to concatenate; just reassign playerNum
    if (playerNum == null) {
      playerNum = largestNum;
    } else {
      // else if it's not the first iteration, concatenate to get the largest possible number
      playerNum = concatenate2Numbers(playerNum, largestNum);
    }
  }
  // Update respective player's playerNum
  currRoundParticipants[currPlayer].diceNum = playerNum;
  // Return generated player num to parent function
  return playerNum;
};

var sortAnArrayByASpecifiedKey = function (anArray, key) {
  // get the length of the given array
  var length = anArray.length;

  //Use bubble sort to sort a given array
  // More info on bubble sort: https://www.geeksforgeeks.org/bubble-sort/
  for (var i = 0; i < length - 1; i += 1) {
    for (var j = 0; j < length - 1; j += 1) {
      if (anArray[j][key] > anArray[j + 1][key]) {
        var temp = anArray[j];
        anArray[j] = anArray[j + 1];
        anArray[j + 1] = temp;
      }
    }
  }
  return anArray;
};

/**
 * Compute the winner between all players.
 * Return an array that is ordered according to who has the largest score.
 */
var determineWinner = function () {
  // Overall summary of the logic: We'll start by arbitrarily assigning the first player to be the roundWinner. Then, on each subsequent player's turn, we'll assess if their diceNum is larger than the roundWinner. If yes: re-assign roundWinner; if No: do nothing

  // If we've not yet set a roundWinner before (as will always be the case for the first player's turn), arbitrarily assign current player as the round winner

  if (roundWinner == null) {
    roundWinner = currRoundParticipants[currPlayer];
  }

  // If there is a previous roundWinner, assess if currPlayer's diceNum is larger than roundWinner's. If yes, this player becomes the new roundWinner
  else if (currRoundParticipants[currPlayer].diceNum > roundWinner.diceNum) {
    roundWinner = currRoundParticipants[currPlayer];
  }
  // If it's a draw, or the the currPlayer's diceNum is not larger than the existing roundWinner, do nothing
};

/**
 * Incr the winner's points by adding previus round's points
 * @param {number} roundScore
 */
var addNumToRunningScore = function (roundScore) {
  // Get hold of the current players score, and add the roundScore to it
  currRoundParticipants[currPlayer].score += roundScore;
};

var createLeaderBoardOutput = function () {
  // set the preamble and assign it to a variable that will eventually be returned from this function
  var leaderBoardOutput = 'Leaderboard: ';

  // As per the game instructions, feel free to display the leaderboard in any order.
  // To do so, loop thru all the player profiles to get their score.
  //----------Option 1-------------------------
  // for (var i = 0; i < playerProfiles.length; i += 1) {
  // // On each iteration, concatentate with the previous verision of leaderBoardOutput
  //   leaderBoardOutput +=
  //     '<br> Player ' + playerProfiles[i].id + ': ' + playerProfiles[i].score;
  // }
  // return leaderboardOutput
  //-------------------------------------------

  // else if you would like to have the leaderboard sorted, it might look smth like this:
  // Overall strategy: Create a copy of the playerProfiles array, then implement a bubble sort (similar to what we did earlier, only this time we are sorting the array based on its elements property)

  // ----------Option 2---------------------------
  // Copy playerProfiles into another array so that the sorting function (implemented below) won't change the order of playerProfiles
  var copyOfCurrRoundParticipants = cloneAnArr(currRoundParticipants);

  var sortedByPlayerScore = sortAnArrayByASpecifiedKey(
    copyOfCurrRoundParticipants,
    'score'
  );

  // Loop thru the sorted array, getting hold of the last element each time. Concatenate that with the preamble
  // (The reason why we get hold of the last element is because the array is sorted in ascending order, but we want to display the leaderboard in descending order)

  while (sortedByPlayerScore.length > 0) {
    var leadingPlayer = sortedByPlayerScore.pop();
    leaderBoardOutput +=
      '<br> Player ' + leadingPlayer.id + ': ' + leadingPlayer.score;
  }

  return leaderBoardOutput;
  //-------------------------------------------
};

/**
 * Reset the game so that the user has to choose how many dice he wants to play with
 */
var resetGame = function (ultimateWinner) {
  // Rest currPlayer to 0 so that we can use it to point at the first element of playerProfiles (Remember: arrays are 0 indexed)
  currPlayer = 0;
  // Reset round winner
  roundWinner = null;
  if (subMode == SUB_MODE_REGULAR) {
    //Switch to choose number of dice mode so that players can restart without having to re-specify the number of players
    gameMode = GAME_MODE_CHOOSE_NUM_DICE;
  } else if (subMode == SUB_MODE_KNOCKOUT && !ultimateWinner) {
    gameMode = GAME_MODE_CHOOSE_NUM_DICE;
  } else if (subMode == SUB_MODE_KNOCKOUT && ultimateWinner) {
    // Else if it is the knockout mode and there is an ultimate winner, reset the game so the user has to select num of players
    gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;
    // Empty currRoundParticipants
    currRoundParticipants = [];
  }
};

/**
 * Create a message that shows the user his dice roll vaue for each of his dice rolls
 * @param {Array} diceRollsArr An array of the current user's dice rolls
 */
var createDiceRollInfoMsg = function (diceRollsArr) {
  // Craft a preamble and assign it to a variable that we will return at the end of this function
  var outputMsg =
    'Welcome Player ' +
    currRoundParticipants[currPlayer].id +
    '.<br> Your dice rolls are:';

  // Loop thru the array; on each iteration, use the index as a pointer to help you access the relevant element in diceRolls array
  for (var i = 0; i < diceRollsArr.length; i += 1) {
    // concatenate the existing outputMsg with a new string
    outputMsg += '<br> Dice ' + (i + 1) + ': ' + diceRollsArr[i];
  }
  // return the concatenated msgs
  return outputMsg;
};

/**
 * Create a player profile for each player
 */
var createPlayerProfiles = function () {
  // Loop thru n times, creating a an object with relevant keys each iteration. (n is the number of players in the game)
  for (var i = 0; i < numPlayers; i += 1) {
    playerProfiles.push({id: i + 1, diceRolls: [], diceNum: 0, score: 0});
  }
};

/**
 * Return a random number between the specified bounds
 */
var getRandNum = function (lowerBound, upperBound) {
  return Math.floor(Math.random() * upperBound) + lowerBound;
};

/**
 * Get hold of a random player in the playerProfiles array, then remove that player
 */
var getPlayerRandomly = function () {
  // generate a random number to select one of the players. Subtract 1 from this number to sync it with array index (becos arrays are 0 indexed)
  var randomIndex = getRandNum(1, playerProfiles.length) - 1;

  var selectedPlayer = playerProfiles[randomIndex];
  //Remove player from the array:
  // -------Method 1--------
  // // initialise a temp array
  // var tempArr = [];
  // // Loop thru the playerProfiles
  // for (var i = 0; i < playerProfiles.length; i += 1) {
  //   // If the current index does not match randomIndex, push it into the temp Arr.
  //   if (i != randomIndex) {
  //     tempArr.push(playerProfiles[i]);
  //   }
  // }
  // // reassign tempArr to playerProfiles
  // playerProfiles = tempArr;
  // -------Method 2--------
  // Use splice, a JS native method, to remove the element directly from playerProfiles. Info on splice: https://www.w3schools.com/jsref/jsref_splice.asp
  // In the context we're using splice, we need to specify 2 arguments: 1. The index of the elem you want to remove; 2. The number of elements to remove (starting from the specified index)
  playerProfiles.splice(randomIndex, 1);
  // return the selected player
  return selectedPlayer;
};

var cloneAnArr = function (anArray) {
  var copyOfAnArray = [];
  for (var i = 0; i < anArray.length; i += 1) {
    copyOfAnArray.push(anArray[i]);
  }
  return copyOfAnArray;
};

var eliminateLoser = function () {
  // set a variable to hold index of the loser's element.
  var loserIdx;
  // loop thru the currRoundParticpants
  for (var i = 0; i < currRoundParticipants.length; i += 1) {
    // if an element's id is not the same as the roundWinner's id, that element is the loser's element
    if (currRoundParticipants[i].id != roundWinner.id) {
      // record the index of this element
      loserIdx = i;
    }
  }

  // assign the loser's details to a var
  var loser = currRoundParticipants[loserIdx];

  // remove loser from the currRoundParticipants
  currRoundParticipants.splice(loserIdx, 1);
  // return the loser's details
  return loser;
};

/*====================================
==============MAIN====================
======================================*/
/**
 * Play Beat with variable number of players and auto-choosing the largest number from the die rolled.
 * https://swe101.rocketacademy.co/projects/project-2-dice
 * @param {string} input
 */
var main = function (input) {
  if (gameMode == GAME_MODE_CHOOSE_NUM_PLAYERS) {
    // validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    numPlayers = Number(input);
    // create player profiles based on the number of players that will be playing
    createPlayerProfiles();

    // Change to dice roll mode
    gameMode = GAME_MODE_CHOOSE_NUM_DICE;
    return (
      'There are ' +
      numPlayers +
      ' players in this game. Please enter how many dice you would like to play with.'
    );
  }

  if (gameMode == GAME_MODE_CHOOSE_NUM_DICE) {
    // validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    numDiceChosen = Number(input);

    // If this is the second (or more) round, skip submode selection and go straight into playing the game
    if (subMode == SUB_MODE_REGULAR) {
      gameMode = GAME_MODE_DICE_ROLL;
    } else if (subMode == SUB_MODE_KNOCKOUT) {
      gameMode = GAME_MODE_SELECT_OPPONENTS;
      return (
        'You have chosen to play the next game with ' +
        numDiceChosen +
        " dice. Click submit to see who you'll be going up against. "
      );
    } else {
      // Else this must be the first round; prompt user to chose a submode
      // Change to dice roll mode
      gameMode = GAME_MODE_CHOOSE_SUB_MODE;
      return (
        'You have chosen to play with ' +
        numDiceChosen +
        ' dice. <br><br> Please enter one of the following game types: <br>1. regular <br>2. knockout '
      );
    }
  }

  if (gameMode == GAME_MODE_CHOOSE_SUB_MODE) {
    // valdiate the user input
    if (input != SUB_MODE_REGULAR && input != SUB_MODE_KNOCKOUT) {
      return 'Please enter one of the following game types: <br>1. regular <br>2. knockout ';
    }

    // If user wants to play a regular game, change the mode and prompt player 1 to start
    if (input == SUB_MODE_REGULAR) {
      // set the submode
      subMode = SUB_MODE_REGULAR;

      // Since all players in playerProfiles are playing, push each player into currRoundParticpants
      for (var i = 0; i < playerProfiles.length; i += 1) {
        currRoundParticipants.push(playerProfiles[i]);
      }
      // Progress the game to the next mode
      gameMode = GAME_MODE_DICE_ROLL;
      // Prompt Player 1 to roll his dice
      return (
        'You have selected to play a ' +
        subMode +
        ' game. Player 1, please click submit to roll your dice'
      );
    }
    // If user does not want to play a regular game, then he wants to play knockout. Change the game mode to programitically select opponenets
    if (input == SUB_MODE_KNOCKOUT) {
      // set the submode
      subMode = SUB_MODE_KNOCKOUT;
      // Progress the game to the next mode
      gameMode = GAME_MODE_SELECT_OPPONENTS;
    }
  }

  //Randomly get 2 players to play against each other
  if (gameMode == GAME_MODE_SELECT_OPPONENTS) {
    // If we're in the first round, currPlayers arr would be empty
    if (currRoundParticipants.length < 1) {
      // set currRoundParticpants to include any 2 random players from the playerProfiles array
      currRoundParticipants = [getPlayerRandomly(), getPlayerRandomly()];
    }
    // Else, we are in this mode because a player has won a previous round. add one other player to currRoundParticipants
    else {
      currRoundParticipants.push(getPlayerRandomly());
    }
    // Progress the game by changing to the next mode
    gameMode = GAME_MODE_DICE_ROLL;

    // Prompt users on who will be playing in this round

    return (
      'This is a ' +
      subMode +
      ' game. Each round, the loser will be eliminated and the winner will continue playing against other players. <br><br> Player ' +
      currRoundParticipants[0].id +
      ' will now play against Player ' +
      currRoundParticipants[1].id +
      '<br>Player ' +
      currRoundParticipants[0].id +
      ', please click submit to roll your dice'
    );
  }

  // Roll 2 dice and show the player the values
  if (gameMode == GAME_MODE_DICE_ROLL) {
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();

    // Switch mode to choose dice order
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY;

    // Return the dice roll values to that player
    var diceRollInfo = createDiceRollInfoMsg(newDiceRolls);
    return diceRollInfo;
  }

  // Create a number based on the player's chosen dice order, and show it to the player
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY) {
    // Get player number for curr player
    var playerNum = getPlayerNumberAutomatically();

    var playerNumResponse =
      'Player ' +
      currRoundParticipants[currPlayer].id +
      ', your number is ' +
      currRoundParticipants[currPlayer].diceNum +
      '.';

    // add the playerNum to player's running score if user is playing regular mode
    addNumToRunningScore(playerNum);
    if (subMode == SUB_MODE_REGULAR) {
    }

    //On each player's turn, determine if he has the largest dice so far
    determineWinner();

    // if currPlayer is less than the number of players in the current round, it means not everyone has had a go. Therefore change the mode back to the dice roll mode and increment currplayer
    if (currPlayer < currRoundParticipants.length - 1) {
      // change the mode to progress the game
      gameMode = GAME_MODE_DICE_ROLL;
      // increment currPlayer
      currPlayer += 1;
      // Prompt next user to roll the dice
      return (
        playerNumResponse +
        '<br> It is now Player ' +
        currRoundParticipants[currPlayer].id +
        "'s turn. Press Submit to roll the dice"
      );
    }

    // If users are playing in regular mode, display the leaderboard
    if (subMode == SUB_MODE_REGULAR) {
      var leaderBoardOutput = createLeaderBoardOutput();

      // Craft the end-of-game response
      var myOutputValue =
        playerNumResponse +
        ' <br><br> Player ' +
        roundWinner.id +
        ' won this round. <br> <br> <br>' +
        leaderBoardOutput +
        '<br><br> To continue playing enter the number of dice you would like to play with, and click submit.';
    } else if (subMode == SUB_MODE_KNOCKOUT) {
      // Eliminate the loser from currRoundParticipants and return the details of this loser
      var loser = eliminateLoser();

      // Craft the preamble output message to the user.
      var myOutputValue =
        playerNumResponse +
        ' <br><br> Player ' +
        roundWinner.id +
        ' won this round.';

      // if there are still other player's queued up to play against this player, concat myOutputvalue with an elimination message, then reset the game
      if (playerProfiles.length > 0) {
        myOutputValue +=
          ' <br> <br> Player ' +
          loser.id +
          ' has been eliminated.' +
          '<br><br> To continue playing enter the number of dice you would like to play with, and click submit.';
      } else {
        // Else there are no more competitors left in the playersProfile. The remaining player is the ultimate winner
        var ultimateWinner = true;
        myOutputValue +=
          '<br><br>Player ' +
          currRoundParticipants[0].id +
          ', you are the ultimate winner! To start a new game, first enter the number of players';
      }
    }
    // reset the game
    resetGame(ultimateWinner);

    return myOutputValue;
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return 'An error occurred. Please refresh to start again.';
};
