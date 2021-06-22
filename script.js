//There are 2 players and players take turns.

var gameMode = "Roll Dice";
//Game Mode 1 is roll dice
//Game Mode 2 is dice order

var player1Dice = [];
var player2Dice = [];
var dice1;
var dice2;
var currentPlayer = 1;

//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
var main = function (input) {
  console.log("game mode is " + gameMode);
  if (gameMode == "Roll Dice") {
    console.log("The current player is " + currentPlayer);
    dice1 = rollDice();
    dice2 = rollDice();

    if (currentPlayer == 1) {
      player1Dice.push(dice1);
      player1Dice.push(dice2);
    } else if (currentPlayer == 2) {
      player2Dice.push(dice1);
      player2Dice.push(dice2);
    }
    console.log("dice 1:" + dice1);
    console.log("dice 2:" + dice2);

    gameMode = "Dice Order";

    myOutputValue =
      "Player " +
      input +
      " rolled " +
      dice1 +
      " for Dice 1 and " +
      dice2 +
      " for Dice 2. " +
      "<br>Action required: Please enter 1 or 2 to decide if you want to have the dice1 or dice2 as your first digit";
    //The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
    //"Choose the order of the dice."
  } else if (gameMode == "Dice Order") {
    diceOrder = input;
    var dices = getPlayerDice(currentPlayer);
    if (currentPlayer == 1) {
      if (diceOrder == 1) {
        myOutputValue =
          "Your number combination is: " +
          dices.join("") +
          "<br>Now it is Player 2's turn to roll the dice. ";
      } else if (diceOrder == 2) {
        dices = [dices[1], dices[0]];
        storePlayerDice(currentPlayer, dices);
        myOutputValue =
          "Your number combination is: " +
          dices.join("") +
          "<br>Now it is Player 2's turn to roll the dice. ";
      }
      currentPlayer = 2;
      gameMode = "Roll Dice";
    } else if (currentPlayer == 2) {
      if (diceOrder == 1) {
        myOutputValue = "Your number combination is: " + dices.join("");
      } else if (diceOrder == 2) {
        dices = [dices[1], dices[0]];
        if (currentPlayer == 1) {
          player1Dice = dices;
        } else if (currentPlayer == 2) {
          player2Dice = dices;
        }
        myOutputValue = "Your number combination is: " + dices.join("");
      }
      winningPlayer = whoWins();
      myOutputValue = myOutputValue + "<br> Player1: " + player1Dice.join("");
      myOutputValue = myOutputValue + "<br> Player2: " + player2Dice.join("");
      myOutputValue =
        myOutputValue + "<br>The Winning player is: " + winningPlayer;
    }
  }
  return myOutputValue;
};

var getPlayerDice = function (currentPlayer) {
  if (currentPlayer == 1) {
    return player1Dice;
  } else if (currentPlayer == 2) {
    return player2Dice;
  }
};

var storePlayerDice = function (currentPlayer, dices) {
  if (currentPlayer == 1) {
    player1Dice = dices;
  } else if (currentPlayer == 2) {
    player2Dice = dices;
  }
};

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  gameMode = "";
  return diceNumber;
};

//trying to replicate the above for player2
//currentPlayer == "Player 2";
//gameMode = "Roll Dice";
//return "It is now Player 2's turn. Press Submit to roll Player's 2 dice";

//after both players have rolled and chosen dice order, the player with the higher combined number wins.
var whoWins = function () {
  if (player1Dice.join("") > player2Dice.join("")) {
    return "Play 1 won";
  }
  return "Play 2 won";
};
