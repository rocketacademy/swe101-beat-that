// The different game modes or turns
var GAME_MODE_CHOOSE_HIGHEST_OR_LOWEST = "CHOOSE HIGHEST_OR_LOWEST";
var GAME_MODE_CHOOSE_NUMBER_OF_DICE = "CHOOSE_NUMBER_OF_DICE";
var GAME_MODE_PLAYER_ONE_ROLL = "PLAYER_ONE_ROLL";
var GAME_MODE_PLAYER_ONE_CHOOSE = "PLAYER_ONE_CHOOSE";
var GAME_MODE_PLAYER_TWO_ROLL = "PLAYER_TWO_ROLL";
var GAME_MODE_PLAYER_TWO_CHOOSE = "PLAYER_TWO_CHOOSE";

// Capture user input
var userInputs = [];
var userInput = null;
var gameMode = GAME_MODE_CHOOSE_HIGHEST_OR_LOWEST;

// Arrays and variables to capture user dice rolls and number results
var player1DiceRolls = [];
var player1Number = 0;
var player1NumberList = [];
var player1Score = 0;
var player2DiceRolls = [];
var player2Number = 0;
var player2NumberList = [];
var player2Score = 0;
var numberOfDice = 0;
var numberOfDices = [];
var diceIndex = 0;
var inputIndex = 0;
var numberIndex = 0;
var numberOfDiceIndex = 0;

// Dice Roll function
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var chooseHighestModeOrLowestMode = function () {
  // Decide how the game will auto-generate combined number depending on the mode chosen.
  // User input validation
  if (userInput != "highest" && userInput != "lowest") {
    return `Please enter either "highest" to play the 'highest combined number mode' or "lowest" to play the 'lowest combined number mode'.`;
  }

  userInputs.push(userInput);

  if (userInputs[inputIndex] == "highest") {
    var outputText = `highest`;
  } else if ((userInputs[inputIndex] = "lowest")) {
    var outputText = `lowest`;
  }

  outputText =
    `Welcome Player 1 and Player 2. <br> You have chosen the ` +
    outputText +
    ` combined number mode. <br> Please enter the number of dice you would like to play with.`;

  // Move the game forward
  gameMode = GAME_MODE_CHOOSE_NUMBER_OF_DICE;

  return outputText;
};

var chooseNumberOfDice = function () {
  // User input validation
  if (!Number(userInput)) {
    return `Please enter a valid number of dice to play with.`;
  }

  numberOfDices.push(userInput);

  outputText = `Player 1 and Player 2, You have chosen to play with ${numberOfDices[numberOfDiceIndex]}. <br> <br> Player 1, Press 'Submit' to roll the dices.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_ONE_ROLL;

  return outputText;
};

// Player 1's turn to roll dice
var playerOneRoll = function () {
  // Roll the dice
  var counter = 0;
  player1DiceRolls = [];
  while (counter < numberOfDices[numberOfDiceIndex]) {
    // Add dice result to an array
    player1DiceRolls.push(rollDice());
    counter += 1;
  }

  // Generate output text
  var outputText = `Welcome Player 1. You are playing the ${userInputs[inputIndex]} combined number mode, and you chose to play with ${numberOfDices[numberOfDiceIndex]} dice. <br> You rolled ${player1DiceRolls}. <br> The computer will now choose the order of the dice for you. <br> Press Submit.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_ONE_CHOOSE;

  return outputText;
};

// Player 1's turn to choose dice order
var playerOneChoose = function () {
  // Computer auto-generates number for user depending on input
  if (userInputs[inputIndex] == "highest") {
    // Sort the dice rolls's values in decreasing order
    player1DiceRolls.sort(function (a, b) {
      return b - a;
    });
    var counter = 0;
    while (counter < numberOfDices[numberOfDiceIndex]) {
      player1Number = player1Number + String(player1DiceRolls[counter]);
      counter += 1;
    }
  }

  if (userInputs[inputIndex] == "lowest") {
    // Sort the dice rolls's values in ascending order
    player1DiceRolls.sort(function (a, b) {
      return a - b;
    });
    var counter = 0;
    while (counter < numberOfDices[numberOfDiceIndex]) {
      player1Number = player1Number + String(player1DiceRolls[counter]);
      counter += 1;
    }
  }

  // Add number result to array
  player1NumberList.push(Number(player1Number));

  // Generate score
  player1Score = generateScore(player1NumberList);

  // Generate output text
  var outputText = `Player 1, the computer has auto-generated the ${userInputs[inputIndex]} combined number for you, which is ${player1NumberList[numberIndex]} based on the dice rolls ${player1DiceRolls}. <br> Your number(s) generated so far: ${player1NumberList}. <br> Your total score is ${player1Score}. <br> It is now Player 2's turn.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_TWO_ROLL;

  return outputText;
};

// Player 2's turn to roll dice
var playerTwoRoll = function () {
  // Roll the dice
  var counter = 0;
  player2DiceRolls = [];
  while (counter < numberOfDices[numberOfDiceIndex]) {
    // Add dice result to an array
    player2DiceRolls.push(rollDice());
    counter += 1;
  }

  // Generate output text
  var outputText = `Welcome Player 2. You are playing the ${userInputs[inputIndex]} combined number mode, and you chose to play with ${numberOfDices[numberOfDiceIndex]} dice. <br> You rolled ${player2DiceRolls}. <br> The computer will now choose the order of the dice for you. <br> Press Submit.`;

  // Move the game forward
  gameMode = GAME_MODE_PLAYER_TWO_CHOOSE;

  return outputText;
};

// Player 2's turn to choose dice order
var playerTwoChoose = function () {
  player2Number = 0;

  // Computer auto-generates number for user depending on input
  if (userInputs[inputIndex] == "highest") {
    // Sort the dice rolls's values in decreasing order
    player2DiceRolls.sort(function (a, b) {
      return b - a;
    });
    var counter = 0;
    while (counter < numberOfDices[numberOfDiceIndex]) {
      player2Number = player2Number + String(player2DiceRolls[counter]);
      counter += 1;
    }
  }

  if (userInputs[inputIndex] == "lowest") {
    // Sort the dice rolls's values in ascending order
    player2DiceRolls.sort(function (a, b) {
      return a - b;
    });
    var counter = 0;
    while (counter < numberOfDices[numberOfDiceIndex]) {
      player2Number = player2Number + String(player2DiceRolls[counter]);
      counter += 1;
    }
  }

  // Add number result to array
  player2NumberList.push(Number(player2Number));

  // Generate score
  player2Score = generateScore(player2NumberList);

  // Generate output text
  var outputWord = `Player 2, the computer has auto-generated the
    ${userInputs[inputIndex]} combined number for you, which is ${player2NumberList[numberIndex]} based on the dice rolls ${player2DiceRolls}. <br><br>`;

  if (userInputs[inputIndex] == "highest") {
    var winnerText = decideWinner();
  } else if (userInputs[inputIndex] == "lowest") {
    var winnerText = decideWinnerByLowestNumber();
  }

  // Include leaderboard that lists the 2 players and their scores in decreasing order
  if (player1Score > player2Score) {
    var outputText = `LEADERBOARD <br><br> Player 1 - Score: ${player1Score} <br> Player 2 - Score: ${player2Score}`;
  } else {
    var outputText = `LEADERBOARD <br><br> Player 2 - Score: ${player2Score} <br> Player 1 - Score: ${player1Score}`;
  }

  outputText =
    outputWord +
    `You chose '${userInputs[inputIndex]} combined number mode'. <br><br> The winner of this round: ${winnerText}.<br><br><br>` +
    outputText +
    `<br><br><br>OTHER STATISTICS <br><br> Player 1 - Current Number: ${player1NumberList[numberIndex]} <br> Player 1 - All Numbers: ${player1NumberList} <br><br> Player 2 - Current Number: ${player2NumberList[numberIndex]} <br> Player 2 - All Numbers: ${player2NumberList} <br><br><br> Play again by inputting either "highest" to play the 'highest combined number mode' or "lowest" to play the 'lowest combined number mode'`;

  // Restart the game or play again
  gameMode = GAME_MODE_CHOOSE_HIGHEST_OR_LOWEST;

  // Update dice index count
  diceIndex += 2;
  inputIndex += 1;
  numberIndex += 1;
  numberOfDiceIndex += 1;

  // Redefine values of number to 0
  player1Number = 0;
  player2Number = 0;

  return outputText;
};

// Decide who the winner is (i.e. whose number is higher)
var decideWinner = function () {
  if (player1Number > player2Number) {
    return "Player 1";
  } else {
    return "Player 2";
  }
};

// Decide who the temporary leader is by score
var decideWinnerByScore = function () {
  if (player1Score > player2Score) {
    return "Player 1";
  } else {
    return "Player 2";
  }
};

// Decide who the winner is (i.e. whose number is lowest)
var decideWinnerByLowestNumber = function () {
  if (player1Number < player2Number) {
    return "Player 1";
  } else {
    return "Player 2";
  }
};

// Generate score - running sum of all numbers that player has generated so far
var generateScore = function (array) {
  var score = 0;
  var index = 0;
  while (index < array.length) {
    score = score + array[index];
    index += 1;
  }
  return score;
};

var main = function (input) {
  userInput = input;
  var myOutputValue = "hello";

  // Early return for gameMode = "choose highest or lowest"
  if (gameMode == GAME_MODE_CHOOSE_HIGHEST_OR_LOWEST) {
    myOutputValue = chooseHighestModeOrLowestMode();
    return myOutputValue;
  }

  // Early return for gameMode = "choose number of dice"
  if (gameMode == GAME_MODE_CHOOSE_NUMBER_OF_DICE) {
    myOutputValue = chooseNumberOfDice();
    return myOutputValue;
  }

  if (gameMode == GAME_MODE_PLAYER_ONE_ROLL) {
    myOutputValue = playerOneRoll();
  } else if (gameMode == GAME_MODE_PLAYER_ONE_CHOOSE) {
    myOutputValue = playerOneChoose();
  } else if (gameMode == GAME_MODE_PLAYER_TWO_ROLL) {
    myOutputValue = playerTwoRoll();
  } else if (gameMode == GAME_MODE_PLAYER_TWO_CHOOSE) {
    myOutputValue = playerTwoChoose();
  } else {
    myOutputValue = `SOMETHING WENT WRONG!`;
  }

  return myOutputValue;
};
