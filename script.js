// 2 game mode:
//1. Player 1 to input and get number
//2. Player 2 to input and get number

var mode = "Player1";

var main = function (input) {
  var randomdicenumber1 = rollDice();
  var randomdicenumber2 = rollDice();

  var myOutputValue =
    "Type Player1 or Player2 to start the dice roll for each player";

  //Player1
  if (input == "Player1") {
    mode == "Player1";
    var message = "";
    message =
      "Welcome Player 1. You rolled " +
      randomdicenumber1 +
      " for Dice 1 and " +
      randomdicenumber2 +
      " for Dice 2. Choose the order of the dice by writing the first desired number in. ";
    return message;
  }
  if (input == randomdicenumber1) {
    var finalmessage = "";
    finalmessage =
      "Congratulations! Your final number is " +
      randomdicenumber1 +
      randomdicenumber2;
    return finalmessage;
  } else if (input == randomdicenumber2) {
    var finalmessage2 = "";
    finalmessage2 =
      "Congratulations! Your final number is " +
      randomdicenumber2 +
      randomdicenumber1;
    return finalmessage2;
  }

  //Player 2
  if (input == "Player2") {
    mode == "Player2";
    var message2 = "";
    message2 =
      "Welcome Player 2. You rolled " +
      randomdicenumber1 +
      " for Dice 1 and " +
      randomdicenumber2 +
      " for Dice 2. Choose the order of the dice by writing the first desired number in. ";
    return message2;
  }

  if (input == randomdicenumber1) {
    var finalmessage3 = "";
    finalmessage3 =
      "Congratulations! Your final number is " +
      randomdicenumber1 +
      randomdicenumber2;
    return finalmessage3;
  } else if (input == randomdicenumber2) {
    var finalmessage4 = "";
    finalmessage4 =
      "Congratulations! Your final number is " +
      randomdicenumber2 +
      randomdicenumber1;
    return finalmessage4;
  }

  return myOutputValue;
};

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
