/* Note: This implementation incldues the following features:
1. Regular beat that game (i.e. largest num wins) 
2. Auto-Generate Combined Number
3. Variable Number of Dice
4. Variable Number of Players 
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

// Track num of dice user has chosen to play with
var numDiceChosen = 0;

// Track num of players
var numPlayers = 0;

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_CHOOSE_NUM_PLAYERS;

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 0;

// Set an array that will contains details about each player (i.e. an array of objects)
var playerProfiles = [];

// Track the current round's winner
var roundWinner = null;

/*====================================
==============HELPER FUNCTIONS========
======================================*/
/**
 * Return a random number from 1 to 6
 */
var getDiceRoll = function () {
  return Math.ceil(Math.random() * 6);
};

/**
 * Get dice rolls for curr player and populate curr player's dice array
 * Return the new dice rolls
 */
var getDiceRolls = function () {
  // Create an array newDiceRolls with 2 independent dice roll values
  var newDiceRolls = [];
  for (var i = 0; i < numDiceChosen; i += 1) {
    newDiceRolls.push(getDiceRoll());
  }

  // assign dice rolls to the respective player
  playerProfiles[currPlayer].diceRolls = newDiceRolls;

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
  // We use the ternary operator on the following line for more concise syntax.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
  // The example below is equivalent to:
  // var diceArray;
  // if (currPlayer === 1) { diceArray = player1Dice; } else { diceArray = player2Dice; }
  // var diceArray = currPlayer === 1 ? player1Dice : player2Dice;
  var diceArray = playerProfiles[currPlayer].diceRolls;
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
  playerProfiles[currPlayer].diceNum = playerNum;
  // Return generated player num to parent function
  return playerNum;
};

/**
 * Update the global variable that tracks  players' current round number
 * @param {number} firstNumeralIndex
 */
updateCurrentRoundRoll = function (playerNum) {
  // Store player num in the relevant global player num variable
  if (currPlayer == 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }
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
    roundWinner = playerProfiles[currPlayer];
  }

  // If there is a previous roundWinner, assess if currPlayer's diceNum is larger than roundWinner's. If yes, this player becomes the new roundWinner
  else if (playerProfiles[currPlayer].diceNum > roundWinner.diceNum) {
    roundWinner = playerProfiles[currPlayer];
  }
  // If it's a draw, or the the currPlayer's diceNum is not larger than the existing roundWinner, do nothing
};

/**
 * Incr the winner's points by adding previus round's points
 * @param {number} roundScore
 */
var addNumToRunningScore = function (roundScore) {
  // Get hold of the current players score, and add the roundScore to it
  playerProfiles[currPlayer].score += roundScore;
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
  var copyOfPlayerProfiles = [];
  for (var i = 0; i < playerProfiles.length; i += 1) {
    copyOfPlayerProfiles.push(playerProfiles[i]);
  }

  var sortedByPlayerScore = sortAnArrayByASpecifiedKey(
    copyOfPlayerProfiles,
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
var resetGame = function () {
  // Rest currPlayer to 0 so that we can use it to point at the first element of playerProfiles (Remember: arrays are 0 indexed)
  currPlayer = 0;
  //Switch to choose number of dice mode so that players can restart without having to re-specify the number of players
  gameMode = GAME_MODE_CHOOSE_NUM_DICE;
  // Reset round winner
  roundWinner = null;
};

/**
 * Create a message that shows the user his dice roll vaue for each of his dice rolls
 * @param {Array} diceRollsArr An array of the current user's dice rolls
 */
var createDiceRollInfoMsg = function (diceRollsArr) {
  // Craft a preamble and assign it to a variable that we will return at the end of this function
  var outputMsg =
    'Welcome Player ' +
    playerProfiles[currPlayer].id +
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

    // Change to dice roll mode
    gameMode = GAME_MODE_DICE_ROLL;
    return (
      'You have chosen to play with ' +
      numDiceChosen +
      ' dice. Player 1, click submit to get your dice rolls'
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
      playerProfiles[currPlayer].id +
      ', your number is ' +
      playerProfiles[currPlayer].diceNum +
      '.';

    // add the playerNum to player's running score
    addNumToRunningScore(playerNum);

    //On each player's turn, determine if he has the largest dice so far
    determineWinner();

    // if currPlayer is less than the number of players (i.e. the number that the user chose at the start), it means not everyone has had a go. Therefore change it back to the dice roll mode and increment currplayer
    if (playerProfiles[currPlayer].id < numPlayers) {
      // change the mode
      gameMode = GAME_MODE_DICE_ROLL;
      // increment currPlayer
      currPlayer += 1;
      // Prompt next user to roll the dice
      return (
        playerNumResponse +
        '<br> It is now Player ' +
        playerProfiles[currPlayer].id +
        "'s turn. Press Submit to roll the dice"
      );
    }

    var leaderBoardOutput = createLeaderBoardOutput();

    // Craft the end game response
    var myOutputValue =
      playerNumResponse +
      ' <br><br> Player' +
      roundWinner.id +
      ' won this round. <br> <br> <br>' +
      leaderBoardOutput +
      '<br><br> To continue playing enter the number of dice you would like to play with, and click submit.';

    // Reset the game
    resetGame();

    return myOutputValue;
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return 'An error occurred. Please refresh to start again.';
};
