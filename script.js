// 2 players(Game Mode)
// 2 dices (randomiser function)
// Pick the order assign order for result
// Higher number wins (myOutputValue)
var currentGameMode = "waiting for user name";
var player1Result = 0;
var player2Result = 0;
var player1Name = "";
var player2Name = "";
var randomDiceRoll = 0;
var randomDiceRoll2 = 0;
var nameCounter = 0;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var main = function (input) {
  var myOutputValue = "Hello ";
  if (currentGameMode == "waiting for user name") {
    if (nameCounter == 1) {
      player2Name = input;
      myOutputValue = myOutputValue + player2Name;
      nameCounter = nameCounter - 1;
      currentGameMode = "playerRollDice";
      return myOutputValue;
    }
    // set the name
    player1Name = input;
    nameCounter = nameCounter + 1;
    currentGameMode = "playerRollDice";

    // now that we have the name, switch the mode
    currentGameMode = "playerRollDice";

    myOutputValue = myOutputValue + player1Name;
    return myOutputValue;
  } else if (currentGameMode == "playerRollDice") {
    if (input == 1) {
      var result = randomDiceRoll + "" + randomDiceRoll2;
      myOutputValue = player1Name + " Your results is " + result;
      if (player2Name != "") {
        if (result > player1Result) {
          myOutputValue = player2Name + "<br>You won with " + result;
        }
        if (player1Result > result) {
          myOutputValue = player1Name + "<br>You won with " + player1Result;
        }
        currentGameMode = "waiting for user name";
        return myOutputValue;
      }
      currentGameMode = "waiting for user name";
      player1Result = result;
      return myOutputValue;
    }

    if (input == 2) {
      var result = randomDiceRoll2 + "" + randomDiceRoll;
      myOutputValue = player1Name + " Your results is " + result;
      if (player2Name != "") {
        if (result > player1Result) {
          myOutputValue = player2Name + "<br>You won with " + result;
        }
        if (player1Result > result) {
          myOutputValue = player1Name + "<br>You won with " + player1Result;
        }
        currentGameMode = "waiting for user name";
        return myOutputValue;
      }
      currentGameMode = "waiting for user name";
      player1Result = result;
      return myOutputValue;
    }

    myOutputValue = playDiceGame(player1Name);
    //now that we have result from Player 1/ Player 2's turn starts
    //currentGameMode = "player2"

    return myOutputValue;
  }
};
var playDiceGame = function () {
  var message = "";
  // dice game logic

  randomDiceRoll = rollDice();
  randomDiceRoll2 = rollDice();
  message =
    "Welcome" +
    "<br>You rolled " +
    randomDiceRoll +
    " for Dice 1 and " +
    randomDiceRoll2 +
    " for Dice 2 <br>" +
    "Choose order of the dice";
  console.log(randomDiceRoll);
  console.log(randomDiceRoll2);
  console.log(message);
  return message;
};
