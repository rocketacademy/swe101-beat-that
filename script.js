/* Note: This implementation incldues the following features:
1. Regular beat that game (i.e. largest num wins) 
2. Auto-Generate Combined Number
3. Variable Number of Dice
We've removed Lowest Combined Number to reduce bloat, making the code more legible. However, please feel free to try to implement all the features together on your own
*/
/*====================================
==============GLOBAL VARIABLES========
======================================*/
// Game modes
var GAME_MODE_CHOOSE_NUM_DICE = 'GAME_MODE_CHOOSE_NUM_DICE';
var GAME_MODE_DICE_ROLL = 'GAME_MODE_DICE_ROLL';
var GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  'GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY';

// Track num of dice user has chosen to play with
var numDiceChosen = 0;

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_CHOOSE_NUM_DICE;

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 1;

// Keep track of each player's dice rolls
var player1Dice = [];
var player2Dice = [];

// Keep track of each player's details
var playerProfiles = [
  {id: 1, diceNum: 0, score: 0},
  {id: 2, diceNum: 0, score: 0},
];

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

  // Assign newDiceRolls to the current player's dice array
  if (currPlayer === 1) {
    player1Dice = newDiceRolls;
  }
  // If currPlayer is not 1, assume currPlayer is 2
  else {
    player2Dice = newDiceRolls;
  }

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
  var diceArray = currPlayer === 1 ? player1Dice : player2Dice;
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
  // Update player score accordingly
  if (currPlayer == playerProfiles[0].id) {
    playerProfiles[0].diceNum = playerNum;
  } else {
    playerProfiles[1].diceNum = playerNum;
  }
  // Return generated player num to parent function
  return playerNum;
};

/**
 * Compute the winner between Player 1 and Player 2.
 * Return either 1 or 2 to represent the winning player.
 * In the event of a tie, Player 2 wins.
 */
var determineWinner = function () {
  // if the first player's diceNum is larger than second player's, return his id
  if (playerProfiles[0].diceNum > playerProfiles[1].diceNum) {
    return playerProfiles[0].id;
  }
  return playerProfiles[1].id;
};
/**
 * Incr the winner's points by adding previus round's points
 * @param {number} roundScore
 */
var addNumToRunningScore = function (roundScore) {
  // If player 1 is playing, add to his score
  if (currPlayer == 1) {
    playerProfiles[0].score += roundScore;
  }
  // If player 2 is playing, add to his score
  if (currPlayer == 2) {
    playerProfiles[1].score += roundScore;
  }
};

var createLeaderBoardOutput = function () {
  // set the preamble and assign it to a variable that will eventually be returned from this function
  var leaderBoardOutput = 'Leaderboard: <br>';

  // If the larger scores is in index 0, loop thru the array
  if (playerProfiles[0].score > playerProfiles[1].score) {
    for (var i = 0; i < playerProfiles.length; i += 1) {
      // In each iteration of the loop, add on to the preamble by displaying the player name and scores
      leaderBoardOutput +=
        'Player ' +
        playerProfiles[i].id +
        ': ' +
        playerProfiles[i].score +
        '<br>';
    }
    // If the larger scores is in index 1, loop from the back of the array
  } else if (playerProfiles[1].score > playerProfiles[0].score) {
    for (var i = playerProfiles.length - 1; i > -1; i -= 1) {
      // In each iteration of the loop, add on to the preamble by displaying the player name and scores
      leaderBoardOutput +=
        'Player ' +
        playerProfiles[i].id +
        ': ' +
        playerProfiles[i].score +
        '<br>';
    }
  }
  return leaderBoardOutput;
};

/**
 * Reset the game so that the user has to choose how many dice he wants to play with
 */
var resetGame = function () {
  currPlayer = 1;
  gameMode = GAME_MODE_CHOOSE_NUM_DICE;
};

/**
 * Create a message that shows the user his dice roll vaue for each of his dice rolls
 * @param {Array} diceRollsArr An array of the current user's dice rolls
 */
var createDiceRollInfoMsg = function (diceRollsArr) {
  var outputMsg =
    'Welcome Player ' + currPlayer + '. <br> Your dice rolls are: ';

  for (var i = 0; i < diceRollsArr.length; i += 1) {
    outputMsg += '<br> Dice ' + (i + 1) + ': ' + diceRollsArr[i];
  }
  return outputMsg;
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
  if (gameMode === GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY) {
    // Get player number for curr player
    var playerNum = getPlayerNumberAutomatically();

    var playerNumResponse =
      'Player ' + currPlayer + ', your number is ' + playerNum + '.';

    // add the playerNum to player's running score
    addNumToRunningScore(playerNum);

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer === 1) {
      currPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return (
        playerNumResponse +
        "<br>It is now Player 2's turn. Press Submit to roll the dice"
      );
    }
    // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    resetGame();

    var leaderBoardOutput = createLeaderBoardOutput();

    // Return the game end response
    return (
      playerNumResponse +
      '<br><br> Player ' +
      winningPlayer +
      " won this round. <br>Player 1's number: " +
      playerProfiles[0].diceNum +
      " | Player 2's number: " +
      playerProfiles[1].diceNum +
      '<br> <br>' +
      leaderBoardOutput +
      '<br><br> To continue playing enter the number of dice you would like to play with, and click submit.'
    );
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return 'An error occurred. Please refresh to start again.';
};
