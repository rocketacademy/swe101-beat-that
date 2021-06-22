// var for game stage
var PLAYER1 = `Player 1`;
var PLAYER2 = `Player 2`;
var PLAYER1_CHOOSE_DICE_ORDER = `Player 1 choose dice order`;
var PLAYER2_CHOOSE_DICE_ORDER = `Player 2 choose dice order`;
var COMPARE_SCORE = `Compare Score`;

// store players' score for each round
var player1Score = 0;
var player2Score = 0;
// store players' accumulated score
var totalScorePlayer1 = 0;
var totalScorePlayer2 = 0;
// set initial stage to player 1
var gameStage = PLAYER1;
// global var to store players' dicerolls and assigned to array
var player1DiceNums = [];
var player2DiceNums = [];

// default messages for output
var selectDiceOrderMessage = `Select which dice number to go first by entering 1 for Dice 1 or 2 for Dice 2.`;
var submitToRestartGameMessage = `<br><br>Click Submit for Player 1 to roll again`;
var totalScoreMessage = `Your total score now is`;

// create diceRoll function
var rollDice = function () {
  // create random dice roll from 1 to 6
  var diceNum = Math.floor(Math.random() * 6) + 1;
  return diceNum;
};

// create function for players' 2 dice rolls
var playerDiceRolls = function () {
  var dice1 = rollDice();
  var dice2 = rollDice();
  console.log(`dice 1:` + dice1);
  console.log(`dice 2:` + dice2);
  var diceNums = [dice1, dice2];
  console.log(`p1 dice nums` + diceNums);
  if (gameStage == PLAYER1) {
    player1DiceNums = diceNums;
    console.log(`p1globalnums ` + player1DiceNums);
    return `Hi ${gameStage}, you rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br>${selectDiceOrderMessage}`;
  } else {
    player2DiceNums = diceNums;
    console.log(`p2globalnums ` + player2DiceNums);
    return `Hi ${gameStage}, you rolled ${dice1} for Dice 1 and ${dice2} for Dice 2. <br><br>${selectDiceOrderMessage}`;
  }
};

var generateCombinedNumber = function (firstDiceIndex, playerDiceNums) {
  if (firstDiceIndex == 1) {
    playerScore = Number(String(playerDiceNums[0]) + String(playerDiceNums[1]));
  } else {
    playerScore = Number(String(playerDiceNums[1]) + String(playerDiceNums[0]));
  }
  return playerScore;
};

// calculating players' score based on the dice order they selected
var getPlayersScore = function (input) {
  if (gameStage == PLAYER1_CHOOSE_DICE_ORDER) {
    // helper function for P1
    player1Score = generateCombinedNumber(input, player1DiceNums);

    totalScorePlayer1 = totalScorePlayer1 + player1Score;
    return `Player 1, your score is ${player1Score}. <br><br> ${totalScoreMessage} ${totalScorePlayer1} <br><br>Click Submit for Player 2 to roll the dices!`;
  }
  if (gameStage == PLAYER2_CHOOSE_DICE_ORDER) {
    // helper function for P2
    player2Score = generateCombinedNumber(input, player2DiceNums);

    totalScorePlayer2 = totalScorePlayer2 + player2Score;
    return `Player 2, your score is ${player2Score}. <br><br>${totalScoreMessage} ${totalScorePlayer2} <br><br>Click Submit to see who won the game!`;
  }
};

// comparing the players total score
var compareScore = function () {
  if (player1Score > player2Score) {
    return `Congrats Player 1, you won this round. <br><br> Your score: ${player1Score} <br> Player 2 score: ${player2Score}${submitToRestartGameMessage}<br><br> ${determineLeaderNow()}`;
  }
  if (player1Score < player2Score) {
    return `Congrats Player 2, you won this round. <br><br>Your score: ${player2Score} <br> Player 1 score: ${player1Score}${submitToRestartGameMessage}<br><br> ${determineLeaderNow()}`;
  }
  if (player1Score == player2Score) {
    return `Oops its a draw! <br><br>Both of you have the same score :${player1Score}!${submitToRestartGameMessage}<br><br> ${determineLeaderNow()}`;
  }
};

// creating leaderboard
var determineLeaderNow = function () {
  if (totalScorePlayer1 > totalScorePlayer2) {
    return `LeaderBoard<br>1. Player 1, Total Score: ${totalScorePlayer1}<br> 2. Player 2, Total Score: ${totalScorePlayer2}`;
  } else {
    return `LeaderBoard<br>1. Player 2, Total Score: ${totalScorePlayer2}<br> 2. Player 1, Total Score: ${totalScorePlayer1}`;
  }
};

var main = function (input) {
  var myOutputValue = ``;
  // set initial stage for player 1 to roll dice
  if (gameStage == PLAYER1) {
    myOutputValue = playerDiceRolls();
    gameStage = PLAYER1_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  // set stage for player 1 to choose dice order and switch over to player 2
  if (gameStage == PLAYER1_CHOOSE_DICE_ORDER) {
    if (!(input == 1 || input == 2)) {
      return `Pls enter 1 or 2 to choose dice order!`;
    }
    myOutputValue = getPlayersScore(input);
    gameStage = PLAYER2;
    return myOutputValue;
  }
  // player 2 turn to roll dice
  if (gameStage == PLAYER2) {
    myOutputValue = playerDiceRolls();
    gameStage = PLAYER2_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }
  // player 2 turn to choose dice order
  if (gameStage == PLAYER2_CHOOSE_DICE_ORDER) {
    if (!(input == 1 || input == 2)) {
      return `Pls enter 1 or 2 to choose dice order!`;
    }
    myOutputValue = getPlayersScore(input);
    gameStage = COMPARE_SCORE;
    return myOutputValue;
  }
  // comparing score
  if (gameStage == COMPARE_SCORE) {
    myOutputValue = compareScore();
    gameStage = PLAYER1;
    return myOutputValue;
  }
};
