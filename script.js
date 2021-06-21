var REVERSE = "reverse";
var NORMAL = "normal";
var REVERSE_MODE = "reverse mode";
var NORMAL_MODE = "normal mode";
// Game type to switch between normal and reverse modes
var gameType = NORMAL_MODE;
// Game mode to switch between players and dice roll
var gameMode = 0;
var numOfDice = "";

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};
// Store player's dice rolls
var playerOneDiceRollList = [];
var playerTwoDiceRollList = [];
var placeDiceRollsInArray = function (numOfDice) {
  var loopOutputValue = "";
  var counter = 0;
  while (counter < numOfDice) {
    if (gameMode == 1) {
      playerOneDiceRollList.push(diceRoll());
      loopOutputValue = playerOneDiceRollList;
    } else if (gameMode == 2) {
      playerTwoDiceRollList.push(diceRoll());
      loopOutputValue = playerTwoDiceRollList;
    }
    counter += 1;
  }
  return loopOutputValue;
};
// Arrange dice values in descending order
var sortNormalDice = function (numOfDice) {
  var diceRollInArray = "";
  var sortArrayOutput = "";
  diceRollInArray = placeDiceRollsInArray(numOfDice);
  if (gameMode == 1) {
    playerOneDiceRollList.sort((a, b) => b - a);
    sortArrayOutput = playerOneDiceRollList;
  } else if (gameMode == 2) {
    playerTwoDiceRollList.sort((a, b) => b - a);
    sortArrayOutput = playerTwoDiceRollList;
  }
  return sortArrayOutput;
};
// Concatenate dice values
var combineNormalDiceRoll = function (numOfDice) {
  var sortedNormalDiceRoll = "";
  sortedNormalDiceRoll = sortNormalDice(numOfDice);
  var combinedValue = 0;
  if (gameMode == 1) {
    combinedValue = playerOneDiceRollList.join("");
  } else if (gameMode == 2) {
    combinedValue = playerTwoDiceRollList.join("");
  }
  return combinedValue;
};
// Convert dice string value into integer
var generateHighestNum = function (numOfDice) {
  var normalDiceRoll = combineNormalDiceRoll(numOfDice);
  playerScore = Number(normalDiceRoll);
  return playerScore;
};

// Global variable to track each players score
var playerOneScore = 0;
var playerTwoScore = 0;
var playerScore = 0;
var reversePlayerScore = 0;
var playerHighScore = "";
// Global variable for total scores
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;

// Store player one's auto results in global variable for normal mode
// Output results for player 1
var playerOneNormalResults = function (numOfDice) {
  playerHighScore = generateHighestNum(numOfDice);
  playerOneScore = playerScore;
  playerOneTotalScore = playerOneTotalScore + playerOneScore;
  var playerOneOutputMessage = `Player 1: <br> The AI has chosen ${playerOneScore} as your score. <br> <br>It's Player 2's turn. <br> <br> Please click submit to play!`;
  return playerOneOutputMessage;
};

// Store player two's auto results in global variable
// Output each players result
// Tell players who won
var playerTwoNormalResults = function (numOfDice) {
  var playerTwoOutputMessage = "";
  playerHighScore = generateHighestNum(numOfDice);
  playerTwoScore = playerScore;
  playerTwoTotalScore = playerTwoTotalScore + playerTwoScore;
  var leader = determineNormalLeader();
  playerTwoOutputMessage = `Player 2: <br> The AI has chosen ${playerTwoScore} as your score. <br> Player 1's score was ${playerOneScore}.  <br><br> ${leader}   <br><br><br> Please enter the number of dice you want to play for the next round!😊`;
  // Remove existing data in array for next round
  playerOneDiceRollList.length = 0;
  playerTwoDiceRollList.length = 0;
  return playerTwoOutputMessage;
};

// Determine leader using overall score
var determineNormalLeader = function () {
  var findMaxValue = Math.max(playerOneTotalScore, playerTwoTotalScore);
  if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue != playerTwoTotalScore
  ) {
    return `Player 1 is in the lead with ${playerOneTotalScore} points! 🎉 <br> <br>Leaderboard: <br>Player 1: ${playerOneTotalScore} points <br>Player 2: ${playerTwoTotalScore} points`;
  } else if (
    findMaxValue == playerOneTotalScore &&
    findMaxValue == playerTwoTotalScore
  ) {
    return `Both players are level on points! <br> <br>Leaderboard: <br>Players 1 & 2: ${playerTwoTotalScore} points`;
  } else {
    return `Player 2 is in the lead with  ${playerTwoTotalScore} points!🎉 <br> <br>Leaderboard: <br>Player 2: ${playerTwoTotalScore} points <br>Player 1: ${playerOneTotalScore} points`;
  }
};

// Determine reverse game leader using overall score
var determineReverseLeader = function () {
  var findMinValue = Math.min(playerOneTotalScore, playerTwoTotalScore);
  if (
    findMinValue == playerOneTotalScore &&
    findMinValue != playerTwoTotalScore
  ) {
    return `Leaderboard: <br>Player 1: ${playerOneTotalScore} points <br>Player 2: ${playerTwoTotalScore} points`;
  } else if (
    findMinValue == playerOneTotalScore &&
    findMinValue == playerTwoTotalScore
  ) {
    return `Leaderboard: <br>Players 1 & 2: ${playerTwoTotalScore} points`;
  } else {
    return `Leaderboard: <br>Player 2: ${playerTwoTotalScore} points <br>Player 1: ${playerOneTotalScore} points`;
  }
};

// Arrange dice values in ascending otder
var sortReverseDice = function (numOfDice) {
  var reverseDiceRollInArray = "";
  var sortReverseArrayOutput = "";
  reverseDiceRollInArray = placeDiceRollsInArray(numOfDice);
  if (gameMode == 1) {
    playerOneDiceRollList.sort((a, b) => a - b);
    sortReverseArrayOutput = playerOneDiceRollList;
  } else if (gameMode == 2) {
    playerTwoDiceRollList.sort((a, b) => a - b);
    sortReverseArrayOutput = playerTwoDiceRollList;
  }
  return sortReverseArrayOutput;
};
// Concatenate dice values
var combineReverseDiceRoll = function (numOfDice) {
  var sortedReverseDiceRoll = "";
  sortedReverseDiceRoll = sortReverseDice(numOfDice);
  var combinedReverseValue = 0;
  if (gameMode == 1) {
    combinedReverseValue = playerOneDiceRollList.join("");
  } else if (gameMode == 2) {
    combinedReverseValue = playerTwoDiceRollList.join("");
  }
  console.log("player1dice" + playerOneDiceRollList);
  console.log("combined score:" + combinedReverseValue);
  return combinedReverseValue;
};

// Convert dice string value into integer
var generateLowestNum = function (numOfDice) {
  var reverseDiceRoll = combineReverseDiceRoll(numOfDice);

  reversePlayerScore = Number(reverseDiceRoll);
  return reversePlayerScore;
};

// Determine reverse mode player 1 auto results
var determineReversePlayerOneResults = function (numOfDice) {
  var reverseLowestNum = "";
  reverseLowestNum = generateLowestNum(numOfDice);
  playerOneScore = reversePlayerScore;
  playerOneTotalScore = playerOneTotalScore + playerOneScore;
  var playerOneOutputMessage = `REVERSE BEAT THAT!: <br><br><br>Player 1: <br> The AI has chosen ${playerOneScore} as your score. <br> <br>It's Player 2's turn. <br> <br> Please click submit to play!`;
  return playerOneOutputMessage;
};

// Determine reverse mode player 2 auto results
// Output results
var determineReverseWinner = function (numOfDice) {
  var reverseLowestNum = "";
  reverseLowestNum = generateLowestNum(numOfDice);
  playerTwoScore = reversePlayerScore;
  playerTwoTotalScore = playerTwoTotalScore + playerTwoScore;
  var message = "";
  var reverseLeader = determineReverseLeader();
  var findMinValueRound = Math.min(playerOneScore, playerTwoScore);
  // Remove existing data in array for next round
  playerOneDiceRollList.length = 0;
  playerTwoDiceRollList.length = 0;
  if (
    findMinValueRound == playerOneScore &&
    findMinValueRound != playerTwoScore
  ) {
    message = `Player 1 wins with ${playerOneScore} points! <br> <br>${reverseLeader} `;
  } else if (
    findMinValueRound == playerOneScore &&
    findMinValueRound == playerTwoScore
  ) {
    message = `It's a draw! <br><br> ${reverseLeader}`;
  } else {
    message = `Player 2 wins with ${playerTwoScore} points! <br> <br>${reverseLeader} `;
  }
  return `REVERSE BEAT THAT!: <br><br><br>Player 2: <br> The AI has chosen ${playerTwoScore} as your score. <br> Player 1's score was ${playerOneScore}.  <br><br> ${message}  <br><br><br> Please enter the number of dice you want to play for the next round!😊`;
};

var main = function (input) {
  var myOutputValue = "";
  // gameMode 1 for player 1's results and and gameMode 2 for final results
  // gameType to switch between normal and reverse rules
  if (input == REVERSE) {
    gameType = REVERSE_MODE;
    return `You have selected reverse Beat That! <br> The AI will select the lowest number to help you win! 🤖 <br><br> Please enter the number of dice you want to play for the first round!😊`;
  }
  if (input == NORMAL) {
    gameType = NORMAL_MODE;
    return `You have selected normal Beat That! <br> The AI will select the highest number to help you win! 🤖 <br><br> Please enter the number of dice you want to play for the first round!😊`;
  }
  if (gameMode == 0) {
    numOfDice = input;
    gameMode += 1;
    myOutputValue = `You have chosen to roll ${numOfDice} dice`;
    return myOutputValue;
  } else if (gameMode == 1) {
    if (gameType == NORMAL_MODE) {
      myOutputValue = playerOneNormalResults(numOfDice);
    } else if (gameType == REVERSE_MODE) {
      myOutputValue = determineReversePlayerOneResults(numOfDice);
    }
    gameMode += 1;
    return myOutputValue;
  } else if (gameMode == 2) {
    if (gameType == NORMAL_MODE) {
      myOutputValue = playerTwoNormalResults(numOfDice);
    } else if (gameType == REVERSE_MODE) {
      myOutputValue = determineReverseWinner(numOfDice);
    }
    gameMode = 0;
    return myOutputValue;
  }
};
