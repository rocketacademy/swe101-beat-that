var randomNum = function () {
  var randomInteger = Math.floor(Math.random() * 6) + 1;
  return randomInteger;
};
var gameMode1 = "waiting for player 1";
var gameMode2 = "waiting for player 2";
var gameMode3 = "waiting for setting gamemode";
var userName1 = "";
var userName2 = "";
var player1DiceRoll1 = "";
var player1DiceRoll2 = "";
var player2DiceRoll1 = "";
var player2DiceRoll2 = "";
var finalNum1 = [];
var finalNum2 = [];

var getSum = function (list) {
  var index = 0;
  var currentSum = 0;
  while (index < list.length) {
    //current sum + element in the array
    currentSum = currentSum + list[index];
    index = index + 1;
  }
  return currentSum;
};

var main = function (input) {
  if (gameMode3 == "waiting for setting gamemode") {
    if (input == "reverse") {
      gameMode3 = "compare lowest score";
      return `You are now entering the reverse mode- the lowest combined scores win. <br> 👋🏻Please enter your name`;
    } else {
      gameMode3 = "compare highest score";
      return `You are now entering the normal mode- the highest combined scores win. <br> 👋🏻Please enter your name`;
    }
  }

  if (gameMode1 == "waiting for player 1") {
    userName1 = input;
    gameMode1 = "player 1 turn";
    console.log(userName1);
    return `Welcome ${userName1}, please roll the dice`;
  }

  if (gameMode1 == "player 1 turn") {
    player1DiceRoll1 = randomNum();
    player1DiceRoll2 = randomNum();
    gameMode1 = "player 1 select your dice order";
    return ` Hey ${userName1}! <br> Dice 1: You rolled  ${player1DiceRoll1}.<br> Dice 2: You rolled  ${player1DiceRoll2} <br> Please select your dice order "1" or "2" to display your outcome`;
  }

  if (gameMode1 == "player 1 select your dice order") {
    if (input == 1) {
      finalNum1.push(Number(`${player1DiceRoll1}${player1DiceRoll2}`));
      gameMode1 = "player 1 done";
      return `${userName1}, you chose dice order 1 first. <br> Your number: ${
        finalNum1[finalNum1.length - 1]
      }<br><br>
       👋🏻 Player 2, please enter your name`;
    } else if (input == 2) {
      finalNum1.push(Number(`${player1DiceRoll2}${player1DiceRoll1}`));
      gameMode1 = "player 1 done";
      return `${userName1}, you chose dice order 2 first.<br> Your number: ${
        finalNum1[finalNum1.length - 1]
      }. <br><br>
       👋🏻 Player 2, please enter your name. If you have previously entered your name, ignore and click the button`;
    }
  }
  if (gameMode2 == "waiting for player 2") {
    console.log(gameMode2);
    userName2 = input;
    gameMode2 = "player 2 turn";
    return `Welcome ${userName2}, please roll the dice.`;
  }
  if (gameMode2 == "player 2 turn") {
    userName2;
    player2DiceRoll1 = randomNum();
    player2DiceRoll2 = randomNum();
    gameMode2 = "player 2 select your dice order";
    return `Hey ${userName2}! <br> Dice  1: You rolled  ${player2DiceRoll1}.<br> Dice 2: You rolled  ${player2DiceRoll2}.<br> Please select your dice order "1" or "2" to display your  outcome`;
  }
  if (gameMode2 == "player 2 select your dice order") {
    if (input == 1) {
      finalNum2.push(Number(`${player2DiceRoll1}${player2DiceRoll2}`));
      gameMode2 = "player 2 done";
      return `${userName2}, you chose dice order 1 first. Your number: ${
        finalNum2[finalNum2.length - 1]
      }.<br> Please click on "roll your dice" to see winning outcome`;
    } else if (input == 2) {
      finalNum2.push(Number(`${player2DiceRoll2}${player2DiceRoll1}`));
      gameMode2 = "player 2 done";
      return `${userName2}, you chose dice order 2 first. Your number: ${
        finalNum2[finalNum2.length - 1]
      } <br> Please click on "roll your dice" to see winning outcome`;
    }
  }
  console.log(gameMode3, "hello");
  if (gameMode3 == "compare highest score") {
    if (getSum(finalNum1) > getSum(finalNum2)) {
      gameMode1 = "player 1 turn";
      gameMode2 = "player 2 turn";
      return `${userName1} wins🙌🙌.<br> ${userName1} total score: ${getSum(
        finalNum1
      )} <br>  ${userName2} total score: ${getSum(
        finalNum2
      )}<br><br> 🕹 Please click on "Roll your dice" button to play again. <br> 🔚Refresh the page if you want to change the mode or have a new player`;
    } else if (getSum(finalNum2) > getSum(finalNum1)) {
      gameMode1 = "player 1 turn";
      gameMode2 = "player 2 turn";
      return `${userName2} wins🙌🙌.<br> ${userName2} total score: ${getSum(
        finalNum2
      )}. <br> ${userName1} total score: ${getSum(
        finalNum1
      )}. <br><br> 🕹 Please click on "Roll your dice" button to play again. <br> 🔚Refresh the page if you want to change the mode or have a new player`;
    }
  }
  if (gameMode3 == "compare lowest score") {
    if (getSum(finalNum1) < getSum(finalNum2)) {
      return `In the reverse game where lowest combined scores win...${userName1} wins🙌🙌.<br> ${userName1}'s total score: ${getSum(
        finalNum1
      )} <br>  ${userName2}'s total score: ${getSum(
        finalNum2
      )}<br><br> 🕹 Please click on "Roll your dice" button to play again. <br> 🔚Refresh the page if you want to change the mode or have a new player`;
    } else if (getSum(finalNum2) < getSum(finalNum1)) {
      gameMode1 = "player 1 turn";
      gameMode2 = "player 2 turn";
      return `In the reverse game where lowest combined scores win...${userName2} wins🙌🙌.<br> ${userName2}'s total score: ${getSum(
        finalNum2
      )}. <br> ${userName1}'s total score: ${getSum(
        finalNum1
      )}<br><br> 🕹 Please click on "Roll your dice" button to play again. <br> 🔚Refresh the page if you want to change the mode or have a new player`;
    }
  }
};
