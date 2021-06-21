// Variable for game modes
var GAME_MODE_DICE_ROLL = "GAME_MODE_DICE_ROLL";
var GAME_MODE_CHOOSE_DICE_ORDER = "GAME_MODE_CHOOSE_DICE_ORDER";
var GAME_MODE_CHOOSE_NUMBER_PLAYERS = "GAME_MODE_CHOOSE_NUMBER_PLAYERS";
// Initialise the game 
var gameMode = GAME_MODE_CHOOSE_NUMBER_PLAYERS;
// Variable for default output value
var myOutputValue = "Welcome! Please enter the number of players. Minimum number of players is 2.";

// Variable for number of players 
var numberOfPlayers = 0;
// Temporary array to store individual dice rolls 1 & 2 for each round
var tempArray = [];
// Array to store arrays of all players dice rolls per round
var allDiceArrays = [];
// Array to store players' numbers
var playerNumbers = [];
// Keep track of current player's number 
var currPlayer = 1;
// Array to track number of attempts (for a whole group of players)
var attemptsCount = [];



// Function to roll dice 
var rollDice = function(i) {
  var randNum = Math.random() * (i+1);
  var randNumber = Math.floor(randNum);
  return randNumber;
};

// Function to concatenate 2 numbers
var concatenate2Numbers = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

// Function to get the player's chosen numbers 
var getPlayerNumber = function(firstNumeralIndex, player) {
  var diceArray = allDiceArrays[player-1];
  console.log("diceArray");
  console.log(diceArray);
  
  var playerNum;
  if (firstNumeralIndex == 1) {
    playerNum = concatenate2Numbers(diceArray[0],diceArray[1]);
  }
  else {
    playerNum = concatenate2Numbers(diceArray[1], diceArray[0]);
  }
  console.log(parseInt(playerNum));
  return parseInt(playerNum);
}

//Function to determine winner
var determineWinner = function () {
  var largestNumber = 0;
  var winningPlayer;
  var index = 0;
  while (index < playerNumbers.length) {
    console.log(`Check player ${index+1}'s number`);
    console.log(`${playerNumbers[index]}`);
    if (playerNumbers[index] > largestNumber) {
      largestNumber = playerNumbers[index];
      winningPlayer = index + 1;
    }
    index += 1
  }
  return winningPlayer;
}

var main = function (input) { 
  // MODE: GAME_MODE_CHOOSE_NUMBER_PLAYERS
  // Ask user to enter number of players
  
  if (gameMode == GAME_MODE_CHOOSE_NUMBER_PLAYERS) {
    if (input == "") {
      return myOutputValue;
    }
    
    if (Number(input) < 2) {
      console.log("Invalid input. Prompt user to reenter");
      myOutputValue = "Please enter an integer value at least equal to 2.";
      return myOutputValue;
    }
  
    // Store number of players in global variable
    numberOfPlayers = input;
    console.log("number of players");
    console.log(numberOfPlayers);

    // Fill the attemptsCount, playerNumbers and allDiceArrays arrays with 0 from position 0 to numberOfPlayers - 1
    var index = 0;
    while (index < numberOfPlayers) {
      attemptsCount.push(0);
      playerNumbers.push(0);
      allDiceArrays.push([]);
      index += 1
    }

    // Change game mode to GAME_MODE_DICE_ROLL
    gameMode = GAME_MODE_DICE_ROLL;
  }

  if (gameMode == GAME_MODE_DICE_ROLL) {
    console.log("Game mode")
    console.log(gameMode);
    console.log("Player:")
    console.log(`${currPlayer}`)
    console.log("Rolling dice")
    // Store dice rolls in temporary array
    tempArray = [rollDice(6), rollDice(6)];
    console.log("Dice rolls");
    console.log(`${tempArray}`);
    // Push dice roll for this player to global array
    allDiceArrays[currPlayer - 1] = tempArray;
    // Prompt player to pick order of dice
    myOutputValue = `Welcome player ${currPlayer}. <br> You rolled Dice 1: ${tempArray[0]} and Dice 2: ${tempArray[1]}. Next, choose the order of the dice by entering 1 or 2 as the first numeral index.`
    // Change game mode to pick order of dice
    gameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return myOutputValue;
  }

  // Game mode: Choose Dice order
  if (gameMode == GAME_MODE_CHOOSE_DICE_ORDER) {
    console.log("Game mode")
    console.log(gameMode);

    var firstNumeralIndex = Number(input);
    // If input dice order is invalid
    if (firstNumeralIndex !== 1 && firstNumeralIndex !== 2) {
      console.log("Invalid input for dice order. Prompt user to reenter");
      myOutputValue = "Please choose 1 or 2 as the first numeral index for your dice rolls";
    }

    // Get player number
    console.log("first numeral index");
    console.log(firstNumeralIndex);
    console.log("Running getPlayerNumber function..");

    var playerNum = getPlayerNumber(firstNumeralIndex, currPlayer);
    console.log("Player number");
    console.log(playerNum);
    console.log("player's previous score")
    console.log(playerNumbers[currPlayer - 1]);
    
    // Store player number in global array (accumulate scores)
    playerNumbers[currPlayer - 1] = playerNumbers[currPlayer - 1] + playerNum;
    console.log("player's updated score")
    console.log(playerNumbers[currPlayer - 1]);

    // Update the no. of attempts for this player
    attemptsCount[currPlayer-1] += 1

    var playerNumResponse = `Player ${currPlayer}, You chose Dice ${firstNumeralIndex} first. Your number is ${playerNum}.`;
    
    //If this is not the last player, prompt for the next player's turn
    if (currPlayer < numberOfPlayers)  {
      // Increment currPlayer by 1 to next player
      currPlayer += 1
      // Reset game mode to GAME_MODE_DICE_ROLL
      gameMode = GAME_MODE_DICE_ROLL;
      console.log("Game mode");
      console.log(gameMode);
      // Set response for current player
      return `${playerNumResponse} <br> It is now player ${currPlayer}'s turn. Press Submit to roll Player ${currPlayer}'s  dice.`;
    } 
    //Else, if this is the last player, determine the winner and let the players know who won
    else {
      var winningPlayer = determineWinner();
      console.log("winning player");
      console.log(winningPlayer);

      //Reset the game to the dice roll
      currPlayer = 1;
      gameMode = GAME_MODE_DICE_ROLL;

      var index = 0;
      var leaderboard = "";
      var attempts = "";
      while (index < numberOfPlayers) {
        leaderboard += `Player ${index + 1}'s score: ${playerNumbers[index]} <br>`;
        attempts += `Player ${index + 1}: ${attemptsCount[currPlayer - 1]} <br>`
        index += 1;
      }

      // Return the game end response
      return `${playerNumResponse} <br>
      <br><b>SCOREBOARD</b><br> 
      Player ${winningPlayer} has won. 
      <br> ${leaderboard} <br>
      <br><b>NUMBER OF ATTEMPTS</b><br>
      ${attempts}
      <br>To restart the game for Player 1, click the submit button.`; 
    }

  }

  return myOutputValue; 
};



