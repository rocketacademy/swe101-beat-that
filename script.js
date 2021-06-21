// Track number of players in the game
var numPlayers = 0;

// Track number of dice to use
var numDice = 0;

// Track game version
var gameVersion = "";

// Track game mode - allows the game to move into the different player stages eg. rolling dice, getting sequence etc
var gameMode = 1;

// Variable to store a player's dice rolls
var playerRoll = [];

// Variable to store all player's combined numbers
var playerCombinedNums = [];

// Variable to track running scores of each player.
var runningScore = [];

// Function to get user inout for game version.
var getVersion = function (input) {
  gameVersion = input;
  return `In this mode, the ${gameVersion} number will win the game. <br><br> Please input the number of players.`;
};

// Function to generate dice roll
var diceRoll = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//Request for player input to get number of players in game.
var getPlayers = function (input) {
  numPlayers = input;
  return `Welcome! There are ${numPlayers} players in this game. <br><br> Please select how many dice you want to play with. `;
};

// Get player input to number of dice used in game.
var getNumDice = function (input) {
  numDice = input;
  return `You will be playing with ${numDice} dice in this game. <br><br> Player 1, please click "submit" to roll the dice.`;
};

// Get player to roll dice.
var getPlayerRoll = function () {
  var index = 0;
  var playerDiceRoll = [];
  while (index < numDice) {
    playerDiceRoll.push(diceRoll());
    index += 1;
  }
  return playerDiceRoll;
};

// Get player to select the sequence of the dice. Function takes in the sequence input, and the array of dice rolls.
var getSequence = function (input, diceArray) {
  var combinedNum = 0;
  var autoCombinedNum = 0;
  var indexArray = input.split("").map(Number);
  // This loop takes in the user input sequence and generate the combined number.
  for (var i = 0; i < indexArray.length; i += 1) {
    combinedNum = combinedNum * 10 + diceArray[indexArray[i]];
  }
  // This loop auto generates the highest/lowest number depending on the game version.
  var index = 0;
  var maxIndex = 0;
  var maxNum = 0;
  var tempArray = diceArray;
  while (autoCombinedNum.toString().length <= diceArray.length + 1) {
    if (gameVersion == "highest") {
      while (index < tempArray.length) {
        if (tempArray[index] > maxNum) {
          maxNum = tempArray[index];
          maxIndex = index;
          index += 1;
        } else {
          index += 1;
        }
      }
      autoCombinedNum = autoCombinedNum * 10 + maxNum;
      tempArray.splice(maxIndex, 1);
      maxNum = 0;
      index = 0;
    } else {
      maxNum = 7;
      while (index < tempArray.length) {
        if (tempArray[index] < maxNum) {
          maxNum = tempArray[index];
          maxIndex = index;
          index += 1;
        } else {
          index += 1;
        }
      }
      autoCombinedNum = autoCombinedNum * 10 + maxNum;
      tempArray.splice(maxIndex, 1);
      maxNum = 7;
      index = 0;
    }
  }

  return [combinedNum, autoCombinedNum];
};

// Compare the numbers of the players and declare the winning player. Function takes in the array of combined players numbers. Returns the highest number and the winning player.
var compareNumbers = function (input) {
  var maxNum = input[0];
  var maxIndex = 0;
  var index = 0;
  if (gameVersion == "highest") {
    while (index < input.length) {
      if (input[index] > maxNum) {
        maxNum = input[index];
        maxIndex = index;
        index += 1;
      } else {
        index += 1;
      }
    }
    playerCount = 0;
  } else {
    while (index < input.length) {
      if (input[index] < maxNum) {
        maxNum = input[index];
        maxIndex = index;
        index += 1;
      } else {
        index += 1;
      }
    }
    playerCount = 0;
  }
  return [maxNum, maxIndex + 1];
};

// Show leaderboard. Function takes in array of running scores.
var showLeaderboard = function (input) {
  var output = "";
  for (var i = 0; i < input.length; i += 1) {
    output += `Player ${i + 1}: ${input[i]} <br>`;
  }
  return output;
};

// Variable to initialise while loop. Left out of main fuction so it does not reset to 0 everytime "submit" is clicked.
var playerCount = 0;

var main = function (input) {
  if (gameVersion == "") {
    return getVersion(input);
  } else if (numPlayers == 0) {
    return getPlayers(input);
  } else if (numPlayers != 0 && numDice == 0) {
    return getNumDice(input);
  } else {
    while (playerCount < numPlayers) {
      if (gameMode == 1) {
        playerRoll = getPlayerRoll();
        gameMode = 2;
        return `Hello Player ${
          playerCount + 1
        }! <br> You have rolled ${playerRoll}. <br> Please select the sequeuce of your dice. <br> Please enter the index of the dice roll (use zero indexing).`;
      } else if (gameMode == 2) {
        gameMode = 1;
        var thisPlayerNum = getSequence(input, playerRoll);
        if (runningScore.length < playerCount + 1) {
          runningScore.push(thisPlayerNum[0]);
        } else {
          runningScore[playerCount] += thisPlayerNum[0];
        }
        playerCombinedNums.push(thisPlayerNum[0]);
        if (playerCount == numPlayers - 1) {
          var outputValue = `Player ${
            playerCount + 1
          } <br> You have formed the number ${
            thisPlayerNum[0]
          } <br> The auto generated ${gameVersion} number is ${
            thisPlayerNum[1]
          }. <br><br> Click "submit" to see the results`;
          playerCount += 1;
        } else {
          var outputValue = `Player ${
            playerCount + 1
          } <br> You have formed the number ${
            thisPlayerNum[0]
          } <br> The auto generated ${gameVersion} number is ${
            thisPlayerNum[1]
          }.  <br><br> Click "submit" for the next player to roll the dice.`;
          playerCount += 1;
        }
        return outputValue;
      }
    }
    var winningItems = compareNumbers(playerCombinedNums);
    // Assign empty array again to restart game.
    playerCombinedNums = [];
    return `Player ${winningItems[1]} won with the ${gameVersion} number of ${
      winningItems[0]
    }!<br><br> ========= LEADERBOARD ========= <br> ${showLeaderboard(
      runningScore
    )} <br><br> Click "submit" to play another round!`;
  }
};
