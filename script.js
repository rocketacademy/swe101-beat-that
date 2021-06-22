var currentPlayer = "play";
var player1Num;
var player2Num;

// setting up a dice roll
var rollDice = function () {
  var diceNum = Math.floor(Math.random() * 6 + 1);
  return diceNum;
};

//generating numbers for players function
var generateNumber = function (dice1, dice2, combinedNumber) {
  var dice1;
  var dice2;
  dice1 = rollDice();
  console.log(dice1);
  dice2 = rollDice();
  console.log(dice2);
  var combinedNumber;
  //code to rearrange numbers with highest first
  if (dice1 > dice2) {
    combinedNumber = "" + dice1 + dice2;
  } else {
    combinedNumber = "" + dice2 + dice1;
  }
  console.log(combinedNumber);
  return combinedNumber;
};

var main = function (input) {
  currentPlayer = input;
  if (currentPlayer == "play") {
    player1Num = generateNumber();
    player2Num = generateNumber();
  }
  var message =
    "Player 1 rolled " +
    player1Num +
    ". <br>" +
    "Player 2 rolled " +
    player2Num +
    ".<br>";
  if (player1Num > player2Num) {
    myOutputValue = message + "Player 1 wins!";
  } else {
    myOutputValue = message + "Player 2 wins!";
  }
  return myOutputValue;
};
