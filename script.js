var die1;
var die2;
var player1Score = [];
var player1GlobalScore = 0;
var player2Score = [];
var player2GlobalScore = 0;
var player = 1;
var mode = "dice roll";

var main = function (input) {
  var outputMessage;
  while (player == 1) {
    if (mode == "dice roll") {
      var diceResult = roll2Dice();
      mode = "choose dice order";
      outputMessage = `Welcome Player 1. <br>
     ${diceResult} <br>Choose the order of the dice.`;
    } else if (mode == "choose dice order") {
      var player1Number = concatDiceResult(input);
      player1Score.push("" + player1Number);

      // sum of player 1's score thus far
      var index = 0;
      var player1CurrentScore = 0;
      while (index < player1Score.length) {
        var currentLoopScore = player1Score[index];
        player1CurrentScore =
          Number(player1CurrentScore) + Number(currentLoopScore);
        index = index + 1;
      }
      player1GlobalScore = player1CurrentScore;
      player = 2;
      mode = "dice roll";
      var gameLeader = decideLeader();
      outputMessage = `Player 1, you chose Dice ${input} first. <br>Your number is ${player1Number}. <br>${gameLeader}<br>It's Player 2's turn.`;
    }
    return outputMessage;
  }
  while (player == 2) {
    if (mode == "dice roll") {
      var diceResult = roll2Dice();
      mode = "choose dice order";
      outputMessage = `Welcome Player 2. <br>
     ${diceResult} <br>Choose the order of the dice.`;
    } else if (mode == "choose dice order") {
      var player2Number = concatDiceResult(input);
      player2Score.push("" + player2Number);
      console.log("player 2 score " + player2Score);

      // sum of player 2's score thus far
      var index = 0;
      var player2CurrentScore = 0;
      while (index < player2Score.length) {
        var currentLoopScore = player2Score[index];
        player2CurrentScore =
          Number(player2CurrentScore) + Number(currentLoopScore);
        index = index + 1;
      }
      player2GlobalScore = player2CurrentScore;
      mode = "dice roll";
      player = 1;
      var gameLeader = decideLeader();
      outputMessage = `Player 2, you chose Dice ${input} first. <br>Your number is ${player2Number}.<br>${gameLeader} <br>It is Player 1's turn.`;
    }
    return outputMessage;
  }
};

// concatenate dice result
function concatDiceResult(input) {
  var concatanatedDiceResult;
  if (Number(input) == 1) {
    concatanatedDiceResult = `${die1}`.concat(`${die2}`);
  } else if (Number(input) == 2) {
    concatanatedDiceResult = `${die2}`.concat(`${die1}`);
  }
  return concatanatedDiceResult;
}

// decide leading winner
function decideLeader() {
  if (player2GlobalScore == 0) {
    var winnerIs = "";
  } else if (player2GlobalScore > player1GlobalScore) {
    winnerIs = "Player 2 is in the lead!";
  } else if (player2GlobalScore < player1GlobalScore) {
    winnerIs = "Player 1 is in the lead!";
  } else if (player2GlobalScore == player1GlobalScore) {
    winnerIs = "It's a draw!";
  }
  return `<br>Player 1's score is ${player1GlobalScore}.Player 2's score is ${player2GlobalScore}. ${winnerIs}`;
}

// roll both dice
function roll2Dice() {
  die1 = rollDie();
  die2 = rollDie();
  var diceOutput = `You rolled ${die1} for Dice One and ${die2} for Dice Two.`;
  return diceOutput;
}

// die rolling function setup
function getRandomInteger(max) {
  var randomDecimal = Math.random();
  var randomInteger = Math.floor(randomDecimal * max);
  return randomInteger;
}

function rollDie() {
  var randomDieFace = getRandomInteger(6) + 1;
  return randomDieFace;
}
