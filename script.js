// Note: To update transition: Players - Dice - High/Low - AutoFunction - Game Mode - Play.
// Note: To update input prompt onto index.html also.

// Creating Global Variables
var numPlayers;
var numDice;
var gameMode;
var lowHigh;
var autoChoose = true;
var globalScoreboard = [];
var currentFixtures;
var nextFixtures;

// Constant Variables
var KNOCKOUT = "KNOCKOUT";
var ARCADE = "ARCADE";
var LOW = "LOW";
var HIGH = "HIGH";
var PLAYERS = "PLAYERS";
var DICE = "DICE";
var MODE = "MODE";
var LOW_HIGH = "LOW_HIGH";
var AUTO_CHOOSE = "AUTO_CHOOSE";
var ROLL = "ROLL";
var ORDER_SELECTION = "ORDER SELECTION";
var ROLL_PLAYER_ONE = "ROLL_PLAYER_ONE";
var ORDER_SELECTION_PLAYER_ONE = "ORDER_SELECTION_PLAYER_ONE";
var ROLL_PLAYER_TWO = "ROLL_PLAYER_TWO";
var ORDER_SELECTION_PLAYER_TWO = "ORDER_SELECTION_PLAYER_TWO";

// Creating Game State Variables
var gameState = PLAYERS;
var currentRolls = [];
var currentValue;
var currentPlayer = 1;
var playerOne;
var playerTwo;
var knockoutScore = [0, 0];

// Helper Function to Set Number of Players
var setNumPlayers = function (number) {
  if (Number.isNaN(Number(number))) {
    var outputValue = "Invalid Entry. Please key in an integer.";
    return outputValue;
  } else {
    number = Number(number);
    numPlayers = number;
    var outputValue = `You have selected to play with ${numPlayers} players.`;
    gameState = DICE;
    return outputValue;
  }
};

// Helper Function for Number of Dice
var setNumDice = function (number) {
  if (Number.isNaN(Number(number))) {
    var outputValue = "Invalid Entry. Please key in an integer.";
    return outputValue;
  } else {
    number = Number(number);
    numDice = number;
    var outputValue = `You have selected to play with ${numDice} dice.`;
    gameState = LOW_HIGH;
    return outputValue;
  }
};

// Helper Function for Single Dice Roll
var singleDiceRoll = function () {
  var outputValue = Math.floor(Math.random() * 6) + 1;
  console.log("Dice Roll:" + outputValue);
  return outputValue;
};

// Helper Function for Multiple Dice Roll. Returns an Array of Dice Rolls.
var multipleDiceRoll = function (number) {
  if (Number.isNaN(Number(number))) {
    var outputValue = "Invalid Entry. Please key in an integer.";
    return outputValue;
  } else {
    var outputArray = [];
    for (var counter = 0; counter < number; counter += 1) {
      outputArray.push(singleDiceRoll());
    }
    console.log("Dice Array:" + outputArray);
    return outputArray;
  }
};

// Helper Function to Select Game Mode
var setGameMode = function (input) {
  if (input == KNOCKOUT || input == ARCADE) {
    gameMode = input;
    outputValue = `You have selected the ${gameMode} game mode. <br>`;
    if (input == ARCADE) {
      generateScoreboard();
      gameState = ROLL;
      outputValue += `Player ${currentPlayer} will roll first.`;
    } else {
      generateFixtures();
      gameState = ROLL_PLAYER_ONE;
      outputValue += `The first fixture is Player ${playerOne} VS Player ${playerTwo}.<br>Player ${playerOne} will roll first.`;
    }
    return outputValue;
  } else {
    outputValue = `Invalid entry. Please input either ${KNOCKOUT} or ${ARCADE}.`;
    return outputValue;
  }
};

// Helper Function to Select Low/High
var setLowHigh = function (input) {
  if (input == LOW || input == HIGH) {
    lowHigh = input;
    outputValue = `You have selected that the ${lowHigh}EST roll wins.`;
    gameState = AUTO_CHOOSE;
    return outputValue;
  } else {
    outputValue = `Invalid entry. Please input either ${LOW} or ${HIGH}.`;
    return outputValue;
  }
};

// Helper Function to Combine Integers in Array
var combineArray = function (array) {
  var arrayLength = array.length;
  var outputValue = 0;
  for (var counter = 0; counter < arrayLength; counter += 1) {
    outputValue = 10 * outputValue + array[counter];
  }
  return outputValue;
};

// Helper Function to Automatically Arrange Array.
var autoChooseFunction = function (array, lowHigh) {
  if (lowHigh == LOW) {
    var outputArray = array.sort(function (a, b) {
      return a - b;
    });
    var outputNumber = combineArray(outputArray);
    return outputNumber;
  } else {
    var outputArray = array.sort(function (a, b) {
      return b - a;
    });
    var outputNumber = combineArray(outputArray);
    return outputNumber;
  }
};

//Helper Function to Activate Auto Choose Function
var setAutoChoose = function (input) {
  if (input == "Yes") {
    autoChoose = true;
    var outputValue = `You have selected to use the auto choose function`;
    gameState = MODE;
  } else if (input == "No") {
    autoChoose = false;
    var outputValue = `You have selected to not use the auto choose function`;
    gameState = MODE;
  } else {
    var outputValue = `Invalid input. Please input either "Yes" or "No" to the use of an automatic dice order selector.`;
  }
  return outputValue;
};

// Helper Function to Generate Overall Scoreboard with Each Player Representing an Entry in List
var generateScoreboard = function () {
  globalScoreboard = Array(numPlayers).fill(0);
  console.log(globalScoreboard);
};

// Helper Function to Generate Fixtures into Global Variables currentFixtures and nextFixtures
var generateFixtures = function () {
  var playerList = Array(numPlayers)
    .fill()
    .map((_, i) => i + 1);
  var randomizedFixture = playerList.sort(() => Math.random() - 0.5);
  // Check how many players get a pass to the next round
  var numberOfPasses = 2 ** Math.ceil(Math.log2(numPlayers)) - numPlayers;
  nextFixtures = randomizedFixture.slice(0, numberOfPasses);
  currentFixtures = randomizedFixture.slice(numberOfPasses, numPlayers);
  playerOne = currentFixtures[currentFixtures.length - 1];
  playerTwo = currentFixtures[currentFixtures.length - 2];
  console.log("Current Fixtures:" + currentFixtures);
  console.log("Next Fixtures:" + nextFixtures);
};

// Helper Function to Update Next Player in Arcade Mode
var updatePlayer = function () {
  if (currentPlayer < numPlayers) {
    currentPlayer += 1;
  } else {
    currentPlayer = 1;
  }
};

// Helper Function to Update Current Value
var updateCurrentValue = function (order = false) {
  if (order == false) {
    currentValue = autoChooseFunction(currentRolls, lowHigh);
  } else {
    currentValue = 0;
    order = order.split("").map(Number);
    console.log("Order:" + order);
    for (var counter = 0; counter < order.length; counter += 1) {
      console.log("Current Addition:" + currentRolls[order[counter]]);
      currentValue = currentValue * 10 + currentRolls[order[counter]];
      console.log("Current Value:" + currentValue);
    }
  }
};

// Helper Function and Update ScoreBoard
var updateScoreboard = function (order = false) {
  globalScoreboard[currentPlayer - 1] += currentValue;
  var currentLeaderBoard = Array(numPlayers)
    .fill()
    .map((_, i) => i + 1);
  if (lowHigh == HIGH) {
    var currentLeaderBoard = currentLeaderBoard.sort(function (a, b) {
      return globalScoreboard[b - 1] - globalScoreboard[a - 1];
    });
  } else if (lowHigh == LOW) {
    var currentLeaderBoard = currentLeaderBoard.sort(function (a, b) {
      return globalScoreboard[a - 1] - globalScoreboard[b - 1];
    });
  }
  console.log(currentLeaderBoard);
  var leaderboardString = "The current leaderboard is as follows:<br>";
  for (var counter = 0; counter < currentLeaderBoard.length; counter += 1) {
    leaderboardString += `Player ${currentLeaderBoard[counter]}: 
    ${globalScoreboard[currentLeaderBoard[counter] - 1]}<br>`;
  }
  return leaderboardString;
};

// Function for Arcade Mode
var playArcade = function (input) {
  if (gameState == ROLL) {
    currentRolls = multipleDiceRoll(numDice);
    var outputValue = `Player ${currentPlayer} has rolled the following dice rolls: <br> ${currentRolls}. <br><br> `;
    if (autoChoose == true) {
      updateCurrentValue();
      var leaderBoard = updateScoreboard();
      outputValue += `As you have selected the auto roll functionality, Player ${currentPlayer}'s score is ${currentValue}.<br>`;
      updatePlayer();
      outputValue += `Player ${currentPlayer} is next.<br><br>${leaderBoard}`;
      return outputValue;
    } else {
      outputValue += `As you have not selected the auto roll functionality, Player ${currentPlayer} may indicate the order of the dice. <br> For example, if you rolled [1,5,4,3], please input "1230" to indicate the dice order selection of 5431.`;
      gameState = ORDER_SELECTION;
      return outputValue;
    }
  } else if (gameState == ORDER_SELECTION) {
    updateCurrentValue(input);
    var leaderBoard = updateScoreboard();
    var outputValue = `Based on Player ${currentPlayer}'s order selection of ${input}, Player ${currentPlayer}'s score is ${currentValue}.<br>`;
    updatePlayer();
    outputValue += `Player ${currentPlayer} is next.<br><br>${leaderBoard}`;
    gameState = ROLL;
    return outputValue;
  }
};

// Helper Function to Decide on a Winner
var decideWinner = function () {
  if (lowHigh == LOW) {
    if (knockoutScore[0] < knockoutScore[1]) {
      return playerOne;
    } else if (knockoutScore[0] > knockoutScore[1]) {
      return playerTwo;
    } else {
      return "Draw";
    }
  } else if (lowHigh == HIGH) {
    if (knockoutScore[0] < knockoutScore[1]) {
      return playerTwo;
    } else if (knockoutScore[0] > knockoutScore[1]) {
      return playerOne;
    } else {
      return "Draw";
    }
  }
};

// Helper Function to Update Fixtures Once a Fixture is Decided
var updateFixtures = function () {
  // Place winner of knockout round in next fixture
  if (knockoutScore[0] == knockoutScore[1]) {
    // Do Nothing and Do Not Update as Not a Draw
    var outputValue = `As it was a draw, Player ${playerOne} and Player ${playerTwo} will have a rematch.`;
    return outputValue;
  } else {
    var outputValue = `Player ${playerOne} scored ${knockoutScore[0]}, while Player ${playerTwo} scored ${knockoutScore[1]}. `;
    var winningPlayer = decideWinner();
    // Remove fixtures that were played
    currentFixtures.pop();
    currentFixtures.pop();
    // Add winner to next fixtures
    nextFixtures.push(winningPlayer);
    // Check if current fixtures have completed. If yes, to update fixture list with next round.
    if (currentFixtures.length == 0) {
      currentFixtures = nextFixtures;
      nextFixtures = [];
      // Check if we have a winner
      if (currentFixtures.length == 1) {
        outputValue += `<br><br>🎉🎆🎊Congratulaions, the winner of this knockout tournament was Player ${winningPlayer}.🎉🎆🎊<br> Please refresh the page to start a new game.`;
        return outputValue;
      }
    }
    // Update current players in next knockout
    playerOne = currentFixtures[currentFixtures.length - 1];
    playerTwo = currentFixtures[currentFixtures.length - 2];

    outputValue += `Thus, the winner of this round was Player ${winningPlayer}.<br>The next fixture will see Player ${playerOne} take on Player ${playerTwo}. Player ${playerOne} will go first. `;
    return outputValue;
  }
};

// Function for Knockout Mode
var playKnockout = function (input) {
  if (gameState == ROLL_PLAYER_ONE) {
    currentRolls = multipleDiceRoll(numDice);
    var outputValue = `Player ${playerOne} has rolled the following dice rolls: <br> ${currentRolls}. <br><br> `;
    if (autoChoose == true) {
      updateCurrentValue();
      knockoutScore[0] = currentValue;
      outputValue += `As you have selected the auto roll functionality, Player ${playerOne}'s score is ${currentValue}.<br>
      Player ${playerTwo} is next.`;
      gameState = ROLL_PLAYER_TWO;
      return outputValue;
    } else {
      outputValue += `As you have not selected the auto roll functionality, Player ${playerOne} may indicate the order of the dice. <br> For example, if you rolled [1,5,4,3], please input "1230" to indicate the dice order selection of 5431.`;
      gameState = ORDER_SELECTION_PLAYER_ONE;
      return outputValue;
    }
  } else if (gameState == ORDER_SELECTION_PLAYER_ONE) {
    updateCurrentValue(input);
    knockoutScore[0] = currentValue;
    var outputValue = `Based on Player ${playerOne}'s order selection of ${input}, Player ${playerOne}'s score is ${currentValue}.<br>
    Player ${playerTwo} is next.`;
    gameState = ROLL_PLAYER_TWO;
    return outputValue;
  } else if (gameState == ROLL_PLAYER_TWO) {
    currentRolls = multipleDiceRoll(numDice);
    var outputValue = `Player ${playerTwo} has rolled the following dice rolls: <br> ${currentRolls}. <br><br> `;
    if (autoChoose == true) {
      updateCurrentValue();
      knockoutScore[1] = currentValue;
      outputValue += `As you have selected the auto roll functionality, Player ${playerTwo}'s score is ${currentValue}.<br><br>`;
      var updatedFixtures = updateFixtures();
      outputValue += updatedFixtures;
      gameState = ROLL_PLAYER_ONE;
      return outputValue;
    } else {
      outputValue += `As you have not selected the auto roll functionality, Player ${playerTwo} may indicate the order of the dice. <br> For example, if you rolled [1,5,4,3], please input "1230" to indicate the dice order selection of 5431.`;
      gameState = ORDER_SELECTION_PLAYER_TWO;
      return outputValue;
    }
  } else if (gameState == ORDER_SELECTION_PLAYER_TWO) {
    updateCurrentValue(input);
    knockoutScore[1] = currentValue;
    var outputValue = `Based on Player ${playerTwo}'s order selection of ${input}, Player ${playerTwo}'s score is ${currentValue}<br><br>`;
    var updatedFixtures = updateFixtures();
    outputValue += updatedFixtures;
    gameState = ROLL_PLAYER_ONE;
    return outputValue;
  }
};

// Main Function
var main = function (input) {
  if (gameState == PLAYERS) {
    return setNumPlayers(input);
  } else if (gameState == DICE) {
    return setNumDice(input);
  } else if (gameState == LOW_HIGH) {
    return setLowHigh(input);
  } else if (gameState == AUTO_CHOOSE) {
    return setAutoChoose(input);
  } else if (gameState == MODE) {
    return setGameMode(input);
  } else if (gameState == ROLL || gameState == ORDER_SELECTION) {
    return playArcade(input);
  } else if (
    gameState == ROLL_PLAYER_ONE ||
    gameState == ORDER_SELECTION_PLAYER_ONE ||
    gameState == ROLL_PLAYER_TWO ||
    gameState == ORDER_SELECTION_PLAYER_TWO
  ) {
    return playKnockout(input);
  }
};

// Update Input Title Text
var textUpdate = function () {
  if (gameState == PLAYERS) {
    return `Input Number of Players:`;
  } else if (gameState == DICE) {
    return `Input Number of Dice:`;
  } else if (gameState == LOW_HIGH) {
    return `Input "LOW" or "HIGH" Number Wins:`;
  } else if (gameState == AUTO_CHOOSE) {
    return `Do you want to use the auto choose function? <br> Input "Yes" or "No":`;
  } else if (gameState == MODE) {
    return `Select the game mode to play. <br> Input "ARCADE" or "KNOCKOUT":`;
  } else if (
    gameState == ROLL ||
    gameState == ROLL_PLAYER_ONE ||
    gameState == ROLL_PLAYER_TWO
  ) {
    return `Click "Submit" button to roll your dice.`;
  } else if (
    gameState == ORDER_SELECTION ||
    gameState == ORDER_SELECTION_PLAYER_ONE ||
    gameState == ORDER_SELECTION_PLAYER_TWO
  ) {
    return `Indicate Order of Dice:`;
  }
};
