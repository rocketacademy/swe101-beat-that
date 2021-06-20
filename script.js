var gameMode = "player 1";
var myOutputValue = "";
var playerOneNumber = 0;
var diceRollOne = 0;
var diceRollTwo = 0;
// diceChoice variable is for the output message and will either be "Dice 1" or "Dice 2"
var diceChoice = "";
var twoDigitP1Number = 0;
var twoDigitP2Number = 0;
// running score is the sum of all numbers that player has generated so far
var playerOneRunningScore = [];
var playerTwoRunningScore = [];
var playerOneRunningScoreMessage = "";
var playerTwoRunningScoreMessage = "";
var playerOneRunningScoreCounter = 0;
var playerTwoRunningScoreCounter = 0;
var playerOneTotalScore = 0;
var playerTwoTotalScore = 0;
var playerOneDescendingScores = [];
var playerTwoDescendingScores = [];

// function for dice roll
var diceRoll = function () {
  var diceResult = Math.floor(Math.random() * 6) + 1;
  return diceResult;
};

// function for summing all numbers in the array to calculate current total Player 1/2 score
var calcTotalSumInArray = function (array) {
  let sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

// function for sorting scores in decreasing order
var sortScoresInDecreasingOrder = function (array) {
  array.sort((a, b) => a - b);
  return array;
};

var determineWinner = function (p1Number, p2Number) {
  var message;
  if (p1Number > p2Number) {
    message = `Player 1 wins.`;
  } else {
    message = `Player 2 wins.`;
  }
  return message;
};

var main = function (input) {
  if (gameMode == "player 1") {
    diceRollOne = diceRoll();
    console.log(`dice roll #1 is ${diceRollOne}`);
    diceRollTwo = diceRoll();
    console.log(`dice roll #2 is ${diceRollTwo}`);
    // changes gameMode variable to prepare for next game mode: player 1's choice
    gameMode = `player 1 choice`;
    myOutputValue = `Welcome Player 1. <br>You rolled ${diceRollOne} for Dice 1 and ${diceRollTwo} for Dice 2. <br>Choose the order of the dice by entering "1" or "2". <br>${playerOneRunningScoreMessage} <br>${playerTwoRunningScoreMessage} <br> Player 1's current total score is ${playerOneTotalScore} <br> Player 2's current total score is ${playerTwoTotalScore} <br> Player 1's scores in descending order is ${playerOneDescendingScores} <br> Player 2's scores in descending order is ${playerTwoDescendingScores}`;
  } else if (gameMode == `player 1 choice`) {
    gameMode = `player 2`;
    if (input == "1") {
      diceChoice = `Dice 1`;
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP1Number = Number(`${diceRollOne}${diceRollTwo}`);
      console.log(`Player One's number is ${twoDigitP1Number}.`);
    } else if (input == "2") {
      diceChoice = `Dice 2`;
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP1Number = Number(`${diceRollTwo}${diceRollOne}`);
      console.log(`Player One's number is ${twoDigitP1Number}`);
    }
    playerOneRunningScore = playerOneRunningScore.push(twoDigitP1Number);
    playerOneTotalScore = calcTotalSumInArray(playerOneRunningScore);
    playerOneDescendingScores = sortScoresInDecreasingOrder(
      playerOneRunningScore
    );
    console.log(`Player One's running score is: ${playerOneRunningScore}`);
    console.log(`Player One's total score is: ${playerOneTotalScore}`);
    console.log(
      `Player One's scores in decreasing order is: ${playerOneDescendingScores}`
    );
    playerOneRunningScoreMessage = `Player 1's running scores are: ${playerOneRunningScore} `;

    myOutputValue = `Player 1, you chose ${diceChoice} first. <br>Your number is ${twoDigitP1Number}. <br>It is now Player 2's turn. <br>${playerOneRunningScoreMessage} <br>${playerTwoRunningScoreMessage} <br> Player 1's current total score is ${playerOneTotalScore} <br> Player 2's current total score is ${playerTwoTotalScore} <br> Player 1's scores in descending order is ${playerOneDescendingScores} <br> Player 2's scores in descending order is ${playerTwoDescendingScores}`;
  } else if (gameMode == `player 2`) {
    diceRollOne = diceRoll();
    console.log(`dice roll #1 is ${diceRollOne}`);
    diceRollTwo = diceRoll();
    console.log(`dice roll #2 is ${diceRollTwo}`);
    // changes gameMode variable to prepare for next game mode: player 2's choice
    gameMode = `player 2 choice`;
    myOutputValue = `Welcome Player 2. <br>You rolled ${diceRollOne} for Dice 1 and ${diceRollTwo} for Dice 2. <br>Choose the order of the dice by entering "1" or "2". <br>${playerOneRunningScoreMessage} <br>${playerTwoRunningScoreMessage} <br> Player 1's current total score is ${playerOneTotalScore} <br> Player 2's current total score is ${playerTwoTotalScore} <br> Player 1's scores in descending order is ${playerOneDescendingScores} <br> Player 2's scores in descending order is ${playerTwoDescendingScores}`;
  } else if (gameMode == `player 2 choice`) {
    gameMode = `player 1`;
    if (input == "1") {
      diceChoice = `Dice 1`;
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP2Number = Number(`${diceRollOne}${diceRollTwo}`);
      console.log(`Player 2's number is ${twoDigitP2Number}.`);
    } else if (input == "2") {
      diceChoice = `Dice 2`;
      console.log(`dice roll #1 is ${diceRollOne}`);
      console.log(`dice roll #2 is ${diceRollTwo}`);
      twoDigitP2Number = Number(`${diceRollTwo}${diceRollOne}`);
      console.log(`Player 2's number is ${twoDigitP2Number}`);
    }
    playerTwoRunningScore.push(twoDigitP2Number);
    playerTwoTotalScore = calcTotalSumInArray(playerTwoRunningScore);
    playerTwoDescendingScores = sortScoresInDecreasingOrder(
      playerTwoRunningScore
    );
    playerTwoRunningScoreMessage = `Player Two's running scores are: ${playerTwoRunningScore}, `;
    winningMessage = determineWinner(twoDigitP1Number, twoDigitP2Number);
    myOutputValue = `Player 2, you chose ${diceChoice} first. <br>Your number is ${twoDigitP2Number}. <br>${winningMessage} <br>${playerOneRunningScoreMessage} <br>${playerTwoRunningScoreMessage} <br> Player 1's current total score is ${playerOneTotalScore} <br> Player 2's current total score is ${playerTwoTotalScore} <br> Player 1's scores in descending order is ${playerOneDescendingScores} <br> Player 2's scores in descending order is ${playerTwoDescendingScores}`;
  }
  return myOutputValue;
};
