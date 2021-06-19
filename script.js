var gameMode = "initial";
var player1number = 0;
var gameVersion = "normal";
var player1 = { name: "Player 1", score: 0 };
var player2 = { name: "Player 2", score: 0 };

var main = function (input) {
  // lowest combined number mode
  if (gameMode == "initial" && input == "") {
    return "Please chose your game mode by either typing 'normal' or 'lowest number'!";
  }

  if (gameMode == "initial" && input == "normal") {
    gameMode = "initial player 1";
    return "You have select the normal mode! Click 'Submit' to roll the dice!";
  }
  if (gameMode == "initial" && input == "lowest number") {
    gameMode = "initial player 1";
    gameVersion = "lowest number";
    return "You have select the lowest number mode! Click 'Submit' to roll the dice!";
  }

  //Player 1 rolls the dice
  if (gameMode == "initial player 1") {
    var player1DiceRoll = diceResults();
    gameMode = "chose order player 1";
    return (
      "Player 1's dice results are " +
      player1DiceRoll[0] +
      " and " +
      player1DiceRoll[1] +
      "<br>Please chose in which order these dice should be arranged!"
    );
  }
  // Player 1 choses the dice order
  if (gameMode == "chose order player 1") {
    player1number = input;
    gameMode = "initial player 2";
    return (
      "Player 1's number is " +
      player1number +
      "! <br>Now it is player 2's turn, roll the dice by clicking 'submit'!"
    );
  }
  // Player 2 rolls the dice
  if (gameMode == "initial player 2") {
    var player2DiceRoll = diceResults();
    gameMode = "chose order player 2";
    return (
      "Player 2's dice results are " +
      player2DiceRoll[0] +
      " and " +
      player2DiceRoll[1] +
      "<br>Please chose in which order these dice should be arranged!"
    );
  }
  // Player 2 choses the dice order and the winner is revealed
  if (gameMode == "chose order player 2") {
    player2number = input;
    gameMode = "initial player 1";
    console.log(gameVersion);
    var winner = "";
    //if game version is normal then increase score of largest player
    if (player1number > player2number && gameVersion == "normal") {
      player1.score += 1;
      winner = "Player 1";
    } else if (player1number < player2number && gameVersion == "normal") {
      player2.score += 1;
      winner = "Player 2";
    }
    //if game version is lowest number then increase score of smallest player
    if (player1number < player2number && gameVersion == "lowest number") {
      player1.score += 1;
      winner = "Player 1";
    } else if (
      player1number > player2number &&
      gameVersion == "lowest number"
    ) {
      player2.score += 1;
      winner = "Player 2";
    }
    //draw
    if (player2number == player1number) {
      winner = "no one.";
    }
    return (
      "Player 2's number is " +
      player2number +
      ". <br><br>Player 1's number was " +
      player1number +
      ", so the winner is " +
      winner +
      "<br><br>The current leaderboard is<br>" +
      printLeaderboard()
    );
  }
};

//basic dice roll function
var diceRoll = function () {
  var result = Math.floor(Math.random() * 6) + 1;
  return result;
};

//dice results are stored in an array for a given player
var diceResults = function () {
  var playerXDiceRoll = [];
  var counter = 0;
  while (counter < 2) {
    counter += 1;
    playerXDiceRoll.push(diceRoll());
  }
  return playerXDiceRoll;
};

//function to define leaderboard and sorting
var leaderboard = function () {
  var players = [player1, player2];
  players.sort(function (a, b) {
    return b.score - a.score;
  });
  return players;
};

//function to print leaderboard
var printLeaderboard = function () {
  var players = leaderboard();
  var output = "";
  players.forEach(function (player, index) {
    output +=
      "#" + (index + 1) + " " + player.name + " " + player.score + "<br>";
  });
  return output;
};
