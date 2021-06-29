/* Note: This implementation incldues the following features:
1. Regular beat that game (i.e. largest num wins)
2. Score
3. Leaderboard
4. Lowest Combined Number Mode
5. Auto-Generate Combined Number
*/
/*====================================
==============GLOBAL VARIABLES========
======================================*/
// Game modes
var GAME_MODE_DICE_ROLL = 'GAME_MODE_DICE_ROLL';
var GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY =
  'GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY';
var REGULAR = 'regular';
var LOWEST_COMBINED_NUMBER = 'lowest combined number';

var mode = null;

// Initialise the game to start with the dice roll game mode
var gameMode = GAME_MODE_DICE_ROLL;

// Keep track of the current player's number, either 1 or 2.
// The game starts with Player 1.
var currPlayer = 1;

// Keep track of each player's dice rolls
var player1Dice = [];
var player2Dice = [];

// Keep track of each player's chosen numbers
var player1Num;
var player2Num;

// Use player profiles to keep track of each player's details
var playerProfiles = [
  {id: 1, score: 0},
  {id: 2, score: 0},
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
  var newDiceRolls = [getDiceRoll(), getDiceRoll()];

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

  //Use bubble sort to sort the array
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
  // // Sort the array such that it can order any number of elements in ascending order
  sortAnArray(diceArray);

  // By now, dice array would be sorted. Iterate thru diceArray again, this time concatenating the elements from largest to smallest
  while (diceArray.length > 0) {
    // get hold of the largest num in the array (which is also the last element since we sorted it in ascending order earlier)
    var largestNum = diceArray.pop();
    // On the first iteration, there is no need to concatenate; just reassign playerNum
    if (playerNum == null) {
      playerNum = largestNum;
    }
    // else if it's not the first iteration, concatenate to get the lowest possible number
    else {
      // if the mode is LOWEST_COMBINED_NUMBER, create the lowest number
      if (mode == LOWEST_COMBINED_NUMBER) {
        playerNum = concatenate2Numbers(largestNum, playerNum);
      }
      // else it must be REGULAR mode, so concatenate to get the largest possible number
      else {
        playerNum = concatenate2Numbers(playerNum, largestNum);
      }
    }
  }
  // Update player1Num or player2Num to reflect the current round's score
  if (currPlayer === 1) {
    player1Num = playerNum;
  } else {
    player2Num = playerNum;
  }
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

/**
 * Automate choosing the player's number from the dice rolls
 * Return the player number
 * @param {number} firstNumeralIndex
 */

/**
 * Compute the winner between Player 1 and Player 2.
 * Return either 1 or 2 to represent the winning player.
 * In the event of a tie, Player 2 wins.
 */
var determineWinner = function () {
  // if in regular mode and player 1's num is bigger, player 1 wins
  if (mode == REGULAR && player1Num > player2Num) {
    return 1;
  }
  // Else if in lowest combined number mode and player 1 has a smaller number, player 1 wins
  else if (mode == LOWEST_COMBINED_NUMBER && player1Num < player2Num) {
    return 1;
  }
  // in all other scenarios (even if draw), return that player 2 has won
  return 2;
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

  // If in regular mode, display the player with the larger score first
  if (mode == REGULAR) {
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
  }
  // If in LOWEST_COMBINED_NUMBER mode, display the player with the larger score first
  if (mode == LOWEST_COMBINED_NUMBER) {
    // If the smaller score is in index 0, loop thru the array and add-on to leaderBoardOutput
    if (playerProfiles[0].score < playerProfiles[1].score) {
      for (var i = 0; i < playerProfiles.length; i += 1) {
        // In each iteration of the loop, add on to the preamble by displaying the player name and scores
        leaderBoardOutput +=
          'Player ' +
          playerProfiles[i].id +
          ': ' +
          playerProfiles[i].score +
          '<br>';
      }
    }
    // If the smaller score is in index 1, loop from the back of the array and add-on to leaderBoardOutput
    else if (playerProfiles[1].score < playerProfiles[0].score) {
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
  }
};

/**
 * Reset the game by re-initialising relevant variables
 */
var resetGame = function () {
  currPlayer = 1;
  gameMode = GAME_MODE_DICE_ROLL;
};

/*====================================
==============MAIN====================
======================================*/
/**
 * Play Beat That as per SWE101 game rules
 * https://swe101.rocketacademy.co/projects/project-2-dice
 * @param {string} input
 */
var main = function (input) {
  // ------------MORE COMFORTABLE------------------
  if (!mode) {
    // Validet that input is one of the modes
    if (input != REGULAR && input != LOWEST_COMBINED_NUMBER) {
      return (
        'Please choose one of the following modes:<br> 1. ' +
        REGULAR +
        '<br> 2. ' +
        LOWEST_COMBINED_NUMBER
      );
    }
    // if the input is valid, re-assign mode with the input value
    mode = input;
    return (
      'You have selected ' +
      mode +
      ' mode. Player ' +
      currPlayer +
      ', click submit to roll your dice'
    );
  }

  if (gameMode === GAME_MODE_DICE_ROLL) {
    // Roll 2 dice and show the player the values
    // Get dice rolls for curr player and populate the curr player's dice array
    var newDiceRolls = getDiceRolls();
    // Switch mode to choose dice order
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY;
    // Return the dice roll values to that player
    return (
      'Welcome Player ' +
      currPlayer +
      '. <br>You rolled Dice 1: ' +
      newDiceRolls[0] +
      ' and Dice 2: ' +
      newDiceRolls[1] +
      '<br>    Click submit to see your number'
    );
  }

  //Automatically generate the largest possible number based on a player's dice roll
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER_AUTOMATICALLY) {
    // Get player number for curr player
    var playerNum = getPlayerNumberAutomatically();
    var playerNumResponse =
      'Player ' + currPlayer + ', your number is ' + playerNum;

    // Update player's current round number
    updateCurrentRoundRoll(playerNum);

    // Add the playerNum to player's running score
    addNumToRunningScore(playerNum);

    // If currPlayer is Player 1, change currPlayer to Player 2, switch mode to dice roll
    if (currPlayer == 1) {
      currPlayer = 2;
      gameMode = GAME_MODE_DICE_ROLL;
      // Return player number to Player 1, let Player 2 know it is their turn
      return (
        playerNumResponse +
        " <br> It is now Player 2's turn. Press Submit to roll Player 2's dice."
      );
    }
    // // Else if currPlayer is Player 2, determine the winner and let the players know who won.
    var winningPlayer = determineWinner();

    // Reset the game
    resetGame();

    // display the leaderboard output in descending order
    var leaderBoardOutput = createLeaderBoardOutput();

    // Return the game end response
    return (
      playerNumResponse +
      ' <br><br> Player ' +
      winningPlayer +
      " won this round.<br><br> Player 1's number: " +
      player1Num +
      " | Player 2's number: " +
      player2Num +
      ' <br> <br>' +
      leaderBoardOutput +
      '<br><br>  Press Submit to start the next round.'
    );
  }

  // If we reach this point, there is an error because game mode is not what we expect
  return 'An error occurred. Please refresh to start again.';
};
