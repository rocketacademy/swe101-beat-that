var gameMode = "p1";
var playerOneNum = [];
var playerTwoNum = [];
var invalid = "Your answer is invalid! Please only type 1 or 2!";
var p1WinCount = 0;
var p2WinCount = 0;

var rollDice = function () {
  var randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};
var randomdice = function () {
  myOutputValue = ``;
  var dice1 = rollDice();
  var dice2 = rollDice();
  var diceValue = [dice1, dice2];
  if (gameMode == "p1") {
    playerOneNum = diceValue;
    return `Welcome Player 1.<br><br><b>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
  }
  if (gameMode == "p2") {
    playerTwoNum = diceValue;
    return `Welcome Player2.<br><br><b>You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br><br>Choose the order of the dice.`;
  }
  return myOutputValue;
};

var main = function (input) {
  myOutputValue = randomdice();
  if (gameMode == "p1") {
    gameMode = "player1whichOrder";
    return myOutputValue;
  }
  if (gameMode == "player1whichOrder") {
    if (!(input == 1 || input == 2)) {
      return invalid;
    }
  }
  // Player1 choooses 1 first.
  if (input == 1 && gameMode == "player1whichOrder") {
    gameMode = "p2";
    playerOneNum = Number(String(playerOneNum[0]) + String(playerOneNum[1]));
    return `Player 1, you chose Dice 1 first.<br>Your number is ${playerOneNum}<br><b>It is now Player 2's turn.`;
    // Player1 chooses 2 first.
  } else if (input == 2 && gameMode == "player1whichOrder") {
    gameMode = "p2";
    playerOneNum = Number(String(playerOneNum[1]) + String(playerOneNum[0]));
    return `Player 1, you chose Dice 2 first.<br>Your number is ${playerOneNum}<br><b>It is now Player 2's turn.`;
  }
  if (gameMode == "p2") {
    gameMode = "player2whichOrder";
    return myOutputValue;
    // Player 2 either choose 1 or 2
  }
  if (gameMode == "player2whichOrder") {
    if (!(input == 1 || input == 2)) {
      return invalid;
    }
    gameMode = "board";
    playerTwoNum = Number(
      String(playerTwoNum[0]) + Number(String(playerTwoNum[1]))
    );
    return `Player 2, you chose Dice 1 first.<br><b>Your number is ${playerTwoNum}.`;
  } else if (input == 2 && gameMode == "player2whichOrder") {
    playerTwoNum = Number(
      String(playerTwoNum[1]) + Number(String(playerTwoNum[0]))
    );
    gameMode = "board";
    return `Player 2, you chose Dice 2 first.<br><b>Your number is ${playerTwoNum}.`;
  }
  if (gameMode == "board") {
    gameMode = "p1";
    if (playerOneNum > playerTwoNum) {
      p1WinCount += 1;
      return `Player 1's number is ${playerOneNum}.Player 2's number is ${playerTwoNum}<br><br>Therefore Player 1 wins!<br><br><b>Player 1 has won ${p1WinCount} rounds!`;
    }
    if (playerTwoNum > playerOneNum) {
      p2WinCount += 1;
      return `Player 1's number is ${playerOneNum}.Player 2's number is ${playerTwoNum}<br><br>Therefore Player 2 wins!<br><br>Player 2 has won ${p2WinCount} rounds!<br><br><b> Click submit to play again!`;
    }
  }
};
