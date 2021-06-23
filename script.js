var playerOneRoll = [];
var playerTwoRoll = [];
var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneChoice;
var playerTwoChoice;
var gameModes = [
  "normal-highest",
  "normal-lowest",
  "auto-highest",
  "auto-lowest",
];
var currentGameMode = "game start";
var currentPlayer = "Player One";
var numDice = 2; //number of dice defaults at 2 in case player did not choose any, will change on game modes
var winner = "";
//assign who is playing
var playerOneIsPlaying = true;
var playerTwoIsPlaying = false;
var compareScores = false;
var main = function (input) {
  if (currentGameMode == "game start") {
    currentGameMode = "choose number of dice";
    console.log(currentGameMode);
    return `How many dice you want to play?`;
  }

  if (currentGameMode == "choose number of dice") {
    numDice = input; // variable number of dice
    currentGameMode = "choose game mode";
    return "Please choose Game Modes: <br>normal-highest<br> normal-lowest <br>auto-highest <br>auto-lowest";
  }
  if (currentGameMode == "choose game mode") {
    //Loops thru the gameModes and output the instruction for the chosen game mode
    var counter = 0;
    while (counter < gameModes.length) {
      if (input == gameModes[counter]) {
        currentGameMode = input;
        return gameModeInstruction(currentGameMode, numDice);
      }
      counter = counter + 1;
    }
  }
  //for normal game mode
  if (
    currentGameMode == "normal-highest" ||
    currentGameMode == "normal-lowest"
  ) {
    if (playerOneIsPlaying == true) {
      diceRoll(2, playerOneRoll);
      console.log(playerOneRoll);
      currentPlayer = "Player One";
      playerOneIsPlaying = false;
      playerTwoIsPlaying = true;
      return outputMessage(playerOneRoll, currentPlayer);
    } else if (playerTwoIsPlaying == true) {
      playerOneChoice = chooseInOptions(playerOneRoll, input);
      console.log(playerOneChoice);
      diceRoll(2, playerTwoRoll);
      currentPlayer = "Player Two";
      compareNumbers = true;
      playerTwoIsPlaying = false;
      return outputMessage(playerTwoRoll, currentPlayer);
    }
    if (compareNumbers == true) {
      playerTwoChoice = chooseInOptions(playerTwoRoll, input);
      compareNumbers = false;
      console.log(playerTwoChoice);
      console.log(playerOneChoice);
      //compare the numbers based on chosen higher or lower
      if (currentGameMode == "normal-highest") {
        if (playerOneChoice > playerTwoChoice) {
          playerOneScore = playerOneScore + 1;
          winner = "Player One";
        }
        if (playerOneChoice < playerTwoChoice) {
          playerTwoScore = playerTwoScore + 1;
          winner = "Player Two";
        }
      }
      // if players chose lowest
      if (currentGameMode == "normal-lowest") {
        if (playerOneChoice < playerTwoChoice) {
          playerOneScore = playerOneScore + 1;
          winner = "Player One";
        }
        if (playerOneChoice > playerTwoChoice) {
          playerTwoScore = playerTwoScore + 1;
          winner = "Player Two";
        }
      }
      //this resets all game values except scores
      playerOneIsPlaying = true;
      playerOneRoll = [];
      playerTwoRoll = [];
      return scoreBoard(
        playerOneChoice,
        playerTwoChoice,
        winner,
        playerOneScore,
        playerTwoScore
      );
    }
  }
  //auto arranges the player rolls to highest possible number and compare
  if (currentGameMode == "auto-highest") {
    if (playerOneIsPlaying == true) {
      diceRoll(numDice, playerOneRoll);
      console.log(playerOneRoll);
      var arrangedArrayOne = autoArrangeHighest(playerOneRoll);
      playerOneChoice = convertArrayToNumbers(arrangedArrayOne);
      playerOneIsPlaying = false;
      playerTwoIsPlaying = true;
      return `Player One, the highest possible number is: ${playerOneChoice}`;
    }
    if (playerTwoIsPlaying == true) {
      diceRoll(numDice, playerTwoRoll);
      var arrangedArrayTwo = autoArrangeHighest(playerTwoRoll);
      playerTwoChoice = convertArrayToNumbers(arrangedArrayTwo);
      compareNumbers = true;
      playerTwoIsPlaying = false;
      return `Player Two, the highest possible number is: ${playerTwoChoice}`;
    }
    if (compareNumbers == true) {
      if (playerOneChoice > playerTwoChoice) {
        playerOneScore = playerOneScore + 1;
        winner = "Player One";
      }
      if (playerOneChoice < playerTwoChoice) {
        playerTwoScore = playerTwoScore + 1;
        winner = "Player Two";
      }
      //resets the arrays and set Player One Playing
      compareNumbers = false;
      playerOneIsPlaying = true;
      playerOneRoll = [];
      playerTwoRoll = [];
      return scoreBoard(
        playerOneChoice,
        playerTwoChoice,
        winner,
        playerOneScore,
        playerTwoScore
      );
    }
  }
  if (currentGameMode == "auto-lowest") {
    if (playerOneIsPlaying == true) {
      diceRoll(numDice, playerOneRoll);
      console.log(playerOneRoll);
      var arrangedArrayOne = autoArrangeLowest(playerOneRoll);
      playerOneChoice = convertArrayToNumbers(arrangedArrayOne);
      playerOneIsPlaying = false;
      playerTwoIsPlaying = true;
      return `Player One, the lowest possible number is: ${playerOneChoice}`;
    }
    if (playerTwoIsPlaying == true) {
      diceRoll(numDice, playerTwoRoll);
      var arrangedArrayTwo = autoArrangeLowest(playerTwoRoll);
      playerTwoChoice = convertArrayToNumbers(arrangedArrayTwo);
      compareNumbers = true;
      playerTwoIsPlaying = false;
      return `Player Two, the lowest possible number is: ${playerTwoChoice}`;
    }
    if (compareNumbers == true) {
      if (playerOneChoice < playerTwoChoice) {
        playerOneScore = playerOneScore + 1;
        winner = "Player One";
      }
      if (playerOneChoice > playerTwoChoice) {
        playerTwoScore = playerTwoScore + 1;
        winner = "Player Two";
      }
      //resets the arrays and set Player One Playing
      compareNumbers = false;
      playerOneIsPlaying = true;
      playerOneRoll = [];
      playerTwoRoll = [];
      return scoreBoard(
        playerOneChoice,
        playerTwoChoice,
        winner,
        playerOneScore,
        playerTwoScore
      );
    }
  }
  return "Please type valid input";
};
//FUNCTIONS
var randomNumber = function () {
  var randomInt = Math.floor(Math.random() * 6);
  var randomNumber = randomInt + 1;
  return randomNumber;
};
//Outputs the game instruction based on chose game modes
var gameModeInstruction = function (gameMode, numDice) {
  if (gameMode == "normal-highest") {
    return "You choose NORMAL-HIGHEST MODE<br> You will play with only 2 Dice and you will choose the Arrangement. The highest number wins<br> Player One, You First, Please click submit";
  }
  if (gameMode == "normal-lowest") {
    return "You choose NORMAL-LOWEST MODE<br> You will play with only 2 Dice and you will choose the Arrangement, lowest number wins<br> Player One, You First, Please click submit";
  }
  if (gameMode == "auto-highest") {
    return `You choose AUTO-HIGHEST <br> You will play with only ${numDice} Dice <br> Computer Will auto-generate the HIGHEST POSSIBLE NUMBER<br> Player One, You First, Please click submit`;
  }
  if (gameMode == "auto-lowest") {
    return `You choose AUTO-LOWEST <br> You will play with only ${numDice} Dice <br> Computer Will auto-generate the LOWEST POSSIBLE NUMBER<br> Player One, You First, Please click submit`;
  }
};
//Produce a random diceRoll based on
var diceRoll = function (numDice, playerRolls) {
  var counter = 0;
  while (counter < numDice) {
    var diceRoll = randomNumber();
    playerRolls.push(diceRoll);
    counter = counter + 1;
  }
};
//This function arranges the array from highest to lowest and return the array.
var autoArrangeHighest = function (playerRolls) {
  console.log("AutoArrangeHighest Function is running...");
  console.log(playerRolls);
  var counter = 0;
  var higherNumber = 0;
  var arrangedArray = [];
  while (counter < playerRolls.length) {
    console.log(playerRolls);
    var innerCounter = 0;
    var higherNumber = 0;
    while (innerCounter < playerRolls.length) {
      console.log("Your code is running here");
      //Looping thru the Player Rolls array to find higher number
      if (higherNumber < playerRolls[innerCounter]) {
        higherNumber = playerRolls[innerCounter];
        higherNumberIndex = playerRolls.indexOf(higherNumber);
      }
      innerCounter = innerCounter + 1;
      //This part push the highernumber and remove it from the array
    }
    arrangedArray.push(higherNumber);
    playerRolls.splice(higherNumberIndex, 1);
  }
  //returns the arranged array
  return arrangedArray;
};

var autoArrangeLowest = function (playerRolls) {
  console.log("AutoLowest is running...");
  console.log(playerRolls);
  var counter = 0;
  var arrangedArray = [];
  while (counter < playerRolls.length) {
    console.log(playerRolls);
    var innerCounter = 0;
    var lowerNumber = playerRolls[0];
    while (innerCounter < playerRolls.length) {
      console.log("Enters autoArrange inner loop");
      //Looping thru the Player Rolls array to find higher number
      if (lowerNumber >= playerRolls[innerCounter]) {
        lowerNumber = playerRolls[innerCounter];
        lowerNumberIndex = playerRolls.indexOf(lowerNumber);
      }
      innerCounter = innerCounter + 1;
      //push the highernumber and remove it from the array
    }
    arrangedArray.push(lowerNumber);
    playerRolls.splice(lowerNumberIndex, 1);
  }
  //returns the arranged array
  return arrangedArray;
};
var convertArrayToNumbers = function (arrangedArray) {
  var index = 0;
  var playerNumbers = "";
  while (index < arrangedArray.length) {
    var number = arrangedArray[index];
    playerNumbers = playerNumbers + number;
    index = index + 1;
  }
  console.log(playerNumbers);
  return Number(playerNumbers);
};

var chooseInOptions = function (playerRolls, choiceLetter) {
  if (choiceLetter == "A") {
    return convertArrayToNumbers(playerRolls);
  } else if (choiceLetter == "B") {
    return Number("" + playerRolls[1] + playerRolls[0]);
  }
};

var outputMessage = function (playerRolls, currentPlayer) {
  var optionA = `${playerRolls[0]}${playerRolls[1]}`;
  var optionB = `${playerRolls[1]}${playerRolls[0]}`;
  var message = `Hi ${currentPlayer}!<br> You got the following rolls: <br> Dice 1: ${playerRolls[0]}<br> Dice 2: ${playerRolls[1]}<br> <br>Type 'A' for ${optionA}<br>Type 'B' for ${optionB}`;
  return message;
};
//score board, outputs game status, player rolls , and current winner and wins standing
var scoreBoard = function (
  playerOneChoice,
  playerTwoChoice,
  winner,
  playerOneScore,
  playerTwoScore
) {
  return `Player One Drawn : ${playerOneChoice}<br>Player Two Drawn: ${playerTwoChoice}<br><br>Current Winner: ${winner}<br><br>Player One Wins: ${playerOneScore}<br>Player Two Wins: ${playerTwoScore}`;
};
