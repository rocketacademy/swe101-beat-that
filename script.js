// 2 user modes
//  global array storing player 1 and 2 dice rolls
// no input submit -> output shows number of 2 dice + stored in array
// user inputs which dice goes first (1st or 2nd dice) -> shows final number -> goes into new global array that sums them up
// comparing player 1 and 2 scores -> larger number wins
// input validation: numbers 1 or 2

var currentMode = "start game";
var currentPlayer = 1;
var player1DiceArray = [];
var player2DiceArray = [];
var player1Values = [];
var player2Values = [];
var myOutputValue = "";
var player1Wins = 0;
var player2Wins = 0;

var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  if (currentMode == "start game") {
    myOutputValue = "Welcome, please press Submit to roll your die.";
    currentMode = "dice roll";
    console.log("change mode to dice roll");
    return myOutputValue;
  }

  // game mode: dice roll
  if (currentMode == "dice roll") {
    randomDiceArray = [];
    // user rolls dice
    var randomDice1 = Number(diceRoll());
    var randomDice2 = Number(diceRoll());
    randomDiceArray.push(randomDice1, randomDice2);
    console.log("player dice roll " + randomDice1 + " " + randomDice2);
    console.log("random dice array " + randomDiceArray);
    currentMode = "select dice order";
    // once user enters name -> game switches into dice mode
    myOutputValue =
      "Player " +
      currentPlayer +
      ", you rolled " +
      randomDice1 +
      " for Dice 1 and " +
      randomDice2 +
      " for Dice 2. <br><br> Choose the order of the dice by entering 1 or 2.";
    return myOutputValue;
  }

  // pushing dice roll numbers into arrays for each player
  if (currentPlayer == 1) {
    player1DiceArray = randomDiceArray;
    console.log("player 1 dice array " + player1DiceArray);
  } else {
    player2DiceArray = randomDiceArray;
    console.log("player 2 dice array " + player2DiceArray);
  }

  // player 1's turn and input is 1
  if (currentMode == "select dice order" && input == 1 && currentPlayer == 1) {
    dicePlayer1 = "" + player1DiceArray[0] + player1DiceArray[1];
    player1Values.push(dicePlayer1);
    console.log("dice player number" + dicePlayer1);
    console.log("player 1 array score" + player1Values);
    myOutputValue =
      "Player " +
      currentPlayer +
      " you chose Dice 1 for your first digit. Your value is now " +
      player1Values;
    return myOutputValue;
  }

  // player 1's turn and input is 2
  if (currentMode == "select dice order" && input == 2 && currentPlayer == 1) {
    dicePlayer1 = "" + player1DiceArray[1] + player1DiceArray[0];
    player1Values.push(dicePlayer1);
    console.log("dice player number" + dicePlayer1);
    console.log("player 1 array score" + player1Values);
    myOutputValue =
      "Player " +
      currentPlayer +
      " you chose Dice 2 for your first digit. Your value is now " +
      player1Values;
    return myOutputValue;
  }

  // switching to player 2 and going back to dice roll mode
  if (currentPlayer == 1) {
    currentPlayer = 2;
    currentMode = "dice roll";
    myOutputValue = "It is time for Player " + currentPlayer + " to play.";
    return myOutputValue;
  }

  // player 2's turn and input is 1
  if (currentMode == "select dice order" && input == 1 && currentPlayer == 2) {
    dicePlayer2 = "" + player2DiceArray[0] + player2DiceArray[1];
    player2Values.push(dicePlayer2);
    console.log("dice player number" + dicePlayer2);
    console.log("player 2 array score" + player2Values);
    myOutputValue =
      "Player " +
      currentPlayer +
      " you chose Dice 1 for your first digit. Your value is now " +
      player2Values;
    return myOutputValue;
  }

  // player 2's turn and input is 2
  if (currentMode == "select dice order" && input == 2 && currentPlayer == 2) {
    dicePlayer2 = "" + player2DiceArray[1] + player2DiceArray[0];
    player2Values.push(dicePlayer2);
    console.log("dice player number" + dicePlayer2);
    console.log("player 2 array score" + player2Values);
    myOutputValue =
      "Player " +
      currentPlayer +
      " you chose Dice 2 for your first digit. Your value is now " +
      player2Values;
    return myOutputValue;
  }

  // comparing values
  if (player1Values > player2Values) {
    player1Wins = player1Wins + 1;
    console.log("player 1 wins" + player1Wins);
    console.log("player 2 wins" + player2Wins);
    currentPlayer = 1;
    currentMode = "start game";
    myOutputValue =
      "Player 1 wins! Player 1 has " +
      player1Values +
      " value and " +
      player1Wins +
      " wins, and Player 2 has " +
      player2Values +
      " value and " +
      player2Wins +
      " wins.";
    return myOutputValue;
  }

  if (player1Values < player2Values) {
    player2Wins = player2Wins + 1;
    console.log("player 1 wins" + player1Wins);
    console.log("player 2 wins" + player2Wins);
    currentPlayer = 1;
    currentMode = "start game";
    myOutputValue =
      "Player 2 wins! Player 1 has " +
      player1Values +
      " value and " +
      player1Wins +
      " wins, and Player 2 has " +
      player2Values +
      " value and " +
      player2Wins +
      " wins.";
    return myOutputValue;
  }
  return myOutputValue;
};
