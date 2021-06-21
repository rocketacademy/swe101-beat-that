// var currentGameMode = "waiting for p1";
// var playerOne = "";
// var playerTwo = "";
// var combineNumP1 = "";
// var combineNumP2 = "";

// // dice roll function
// var rollDice = function () {
//   var diceNum = Math.floor(Math.random() * 6 + 1);
//   return diceNum;
// };

// var main = function (input) {
//   if (currentGameMode == "waiting for p1") {
//     // set playerOne name and switch game mode
//     playerOne = input;
//     currentGameMode = "waiting for p2";
//     myOutputValue =
//       "Welcome " + playerOne + ". Player2 please enter your username.";
//   } else if (currentGameMode == "waiting for p2") {
//     playerTwo = input;
//     currentGameMode = "dice game p1";
//     myOutputValue =
//       "Welcome " + playerTwo + ". " + playerOne + " your turn starts.";
//   } else if (currentGameMode == "dice game p1") {
//     var dice1 = rollDice();
//     var dice2 = rollDice();
//     currentGameMode = "dice game p2";
//     if (dice1 > dice2) {
//       combineNumP1 = "" + dice1 + dice2;
//       myOutputValue = playerOne + " the number you got is " + combineNumP1;
//     } else {
//       combineNumP1 = "" + dice2 + dice1;
//       myOutputValue = playerTwo + " the number you got is " + combineNumP2;
//     }
//   } else if (currentGameMode == "dice game p2") {
//     dice1 = rollDice();
//     dice2 = rollDice();
//     currentGameMode = "end game";
//     if (dice1 > dice2) {
//       combineNumP2 = "" + dice1 + dice2;
//       myOutputValue = playerTwo + " the number you got is " + combineNumP2;
//     } else {
//       combineNumP2 = "" + dice2 + dice1;
//       myOutputValue = playerTwo + " the number you got is " + combineNumP2;
//     }
//   } else if (currentGameMode == "end game") {
//     if (combineNumP1 > combineNumP2) {
//       myOutputValue = playerOne + " wins";
//     } else {
//       myOutputValue = playerTwo + " wins";
//     }
//   }
//   return myOutputValue;
// };

// var currentGameMode = "waiting for username";
// var userName = "";
// var randomDice1 = "";
// var randomDice2 = "";
// console.log("Dice1: " + randomDice1);
// console.log("Dice2: " + randomDice2);
// console.log("" + randomDice1 + randomDice2);

// // dice roll function
// // var rollDice = function () {
// //   var diceNum = Math.floor(Math.random() * 6) + 1;
// //   return diceNum;
// // };
// var playDiceGame = function (userName, randomDice1) {
//   var message = "";
//   randomDice1 = Math.floor(Math.random() * 6) + 1;
//   randomDice2 = Math.floor(Math.random() * 6) + 1;
//   console.log("Dice1: " + randomDice1);
//   console.log("Dice2: " + randomDice2);
//   console.log("" + randomDice1 + randomDice2);
//   message =
//     userName +
//     ", you rolled " +
//     randomDice1 +
//     " for Dice 1 and " +
//     randomDice2 +
//     " for Dice 2.<br><br>Choose the order of the dice.<br>Type '1' to choose Dice 1 or '2' to choose Dice 2 as the first digit.";
//   return message;
// };

// var main = function (input) {
//   var myOutputValue = "";

//   if (currentGameMode == "waiting for username") {
//     if (input == "") {
//       myOutputValue = "Sorry please enter your username";
//     } else {
//       userName = input;
//       currentGameMode = "dice game";
//     }
//   }
//   if (currentGameMode == "dice game") {
//     currentGameMode = "dice choice";
//     return playDiceGame(userName, input);
//   }

//   if (currentGameMode == "dice choice") {
//     if (input == "1") {
//       console.log("" + randomDice1 + randomDice2);
//       console.log("Dice1: " + randomDice1);
//       console.log("Dice2: " + randomDice2);
//       myOutputValue =
//         userName +
//         ", you chose Dice 1 first.<br>Your number is " +
//         randomDice1 +
//         randomDice2 +
//         ".<br> It is now Player 2 turn.";
//     } else {
//       myOutputValue =
//         userName +
//         ", you chose Dice 2 first.<br>Your number is " +
//         "" +
//         randomDice2 +
//         randomDice1 +
//         ".<br> It is now Player 2 turn.";
//     }
//     currentGameMode = "waiting for username";
//   }
//   return myOutputValue;
// };

var currentGameMode = "waiting for p1 username";
var userName;
var userNameP1 = "";
var userNameP2 = "";
var randomDice1 = "";
var randomDice2 = "";
var combineNumP1 = "";
var combineNumP2 = "";
var winP1 = 0;
var winP2 = 0;

// dice roll function
var rollDice = function () {
  var diceNum = Math.floor(Math.random() * 6 + 1);
  return diceNum;
};

var playDiceGameP1 = function (userName, randomDice1) {
  var message = "";
  randomDice1 = Math.floor(Math.random() * 6) + 1;
  randomDice2 = Math.floor(Math.random() * 6) + 1;
  console.log("Dice1: " + randomDice1);
  console.log("Dice2: " + randomDice2);
  if (randomDice1 > randomDice2) {
    combineNumP1 = "" + randomDice1 + randomDice2;
    message =
      userName +
      ", you rolled " +
      randomDice1 +
      " for Dice 1 and " +
      randomDice2 +
      " for Dice 2.<br><br>Your number is " +
      combineNumP1 +
      "<br><br>It is now Player 2 turn.";
  } else {
    combineNumP1 = "" + randomDice2 + randomDice1;
    message =
      userName +
      ", you rolled " +
      randomDice1 +
      " for Dice 1 and " +
      randomDice2 +
      " for Dice 2.<br><br>Your number is " +
      combineNumP1 +
      "<br><br>It is now Player 2 turn.";
  }
  return message;
};

var playDiceGameP2 = function (userName, randomDice1) {
  var message = "";
  randomDice1 = Math.floor(Math.random() * 6) + 1;
  randomDice2 = Math.floor(Math.random() * 6) + 1;
  console.log("Dice1: " + randomDice1);
  console.log("Dice2: " + randomDice2);
  if (randomDice1 > randomDice2) {
    combineNumP2 = "" + randomDice1 + randomDice2;
    message =
      userName +
      ", you rolled " +
      randomDice1 +
      " for Dice 1 and " +
      randomDice2 +
      " for Dice 2.<br><br>Your number is " +
      combineNumP2 +
      "<br><br>Click submit to see results";
  } else {
    combineNumP2 = "" + randomDice2 + randomDice1;
    message =
      userName +
      ", you rolled " +
      randomDice1 +
      " for Dice 1 and " +
      randomDice2 +
      " for Dice 2.<br><br>Your number is " +
      combineNumP2 +
      "<br><br>Click submit to see results";
  }
  return message;
};

var main = function (input) {
  var myOutputValue = "";

  // Player 1 key in username
  if (currentGameMode == "waiting for p1 username") {
    if (input == "") {
      myOutputValue = "Sorry please enter your username";
    } else {
      userNameP1 = input;
      currentGameMode = "dice game p1";
    }
  }
  // Player 2 dice game start. And skip waiting for Player 2 username when one round of dice roll has began
  if (currentGameMode == "dice game p1") {
    if (winP1 >= 1 || winP2 >= 1) {
      currentGameMode = "dice game p2";
    } else {
      currentGameMode = "waiting for p2 username";
    }
    return playDiceGameP1(userNameP1, input);
  }
  // Player 2 key username
  if (currentGameMode == "waiting for p2 username") {
    if (input == "") {
      myOutputValue = "Sorry please enter your username";
    } else {
      userNameP2 = input;
      currentGameMode = "dice game p2";
    }
  }
  // Player 2 dice game start
  if (currentGameMode == "dice game p2") {
    currentGameMode = "outcome";
    return playDiceGameP2(userNameP2, input);
  }
  // add 1 to the winner and output result in decreasing rank oder
  if (currentGameMode == "outcome") {
    currentGameMode = "dice game p1";
    if (combineNumP1 > combineNumP2) {
      winP1 += 1;
    } else {
      winP2 += 1;
    }
    if (winP1 > winP2) {
      myOutputValue =
        "Score <br><br>" +
        userNameP1 +
        " " +
        winP1 +
        "<br><br>" +
        userNameP2 +
        " " +
        winP2;
    } else {
      myOutputValue =
        "Score <br><br>" +
        userNameP2 +
        " " +
        winP2 +
        "<br><br>" +
        userNameP1 +
        " " +
        winP1;
    }
  }
  return myOutputValue;
};
