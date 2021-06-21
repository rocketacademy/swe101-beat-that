//BEAT THAT BASE

//There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//roll dice mode

//helper function: roll dice
var randomNumber = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomNumber = randomInteger + 1;
  console.log("randomNumber is:");
  console.log(randomNumber);
  return randomNumber;
};

//player 1 rolls dice
//player 1 choose dice order
//change currPlayer to player 2
//player 2 rolls dice
//player 2 choose dice order
//change mode to compare results

//compare results mode
//compare player 1's result with player 2's result - larger number is winner
//output winner
//reset to roll dice mode

var ROLL_DICE_MODE = "roll dice mode";
var CHOOSE_DICE_ORDER = "choose dice order";
var COMPARE_RESULTS_MODE = "compare results mode";
var LOWEST_MODE = "lowest combined mode";
var gameMode = ROLL_DICE_MODE;

//assign variable to current player
var currPlayer = 1;
//assign variable to player 1
var player1 = "P1";
//assign variable to player 2
var player2 = "P2";
//assign player 1 dice array
var player1DiceArray = [];
//assign player 2 dice array
var player2DiceArray = [];
//assign variable to player 1 number
var player1Num = "";
//assign variable for player 1 score to track player 1 score
var player1Score = 0;
//assign variable for player 2 score to track player 2 score
var player2Score = 0;

//////////////HELPER FUNCTION//////////////////////

//function concatenate 2 numbers to string and back to 1 number
var concat2Numbers = function (number1, number2) {
  var num1String = number1.toString();
  var num2String = number2.toString();
  var combinedNum = Number(num1String + num2String);
  return combinedNum;
};

//function to compare numbers to determine larger number as winner
var getWinner = function () {
  if (player1Num >= player2Num) {
    var winner = "Player 1";
  } else {
    winner = "Player 2";
  }
  return winner;
};

//function to compare numbers to determine smaller number as winner (lowest combined number mode)
var getLCMWinner = function () {
  if (player1Num >= player2Num) {
    var lcmWinner = "Player 2";
  } else {
    lcmWinner = "Player 1";
  }
  return lcmWinner;
};

//function to display leaderboard
var displayLeaderboard = function () {
  if (player1Score >= player2Score) {
    return (
      "Leaderboard: <Br> Player 1 - " +
      player1Score +
      "<br> Player 2 - " +
      player2Score
    );
  } else {
    return (
      "Leaderboard: <Br> Player 2 - " +
      player2Score +
      "<br> Player 1 - " +
      player1Score
    );
  }
};

var main = function (input) {
  if (gameMode == ROLL_DICE_MODE) {
    if (currPlayer == 1) {
      player1DiceArray.push(randomNumber());
      player1DiceArray.push(randomNumber());
      gameMode = CHOOSE_DICE_ORDER;
      return (
        "Hi Player " +
        currPlayer +
        ", your results are: <br> Roll 1: " +
        player1DiceArray[0] +
        " <br> Roll 2: " +
        player1DiceArray[1] +
        "<br><br> Please key in '1' if you want Roll 1 first or '2' if you want Roll 2 first."
      );
    }
    if (currPlayer == 2) {
      player2DiceArray.push(randomNumber());
      player2DiceArray.push(randomNumber());
      gameMode = CHOOSE_DICE_ORDER;
      return (
        "Hi Player " +
        currPlayer +
        ", your results are: <br> Roll 1: " +
        player2DiceArray[0] +
        " <br> Roll 2: " +
        player2DiceArray[1] +
        "<br><br> Please key in '1' if you want Roll 1 first or '2' if you want Roll 2 first."
      );
    }
  }

  if (gameMode == CHOOSE_DICE_ORDER) {
    if (input == "1") {
      if (currPlayer == 1) {
        player1Num = concat2Numbers(player1DiceArray[0], player1DiceArray[1]);
      }
      if (currPlayer == 2) {
        player2Num = concat2Numbers(player2DiceArray[0], player2DiceArray[1]);
      }
    } else if (input == "2") {
      if (currPlayer == 1) {
        player1Num = concat2Numbers(player1DiceArray[1], player1DiceArray[0]);
      }
      if (currPlayer == 2) {
        player2Num = concat2Numbers(player2DiceArray[1], player2DiceArray[0]);
      }
    }

    if (currPlayer == 2) {
      gameMode = COMPARE_RESULTS_MODE;
      myOutputValue =
        "Your chosen number is " +
        player2Num +
        "Click Submit to find out which Player won!";
    }

    if (currPlayer == 1) {
      gameMode = ROLL_DICE_MODE;
      console.log("changing currPlayer to 2");
      currPlayer = 2;

      myOutputValue =
        "Your chosen number is " +
        player1Num +
        ". Player 2 click Submit to roll your dice";
    }
  }

  if (gameMode == COMPARE_RESULTS_MODE) {
    var winner = getWinner();
    gameMode = ROLL_DICE_MODE;
    currPlayer = 1;
    player1DiceArray = [];
    player2DiceArray = [];

    player1Score = player1Score + player1Num;

    player2Score = player2Score + player2Num;

    console.log("player2Score is:");
    console.log(player2Score);
    myOutputValue =
      "Player 1's number is: " +
      player1Num +
      "<br> Player 2's number is: " +
      player2Num +
      "<br> The player who chose the larger number is " +
      winner +
      ".<br> Click Submit to restart the game from Player 1. <br>" +
      displayLeaderboard();
  }

  return myOutputValue;
};
