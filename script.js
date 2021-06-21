///roll dice
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var mode = "choosinggamemode";
var user1Number = 0;
var user2Number = 0;
var user1Numbers = [];
var user2Numbers = [];

var user1SCORE = 0;
var user2SCORE = 0;
var gamemode = "";
var NumberofDices = 0;

var main = function (input) {
  var myOutputValue = " ";
  console.log(mode);

  if (mode == "choosinggamemode") {
    myOutputValue = choosinggamemode();
    mode = "gamemodechosen";
  } else if (mode == "gamemodechosen") {
    myOutputValue = gamemodechosen(input);
    mode = "chooseNumofDice";
  } else if (mode == "chooseNumofDice") {
    mode = "part1";
    return NumofDice(input);
  } else if (mode == "part1") {
    myOutputValue = part1();
    mode = "part2";
  } else if (mode == "part2") {
    myOutputValue = part2();
    mode = "outcome";
  } else if (mode == "outcome") {
    console.log(gamemode);
    if (gamemode == "Reverse") {
      myOutputValue =
        reverseOutcome(user1Number, user2Number) +
        reverseleaderboard(user1SCORE, user2SCORE);
    } else if (gamemode == "Normal") {
      myOutputValue =
        normalOutcome(user1Number, user2Number) +
        normalleaderboard(user1SCORE, user2SCORE);
    }
    mode = "part1";
  }
  return myOutputValue;
};

///chooser normal or reverse mode
var choosinggamemode = function () {
  return "Please choose a game mode. <br>There are 2 possible game modes: Normal and Reverse.<br>Please choose one.";
};

var gamemodechosen = function (input) {
  if (input == "Normal") {
    gamemode = "Normal";
    return "The game mode you chose was Normal. <br>The player with the highest possible number will win. <br>Please now type in the Number of Dices.";
  } else if (input == "Reverse") {
    gamemode = "Reverse";
    return "The game mode you chose was Reverse.<br>The player with the lowest possible number will win. <br>Please now type in the Number of Dices.";
  } else {
    mode = "choosinggamemode";
    return "Please type in either 'Normal' or 'Reverse' ";
  }
};

var NumofDice = function (input) {
  if (isNaN(input) || input == 0) {
    mode = "chooseNumofDice";
    return "Please type in a number.";
  } else {
    NumberofDices = Number(input);
    return `You've chosen to roll ${NumberofDices} dices. <br>Click the submit button.`;
  }
};

///roll the dice for user1's two numbers
var part1 = function () {
  var roll = 0;
  while (roll < NumberofDices) {
    var user1Num = rollDice();
    user1Numbers.push(user1Num);
    roll += 1;
  }

  if (gamemode == "Normal") {
    user1Numbers = user1Numbers.sort(function (a, b) {
      return b - a;
    });

    var counter = 0;
    while (counter < user1Numbers.length) {
      user1Number +=
        user1Numbers[counter] * 10 ** (NumberofDices - 1 - counter);
      counter += 1;
    }
  } else if (gamemode == "Reverse") {
    user1Numbers = user1Numbers.sort(function (a, b) {
      return a - b;
    });
    var counter = 0;
    while (counter < user1Numbers.length) {
      user1Number +=
        user1Numbers[counter] * 10 ** (NumberofDices - 1 - counter);
      counter += 1;
    }
  }
  user1SCORE = user1SCORE + user1Number;
  console.log(user1SCORE);

  return `User 1, your number is ${user1Number}`;
};

///roll the dice for user2's two numbers
var part2 = function () {
  var roll = 0;
  while (roll < NumberofDices) {
    var user2Num = rollDice();
    user2Numbers.push(user2Num);
    roll += 1;
  }

  if (gamemode == "Normal") {
    user2Numbers = user2Numbers.sort(function (a, b) {
      return b - a;
    });

    var counter = 0;
    while (counter < user2Numbers.length) {
      user2Number +=
        user2Numbers[counter] * 10 ** (NumberofDices - 1 - counter);
      counter += 1;
    }
  } else if (gamemode == "Reverse") {
    user2Numbers = user2Numbers.sort(function (a, b) {
      return a - b;
    });
    var counter = 0;
    while (counter < user2Numbers.length) {
      user2Number +=
        user2Numbers[counter] * 10 ** (NumberofDices - 1 - counter);
      counter += 1;
    }
  }
  user2SCORE = user2SCORE + user2Number;
  console.log(user2SCORE);

  return `User 2, your number is ${user2Number}`;
};

///get the leaderboard for the reverse mode.
var reverseleaderboard = function (user1SCORE, user2SCORE) {
  var message = "";
  if (user1SCORE <= user2SCORE) {
    message = `1. User1's Score: ${user1SCORE} <br>2. User2's Score: ${user2SCORE}`;
  } else if (user2SCORE < user1SCORE) {
    message = `1. User2's Score: ${user2SCORE} <br>2. User1's Score: ${user1SCORE}`;
  }
  return (
    message +
    '<br><br>Click the "submit" button to replay. <br>To change Game Modes, please refresh page.'
  );
};

///get the outcome for the reverse mode (e.g. win or lose)
var reverseOutcome = function (user1Number, user2Number) {
  var message = `Player 1's number is ${user1Number} while Player 2's number is ${user2Number}. <br>`;

  if (user1Number < user2Number) {
    message += `User 1 won! Try again later User 2. <br>`;
  } else if (user2Number > user1Number) {
    message += `User 2 won! Try again later User 1. <br>`;
  } else if (user1Number == user2Number) {
    message += `It's a tie! <br>Better luck next time. <br>`;
  }
  message += `<br>`;
  return message;
};

///get the leaderboard for the normal mode.
var normalleaderboard = function (user1SCORE, user2SCORE) {
  var message = "";
  if (user1SCORE >= user2SCORE) {
    message = `1. User1's Score: ${user1SCORE} <br>2. User2's Score: ${user2SCORE}`;
  } else if (user2SCORE > user1SCORE) {
    message = `1. User2's Score: ${user2SCORE} <br>2. User1's Score: ${user1SCORE}`;
  }
  return (
    message +
    '<br><br>Click the "submit" button to replay. <br>To change Game Modes, please refresh page.'
  );
};

///get the outcome for the normal mode (e.g. win or lose)
var normalOutcome = function (user1Number, user2Number) {
  var message = `Player 1's number is ${user1Number} while Player 2's number is ${user2Number}. <br>`;

  if (user1Number > user2Number) {
    message += `User 1 won! Try again later User 2. <br>`;
  } else if (user2Number > user1Number) {
    message += `User 2 won! Try again later User 1. <br>`;
  } else if (user1Number == user2Number) {
    message += `It's a tie! <br>Better luck next time. <br>`;
  }
  message += `<br>`;
  return message;
};
