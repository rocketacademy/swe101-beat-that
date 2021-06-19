// Project 2: Beat That!
// Have not implemented variable number of players and knockout mode.

// ---players----
var PLAYER1 = 1;
var PLAYER2 = 2;
var currentPlayer = PLAYER1;
var numDice = 0;
var Dice1 = "";
var Dice2 = "";
var player1Number = "";
var player2Number = "";
var bestNumber = 0;
var currentArray = [];
var player1DiceRolls = [];
var player2DiceRolls = [];
var currPlayerNum = 0;
var player1Score = 0;
var player2Score = 0;
var hasGameCompleted = false;
var winner = "";

// ---stages for normal mode---
var INPUT_NUM_PLAYERS_STAGE = "PLAYER NUMBER";
var INPUT_NUM_DICE_STAGE = "DICE NUMBER";
var ROLL_DICE_STAGE = "ROLL DICE";
var GET_NUMBER_STAGE = "GET NUMBER";
var CHOOSE_ORDER_STAGE = "CHOOSE ORDER";
var gameStage = INPUT_NUM_DICE_STAGE;

// ---game modes---
var NORMAL_MODE = "Normal";
var LOWEST_NUMBER_MODE = "Lowest Number";
var gameMode = NORMAL_MODE;
var stdGameInstructions = `<br> Input number of dice (2 or more) you would like to play with. <br><br> For 2 dice, you can choose the order of dice. For 2 or more dice, the most ideal number will be auto-generated for you.`;

// The game always starts with Player 1 in normal mode.

var main = function (input) {
  return basicGame(input);
};

// Basic game logic
var basicGame = function (input) {
  var myOutputValue = "";
  hasGameCompleted = false;

  if (input == "lowest") {
    gameMode = LOWEST_NUMBER_MODE;
    gameStage = INPUT_NUM_DICE_STAGE;
    return `The player with the lowest number now wins! <br> ${stdGameInstructions}`;
  }

  if (input == "normal") {
    gameMode = NORMAL_MODE;
    gameStage = INPUT_NUM_DICE_STAGE;
    return `The normal Beat That dice game has been selected! <br> ${stdGameInstructions}`;
  }

  // User has to input number of dice first
  if (gameStage == INPUT_NUM_DICE_STAGE) {
    // Resets arrays so they do not contain previous rolls
    resetArray();
    numDice = input;
    var numDiceMessage = `You have chosen to roll ${numDice} dice. <br> Click submit to see your dice rolls`;

    // if more than 2 dice game goes to roll dice stage with auto generated number
    gameStage = ROLL_DICE_STAGE;

    //If 2 dice, user gets to choose order
    if (numDice == "2") {
      gameStage = CHOOSE_ORDER_STAGE;
      numDiceMessage = numDiceMessage + ` and choose the order of the dice`;
    }

    // Input validation
    if (!(numDice > 1) || Number.isNaN(Number(input)) == true) {
      gameStage = INPUT_NUM_DICE_STAGE;
      return `Please input a number of dice that is more than 1.`;
    }

    return `${numDiceMessage}.`;
  } else if (gameStage == CHOOSE_ORDER_STAGE) {
    gameStage = GET_NUMBER_STAGE;
    return generate2DiceRolls();
  } else if (gameStage == ROLL_DICE_STAGE) {
    gameStage = GET_NUMBER_STAGE;
    return generateDiceRolls(numDice);
  } else if (gameStage == GET_NUMBER_STAGE) {
    generatePlayerCombinedNumber(input);
    myOutputValue = generateResults(currentPlayer);
    gameStage = ROLL_DICE_STAGE;
    if (numDice == "2") {
      gameStage = CHOOSE_ORDER_STAGE;
    }
    currentPlayer = generateNextPlayer(currentPlayer);
  }

  // Restarts game by setting boolean to true
  if (hasGameCompleted == true) {
    gameStage = INPUT_NUM_DICE_STAGE;
  }

  return myOutputValue;
};

// For 2 dice
var generate2DiceRolls = function () {
  if (currentPlayer == PLAYER1) {
    currentArray = player1DiceRolls;
  } else {
    currentArray = player2DiceRolls;
  }
  Dice1 = rollDice();
  Dice2 = rollDice();
  currentArray.push(Dice1);
  currentArray.push(Dice2);
  return `Player ${currentPlayer}: You have rolled ${Dice1} and ${Dice2}. <br><br> Please choose the order of the dice: "1" for ${Dice1}${Dice2} and "2" for ${Dice2}${Dice1}. <br><br> Current Game Mode: ${gameMode}`;
};

// For variable number of dice
var generateDiceRolls = function (numDice) {
  if (currentPlayer == PLAYER1) {
    currentArray = player1DiceRolls;
  } else {
    currentArray = player2DiceRolls;
  }
  var counter = 0;
  while (counter < numDice) {
    var diceRoll = rollDice();
    currentArray.push(diceRoll);
    counter = counter + 1;
  }
  console.log(currentPlayer);
  return `Player ${currentPlayer}: You have rolled ${currentArray} <br><br>`;
};

// Output number for player dependent on choice
var generatePlayerCombinedNumber = function (input) {
  var chosenOrder = Number(input);
  // Concatenate dice rolls based on user choice
  console.log(chosenOrder);
  if (chosenOrder == 1) {
    bestNumber = Number(`${Dice1}${Dice2}`);
  } else {
    bestNumber = Number(`${Dice2}${Dice1}`);
  }
  console.log(bestNumber);
};

// Don't really know what is happening here googled a way to autogenerate the best number
// The while loop sorts the elements by descending/ascending order and then the join function concatenates to give the largest number?
// Reference link: https://www.youtube.com/watch?v=aNwQmrQoj7o
var autoGenerateNumber = function (gameMode, currentArray) {
  var temp;
  var bestNumber;
  console.log(currentArray);
  if (gameMode == NORMAL_MODE) {
    var outerCounter = 0;
    while (outerCounter < currentArray.length) {
      var innerCounter = 0;
      while (innerCounter < currentArray.length) {
        if (currentArray[outerCounter] > currentArray[innerCounter]) {
          temp = currentArray[outerCounter];
          currentArray[outerCounter] = currentArray[innerCounter];
          currentArray[innerCounter] = temp;
        }
        innerCounter += 1;
      }
      outerCounter += 1;
    }
    bestNumber = currentArray.join("");
    console.log(bestNumber);
    return bestNumber;
  }

  if (gameMode == LOWEST_NUMBER_MODE) {
    var outerCounter = 0;
    while (outerCounter < currentArray.length) {
      var innerCounter = 0;
      while (innerCounter < currentArray.length) {
        if (currentArray[outerCounter] < currentArray[innerCounter]) {
          temp = currentArray[outerCounter];
          currentArray[outerCounter] = currentArray[innerCounter];
          currentArray[innerCounter] = temp;
        }
        innerCounter += 1;
      }
      outerCounter += 1;
    }
    bestNumber = currentArray.join("");
    console.log(bestNumber);
    return bestNumber;
  }
};
// Higher number wins
var generateWinner = function (player1Number, player2Number) {
  var myOutputValue = "";
  var player1Wins = `Player ${PLAYER1} wins!`;
  var player2Wins = `Player ${PLAYER2} wins!`;
  if (player1Number > player2Number) {
    if (gameMode == NORMAL_MODE) {
      myOutputValue = player1Wins;
      console.log(myOutputValue);
    } else if (gameMode == LOWEST_NUMBER_MODE) {
      myOutputValue = player2Wins;
    }
  } else {
    if (gameMode == NORMAL_MODE) {
      myOutputValue = player2Wins;
    } else if (gameMode == LOWEST_NUMBER_MODE) {
      myOutputValue = player1Wins;
    }
  }

  if (player1Number == player2Number) {
    myOutputValue = `You draw! Try again!`;
  }

  hasGameCompleted = true;
  return myOutputValue;
};

// Lists the 2 players and their scores in decreasing order; assumes winner according to normal rules
var generateLeaderboard = function (player1Score, player2Score) {
  if (player1Score >= player2Score) {
    return `LEADERBOARD <br> Player 1: ${player1Score} <br> 
    Player 2: ${player2Score}`;
  } else {
    return `LEADERBOARD <br> Player 2: ${player2Score} <br> 
    Player 1: ${player1Score}`;
  }
};

// Ouput results
var generateResults = function (currentPlayer) {
  // For 2 dice, number is chosen by user
  var chosenOutputMessage = `Player ${currentPlayer}, your chosen number is ${bestNumber}.`;

  if (numDice > 2) {
    // For 3 or more dice, number is auto-generated
    bestNumber = autoGenerateNumber(gameMode, currentArray);
    var chosenOutputMessage = `Player ${currentPlayer}, your auto-generated number is ${bestNumber}.`;
  }

  if (currentPlayer == PLAYER1) {
    player1Number = bestNumber;
    player1Score += Number(bestNumber);
    myOutputValue = `${chosenOutputMessage} <br><br> It is now Player 2's turn. Click submit to see Player 2's dice rolls.`;
  } else if (currentPlayer == PLAYER2) {
    player2Number = bestNumber;
    player2Score += Number(bestNumber);
    winner = generateWinner(player1Number, player2Number);
    leader = generateLeaderboard(player1Score, player2Score);
    myOutputValue = `${chosenOutputMessage} <br> ${winner} <br> <br> ${leader} <br><br> Current Game Mode: ${gameMode} <br><br> Input number of dice to play again or `;

    if (gameMode == NORMAL_MODE) {
      myOutputValue =
        myOutputValue + `"lowest" to play lowest combined number mode.`;
    } else myOutputValue = myOutputValue + `"normal" to play normal mode.`;
  }

  return myOutputValue;
};

var generateNextPlayer = function (currentPlayer) {
  var nextPlayer = (currentPlayer % 2) + 1;
  return nextPlayer;
};

var resetArray = function () {
  currentArray = [];
  player1DiceRolls = [];
  player2DiceRolls = [];
};

// Simple dice function
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};
