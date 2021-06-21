//Base game rules
// Player 1 clicks submit, the game rolls 2 dice
// Player 1 chooses which dice number goes first
// The game outputs Player 1's number
// Player 2's turn
// Player with the higher combined number wins
//switch between 2 players

//lowest combined number wins game mode
//player 1 chooses low or high game mode
// if high game mode chosen, base game rules run
// if low game mode chosen, gameModeRollDice runs, gameModeChooseDice runs, but rules for winning changes

//game modes
//game mode for rolling dice
var gameModeRollDice = "Game Mode-Roll Dice";
//game mode for choosing dice order
var gameModeChooseDice = "Game Mode-Choose Dice";
//game mode to choose game mode
var gameModeChooseMode = "Choose game mode";
//game mode where player with lowest combined number wins
var gameModeLowestWins = "Game Mode-lowest combined number wins";
//rolling dice mode under gameModeLowestWins
var gameModeRollDiceLow = "Roll Dice mode under gameModeLowestWins";
//choose dice mode under gameModeLowestWins
var gameModeChooseDiceLow = "choose dice mode under gameModeLowestWins";

//start with Game Mode-Roll Dice
var currentGameMode = gameModeChooseMode;

//Dice Roll
var rollDice = function () {
  return Math.floor(Math.random() * 6 + 1);
};

//current player number - start with 1
var currentPlayer = 1;

// two dice rolled
var rolledNumbers = [rollDice(), rollDice()];

// Combined number of each player
var player1CombinedNumber;
var player2CombinedNumber;

var getPlayerCombinedNum = function (diceOrder) {
  // Player's combined number based on selected dice order
  var playerCombinedNumber;
  if (diceOrder == 1) {
    var playerCombinedNumber = Number(
      String(rolledNumbers[0]) + String(rolledNumbers[1])
    );
  } else if (diceOrder == 2) {
    playerCombinedNumber = Number(
      String(rolledNumbers[1]) + String(rolledNumbers[0])
    );
  }

  if (currentPlayer == 1) {
    player1CombinedNumber = playerCombinedNumber;
    console.log(player1CombinedNumber);
  } else {
    player2CombinedNumber = playerCombinedNumber;
    console.log(player2CombinedNumber);
  }
  return playerCombinedNumber;
};

//picking the winner based on the Combined Number of each player
var pickWinner = function () {
  if (player1CombinedNumber > player2CombinedNumber) {
    return 1;
  }
  return 2;
};

//picking the winner of the lowest combined score wins gamemode
var pickWinnerOfLowestWinsMode = function () {
  if (player1CombinedNumber > player2CombinedNumber) {
    return 2;
  }
  return 1;
};

//Keep score of each player, score=sum of numbers the player has generated so far
var playerScore = 0;
var player1Score = 0;
var player2Score = 0;
//create arrays to track each player's combined numbers for score checking
var trackPlayer1Scores = [];
var trackPlayer2Scores = [];

//picking the winner based on the Cumulative Score of each player
var pickHigherScorer = function () {
  if (player1Score > player2Score) {
    return 1;
  }
  return 2;
};

var main = function (input) {
  var myOutputValue = "hello world";

  if (currentGameMode == gameModeChooseMode) {
    if (input == "low") {
      currentGameMode = gameModeLowestWins;
      return `You have chosen to play lowest combined number game mode. Click Submit to roll dice.`;
    } else if (input == "high") {
      currentGameMode = gameModeRollDice;
      return `You have chosen to play highest combined number game mode. Click Submit to roll dice.`;
    }
    //if player enters neither 'low' nor 'high'
    else
      return `We don't recognise your input. Enter 'high' to play highest combined number game mode, or 'low'to play lowest combined number mode.`;
  }
  //Roll Dice game mode
  else if (currentGameMode == gameModeRollDice) {
    rolledNumbers = [rollDice(), rollDice()];
    console.log(rolledNumbers);

    currentGameMode = gameModeChooseDice;

    return `Welcome Player ${currentPlayer}.<br> You rolled ${rolledNumbers[0]} for Dice 1 and ${rolledNumbers[1]} for Dice 2. <br> Choose the order of the dice (enter 1 if Dice 1 comes first, or 2 if Dice 2 comes first).`;
  }
  //Choose Dice game mode
  else if (currentGameMode == gameModeChooseDice) {
    //order of dice
    var diceOrder = Number(input);

    if (diceOrder !== 1 && diceOrder !== 2) {
      return `We do not recognise this dice number. Please enter 1 or 2.`;
    }

    var playerCombinedNumber = getPlayerCombinedNum(diceOrder);

    // add combined number to score
    if (currentPlayer == 1) {
      player1Score = player1Score + player1CombinedNumber;
      trackPlayer1Scores.push(player1CombinedNumber);
      console.log(trackPlayer1Scores);
    } else if (currentPlayer == 2) {
      player2Score = player2Score + player2CombinedNumber;
      trackPlayer2Scores.push(player2CombinedNumber);
      console.log(trackPlayer2Scores);
    }

    var outputMessage = `Player ${currentPlayer}, you chose Dice ${diceOrder} first. <br>Your number is ${playerCombinedNumber}.<br>Player 1 score: ${player1Score} | Player 2 score: ${player2Score}.`;

    // if player 1,  switch to player2 and mode
    if (currentPlayer == 1) {
      currentPlayer = 2;
      currentGameMode = gameModeRollDice;
      return `${outputMessage} <br> It is now Player 2's turn.`;
    }

    // if player 2, announce winner and start new game
    var winningPlayer = pickHigherScorer();

    // reset game
    currentPlayer = 1;
    currentGameMode = gameModeChooseMode;

    return `${outputMessage} <br> The winner is player ${winningPlayer}. <br>Player 1's number is ${player1CombinedNumber}.<br>Player 2's number is ${player2CombinedNumber}.<br>Please submit and play again.`;
  }

  // Lowest Combined Score game mode
  else if (currentGameMode == gameModeLowestWins) {
    currentGameMode = gameModeRollDiceLow;

    //Roll Dice game mode

    rolledNumbers = [rollDice(), rollDice()];
    console.log("lowrow " + rolledNumbers);

    currentGameMode = gameModeChooseDiceLow;

    return `Welcome Player ${currentPlayer}.<br> You rolled ${rolledNumbers[0]} for Dice 1 and ${rolledNumbers[1]} for Dice 2. <br> Choose the order of the dice (enter 1 if Dice 1 comes first, or 2 if Dice 2 comes first).`;
  }

  //Choose Dice game mode
  else if (currentGameMode == gameModeChooseDiceLow) {
    //order of dice
    var diceOrder = Number(input);

    if (diceOrder !== 1 && diceOrder !== 2) {
      myOutputValue = `We do not recognise this dice number. Please enter 1 or 2.`;
    }

    var playerCombinedNumberLow = getPlayerCombinedNum(diceOrder);

    // add combined number to score
    if (currentPlayer == 1) {
      player1Score = player1Score + player1CombinedNumber;
      trackPlayer1Scores.push(player1CombinedNumber);
      console.log(trackPlayer1Scores);
    } else if (currentPlayer == 2) {
      player2Score = player2Score + player2CombinedNumber;
      trackPlayer2Scores.push(player2CombinedNumber);
      console.log(trackPlayer2Scores);
    }

    var outputMessage2 = `Player ${currentPlayer}, you chose Dice ${diceOrder} first. <br>Your number is ${playerCombinedNumberLow}.<br>Player 1 score: ${player1Score} | Player 2 score: ${player2Score}.`;

    // if player 1,  switch to player2 and roll dice mode
    if (currentPlayer == 1) {
      currentPlayer = 2;
      currentGameMode = gameModeLowestWins;
      return `${outputMessage2} <br> It is now Player 2's turn.`;
    }

    // if player 2, announce winner and start new game
    var winningPlayer = pickWinnerOfLowestWinsMode();

    // reset game
    currentPlayer = 1;
    currentGameMode = gameModeChooseMode;

    return `${outputMessage2} <br> The winner is player ${winningPlayer}. <br>Player 1's number is ${player1CombinedNumber}.<br>Player 2's number is ${player2CombinedNumber}.<br>Please submit and play again.`;
  }

  return myOutputValue;
};
