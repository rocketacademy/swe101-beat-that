// Constants
const CHOOSE_NUM_PLAYERS = "choose number of players"; // type of gameMode
const CHOOSE_WIN_CNDTN = "choose the win condition"; // type of gameMode
const CHOOSE_KNOCKOUT = "choose knockout mode"; // type of gameMode
const CHOOSE_NUM_DICE = "choose number of dice for round"; // type of gameMode
const HIGHEST = "highest"; // type of winCndtn
const LOWEST = "lowest"; // type of winCndtn
const ON = "on"; // type of koSetting
const OFF = "off"; // type of koSetting

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS; // Initialise game in this mode
var numPlayers;
var numDice;
var winCndtn; // Highest or lowest wins?
var koSetting; // Knockout Mode on or off?
var players = []; // Array of player objects that will be updated as the game progresses

// Generate a number between 1-6
var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var randomRoll = Math.floor(randomInteger) + 1;
  return randomRoll;
};

// First stage of game: Choose number of players
var stage1 = function (chosenNumber) {
  var resultMessage;
  // Input validation: need minimum 2 players to play. Limit number of players to 10 for performance reasons.
  if (!(Number(chosenNumber) >= 2 && Number(chosenNumber) <= 10)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 2 and 10. All decimals will be rounded up.`;
    return resultMessage;
  }
  // Valid input, so we update numPlayers based on input rounded up
  numPlayers = Math.ceil(Number(chosenNumber));
  // Create object for each player and add to players array
  for (var i = 0; i < numPlayers; i++) {
    var player = { playerNum: i + 1, playerScore: 0 };
    players.push(player);
  }
  // Output the result message
  resultMessage = `You have selected to play the game with ${numPlayers} players.<br><br>Now enter "${HIGHEST}" to have the the win condition be ${"highest number wins".italics()}, or enter "${LOWEST}" to have the win condition be ${"lowest number wins".italics()}.`;
  gameMode = CHOOSE_WIN_CNDTN; // Update game mode to next stage
  return resultMessage;
};

// Second stage of game: Choose win condition
var stage2 = function (chosenCndtn) {
  var resultMessage;
  // Input validation: if user does not enter a valid win condition
  if (chosenCndtn != HIGHEST && chosenCndtn != LOWEST) {
    resultMessage = `You have entered an invalid input.<br><br>Please enter "${HIGHEST}" to have the the win condition be ${"highest number wins".italics()}, or enter "${LOWEST}" to have the win condition be ${"lowest number wins".italics()}.`;
    return resultMessage;
  }
  // Valid input, so we update winCndtn based on input
  winCndtn = chosenCndtn;
  resultMessage = `You have selected the win condition as ${(winCndtn + " number wins").italics()}.<br><br>
  Now enter "${ON}" to have Knockout Mode turned on, or enter "${OFF}" to have Knockout Mode turned off.`;
  gameMode = CHOOSE_KNOCKOUT; // Update game mode to next stage
  return resultMessage;
};

// Third stage of game: Choose Knockout Mode setting
var stage3 = function (onOrOff) {
  var resultMessage;
  // Input validation: if user does not enter "on" or "off"
  if (onOrOff != ON && onOrOff != OFF) {
    resultMessage = `You have entered an invalid input.<br><br>Please enter "${ON}" to have Knockout Mode turned on, or enter "${OFF}" to have Knockout Mode turned off.`;
    return resultMessage;
  }
  // Valid input, so we update koSetting based on input
  koSetting = onOrOff;
  gameMode = CHOOSE_NUM_DICE; // Update game mode to next stage
  resultMessage = `You have selected Knockout Mode to be turned ${koSetting}.<br><br>These are the settings that you have chosen:<br>Number of players: ${numPlayers}<br>Win condition: ${winCndtn} number wins<br>Knockout Mode: ${koSetting}<br><br>You are now ready to start the first round of Beat That!<br>Enter the number of dice that will be rolled for each player in this round.`;
  return resultMessage;
};

// Choose number of dice to be rolled for the round and then play the round
var stage4 = function (numDiceInput) {
  var resultMessage;
  // Input validation: need at least 1 die to be rolled. Limit number of dice to 8 for performance reasons.
  if (!(Number(numDiceInput) >= 1 && Number(numDiceInput) <= 8)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 1 and 8. All decimals will be rounded up.`;
    return resultMessage;
  }
  // Valid input, so we update numDice based on input rounded up
  numDice = Math.ceil(Number(numDiceInput));
  // Play the round
  if (koSetting == ON) {
    return playRoundKOMode(numDice);
  } else {
    return playRound(numDice);
  }
};

// Play the round when Knockout Mode is turned off
var playRound = function (numDice) {
  var resultMsg = "";
  // Roll dice and calculate score for each player
  for (var p = 0; p < players.length; p++) {
    var diceRolls = [];
    for (var i = 0; i < numDice; i++) {
      diceRolls.push(rollDice());
    }
    var roundScore = calcNumber(diceRolls);
    players[p].playerScore += roundScore;
    resultMsg += `Player ${players[p].playerNum} rolled ${diceRolls}.<br>This represents a score of ${roundScore}.<br><br>`;
  }
  // Add the current leaderboard to the result message
  resultMsg += `${createLeaderboard(players)}<br><br>
  Enter the number of dice that will be rolled for each player in the next round.`;
  return resultMsg;
};

// Play the round when Knockout Mode is turned on
var playRoundKOMode = function (numDice) {
  var resultMsg = "";
  // Declare that game is over if there is only one player remaining even before playing the round
  if (players.length == 1) {
    resultMsg = `Player ${players[0].playerNum} is the only player remaining and is therefore the Knockout Mode Champion! 🥳<br><br>The game has ended.`;
    return resultMsg;
  }
  // Roll dice and calculate score for each player
  for (var p = 0; p < 2; p++) {
    var diceRolls = [];
    for (var i = 0; i < numDice; i++) {
      diceRolls.push(rollDice());
    }
    var roundScore = calcNumber(diceRolls);
    players[p].playerScore = roundScore; // We don't use "+=" here as we want to reset the score each round
    resultMsg += `Player ${players[p].playerNum} rolled ${diceRolls}<br>This represents a score of ${roundScore}.<br><br>`;
  }
  // Find the winner and loser of the round
  var winner;
  var loser;
  if (winCndtn == HIGHEST) {
    // Assume player with smaller player number stays if draw
    if (players[0].playerScore >= players[1].playerScore) {
      winner = players[0].playerNum;
      loser = players[1].playerNum;
    } else {
      winner = players[1].playerNum;
      loser = players[0].playerNum;
    }
  } else if (winCndtn == LOWEST) {
    if (players[0].playerScore <= players[1].playerScore) {
      winner = players[0].playerNum;
      loser = players[1].playerNum;
    } else {
      winner = players[1].playerNum;
      loser = players[0].playerNum;
    }
  }
  // Find position of the loser in the players array
  var indexOfLoser = players.findIndex((x) => x.playerNum == loser);
  // Remove the loser from the players array
  players.splice(indexOfLoser, 1);
  resultMsg += `The winner is...🥁🥁 Player ${winner}! Goodbye Player ${loser} 👋.<br><br>`;
  // Declare that game is over if there is only one player remaining at the end of the round
  if (players.length == 1) {
    resultMsg += `Player ${players[0].playerNum} is the only player remaining and is therefore the Knockout Mode Champion! 🥳<br><br>The game has ended.`;
  } else {
    resultMsg += `The remaining players are Players ${players.map((x) => x.playerNum)}.<br><br>
    Next up, we have Player ${players[0].playerNum} and Player ${players[1].playerNum}!<br>
    Enter the number of dice that will be rolled for each player in the next round.`;
  }
  return resultMsg;
};

var calcNumber = function (diceRolls) {
  // Create a (deep) copy of the dice rolls array
  var sortedRolls = JSON.parse(JSON.stringify(diceRolls));
  // Sort the array based on win condition
  if (winCndtn == HIGHEST) {
    sortedRolls = sortedRolls.sort(function (a, b) {
      return b - a;
    });
  } else if (winCndtn == LOWEST) {
    sortedRolls = sortedRolls.sort(function (a, b) {
      return a - b;
    });
  }
  // Combine the sorted dice rolls and convert to a number
  var concatRolls = sortedRolls.join("");
  var finalNum = Number(concatRolls);
  return finalNum;
};

var createLeaderboard = function (players) {
  // Create a (deep) copy of the players array
  var sortedPlayers = JSON.parse(JSON.stringify(players));
  // Sort the array depending on win condition
  if (winCndtn == HIGHEST) {
    sortedPlayers.sort(function (a, b) {
      return b.playerScore - a.playerScore;
    });
  } else if (winCndtn == LOWEST) {
    sortedPlayers.sort(function (a, b) {
      return a.playerScore - b.playerScore;
    });
  }
  // Get the array of sorted player numbers
  var playerNumArray = sortedPlayers.map((x) => x.playerNum);
  // Get the array of sorted player scores
  var scoreArray = sortedPlayers.map((x) => x.playerScore);
  // Output the leaderboard with some basic formatting
  var leaderboard = `Here is the current leaderboard:<br><br>
  Player Number: ${playerNumArray.join(" | ")}<br>Score: ${scoreArray.join(" | ")}`;
  return leaderboard;
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = stage1(input);
    return myOutputValue;
  }
  if (gameMode == CHOOSE_WIN_CNDTN) {
    myOutputValue = stage2(input);
    return myOutputValue;
  }
  if (gameMode == CHOOSE_KNOCKOUT) {
    myOutputValue = stage3(input);
    return myOutputValue;
  }
  if (gameMode == CHOOSE_NUM_DICE) {
    myOutputValue = stage4(input);
    return myOutputValue;
  }
};
