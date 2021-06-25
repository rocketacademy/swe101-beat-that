//make global var for game modes for first roll
var gameMode = "1";

//variable to track players rolls
// var currentPlayer = 1;

//global var for tracking dice rolls and orders
var player1Final = "";
var player2Final = "";
var player1Rolls = [];
var player2Rolls = [];

//make random dice roll
var generateDiceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//make dice roll function for 2 rolls from random generator (array)

var diceRoll = function () {
  var diceRoll1 = generateDiceRoll();
  var diceRoll2 = generateDiceRoll();
  var bothDice = [diceRoll1, diceRoll2];
  return bothDice;
};

//display the game messages for each player
var displayMessage = function (playerRoll) {
  var playerNo = "Hello Player 1!";
  if (gameMode == 2) {
    playerNo = "Hello Player 2!";
  }
  return `${playerNo} <br> You rolled ${playerRoll[0]} for Dice 1 and ${playerRoll[1]} for Dice 2. <br> Choose the order of the dice by entering 1 or 2 as your first dice. `;
};

//create the combined chosen number by the dice order
var chosenNumber = function (firstNum, scndNum) {
  return "" + scndNum[firstNum - 1] + scndNum[scndNum.length - firstNum];
};

//compare the numbers to find the larger number between both players
var compareDice = function (player1, player2) {
  if (Number(player1) > Number(player2)) {
    return `Player 1 has ${player1} and Player 2 has ${player2}. Player 1 wins!`;
  }
  return `Player 1 has ${player1} and Player 2 has ${player2}. Player 2 wins!`;
};

//the player with the higher combined number wins - output

var main = function (input) {
  var myOutputValue = "hello world";

  var outputValue = "";

  //create the functions for the game modes
  if (gameMode == "1") {
    player1Rolls = diceRoll();
    outputValue = displayMessage(player1Rolls);
    gameMode = "Player 1 game";
    return outputValue;
  } else if (gameMode == "Player 1 game") {
    player1Final = chosenNumber(input, player1Rolls);
    gameMode = "2";
    return "Player 2 can roll the dice now!";
  } else if (gameMode == "2") {
    player2Rolls = diceRoll();
    outputValue = displayMessage(player2Rolls);
    gameMode = "Player 2 game";
    return outputValue;
  } else if (gameMode == "Player 2 game") {
    player2Final = chosenNumber(input, player2Rolls);
    gameMode = "check";
    return "Let's see who the winner is!";
  } else {
    outputValue = compareDice(player1Final, player2Final);
    gameMode = "1";
    return outputValue;
  }
};
