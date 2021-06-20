// two different modes
var diceGame = "diceroll";
var ChooseOrder = "choose order";
// start with diceroll game first
var gameMode = diceGame;
// who's turn is it?
var currentPlayer = 1;
// to keep track of the players' dice rolls
var diceRollOfP1 = [];
var diceRollOfP2 = [];
// Players' Chosen Numbers
var p1Num;
var p2Num;

var main = function (input) {
  if (gameMode == diceGame) {
    var newDiceRoll = getNewDiceRoll();
    // console.log(newDiceRoll, "runs first");
    gameMode = ChooseOrder;
    return (
      "Hello Player " +
      currentPlayer +
      "! <br> You rolled " +
      newDiceRoll[0] +
      " on dice 1 and " +
      newDiceRoll[1] +
      " on dice 2. <br><br> Please choose your order by inputting the number 1 or the number 2."
    );
  }

  if (gameMode == ChooseOrder) {
    gameMode = ChooseOrder;
    var numberChosen = Number(input);
    // console.log(numberChosen, "number");
    if (numberChosen != 1 && numberChosen != 2) {
      return "Please only input the number 1 or 2 as your chosen order.";
    }

    var playerNum = retrievePlayerNumber(numberChosen);
    // console.log(playerNum, "get number");
    // console.log("p1dice:", diceRollOfP1, "p2dice:", diceRollOfP2);
    var playerNumResponse =
      "Player " +
      currentPlayer +
      ", You chose Dice " +
      numberChosen +
      " first. <br> Your number is " +
      playerNum +
      ".";

    if (currentPlayer == 1) {
      currentPlayer = 2;
      // console.log(currentPlayer, "current");
      gameMode = diceGame;
      // console.log(gameMode, "dice now");
      return (
        playerNumResponse +
        "<br> It is now player 2's turn. Press submit to roll player 2's dice."
      );
    }
    var winingPlayer = getWinner();

    currentPlayer = 1;
    gameMode = diceGame;

    return (
      playerNumResponse +
      "<br> Player " +
      winingPlayer +
      " has won. <br> Player 1's number: " +
      p1Num +
      " <br> " +
      " Player 2's number: " +
      p2Num +
      " <br><br> Press submit to play again."
    );
  }
};

// dice roll function
var generateNewDiceRoll = function () {
  var newDiceRoll = Math.floor(Math.random() * 6) + 1;
  return newDiceRoll;
};

// roll dice into array
var getNewDiceRoll = function () {
  var newDiceRoll = [generateNewDiceRoll(), generateNewDiceRoll()];
  // console.log(newDiceRoll, "getnewDiceRoll");
  if (currentPlayer == 1) {
    diceRollOfP1 = newDiceRoll;
    // console.log(diceRollOfP1, "p1roll");
  } else {
    diceRollOfP2 = newDiceRoll;
    // console.log(diceRollOfP2, "p2roll");
  }
  return newDiceRoll;
};

// To get the player's number
var retrievePlayerNumber = function (numberChosen) {
  var playerNum = "";
  // create variable, store the existing dice roll array generated into each player's dice roll array
  var playerDiceRoll;
  if (currentPlayer == 1) {
    playerDiceRoll = diceRollOfP1;
  } else if (currentPlayer == 2) {
    playerDiceRoll = diceRollOfP2;
  }

  if (numberChosen == 1) {
    // console.log(numberChosen, ", option 1 chosen");
    if (currentPlayer == 1) {
      p1Num = "" + playerDiceRoll[0] + playerDiceRoll[1];
      // console.log(p1Num, "p1num1");
      return p1Num;
    } else if (currentPlayer == 2) {
      p2Num = "" + playerDiceRoll[0] + playerDiceRoll[1];
      // console.log(p2Num, "p2num2");
      return p2Num;
    }
  } else if (numberChosen == 2) {
    // console.log(numberChosen, ", option 2 chosen");
    if (currentPlayer == 1) {
      p1Num = "" + playerDiceRoll[1] + playerDiceRoll[0];
      // console.log(p1Num, "p1num3");
      return p1Num;
    } else if (currentPlayer == 2) {
      p2Num = "" + playerDiceRoll[1] + playerDiceRoll[0];
      // console.log(p2Num, "p2num4");
      return p2Num;
    }
  }
  return playerNum;
};

// To figure out who is the winner
var getWinner = function () {
  if (p1Num > p2Num) {
    return 1;
  } else {
    return 2;
  }
};
