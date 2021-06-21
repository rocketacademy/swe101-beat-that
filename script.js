//There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

//declaring variables to be used throughout
var gameStep = 0;
var player1Array = [1, 0];
var player2Array = [2, 0];
var playerIsNumber = 1;
var myOutputValue = ``;
var mainDiceRoll1;
var mainDiceRoll2;
// random number generator
var randomDiceNumberGenerator = function () {
  // generating a number from 0 to 5 both inclusive
  var randomNumber = Math.floor(Math.random() * 6);
  //making the number 1 to 6 both inclusive
  var randomDiceNumber = randomNumber + 1;
  return randomDiceNumber;
};
//generating dice roll
var diceRoll = function () {
  var roll1 = randomDiceNumberGenerator();
  return roll1;
};
// function to insert value 1 or 2 into array position 0
// if i type in 1, roll1 should be in the array position 0, if i type in 2, roll2 should be in array position 2
//also added functionality such that it will change the array that is added based on the player number, i.e. if it's player 2's turn, it will change player 2's array
var insertArray = function (
  arrayPos,
  insertRoll1,
  insertRoll2,
  playerNumberInsert
) {
  // this will change p1's array
  if (playerNumberInsert == 1) {
    arrayPos = arrayPos - 1;
    if (arrayPos == 1) {
      //if array position is 1, i.e. the initial input can only be 2 (and the player wants to change)
      player1Array[0] = insertRoll2;
      player1Array[1] = insertRoll1;
    } else {
      //if array position isn't 1, i.e. the initial input isn't 2 (accounts for if they press submit and the player is okay with their current position)
      player1Array[0] = insertRoll1;
      player1Array[1] = insertRoll2;
    }
  } else if (playerNumberInsert == 2) {
    //this will change p2's array
    arrayPos = arrayPos - 1;
    if (arrayPos == 1) {
      //if array position is 1, i.e. the initial input can only be 2 (and the player wants to change)
      player2Array[0] = insertRoll2;
      player2Array[1] = insertRoll1;
    } else {
      //if array position isn't 1, i.e. the initial input isn't 2 (accounts for if they press submit and the player is okay with their current position)
      player2Array[0] = insertRoll1;
      player2Array[1] = insertRoll2;
    }
  }
};
// first message that the players see - it's the same for both p1 and p2.
var firstMessage = function (dice1, dice2, playerNumberFirstMsg) {
  return `Hello Player ${playerNumberFirstMsg}. <br><br> Your first roll is ${dice1}. <br> Your second roll is ${dice2}. <br>If you want the first roll be in front, just press Submit. <br> If you want the second roll to be first, enter 2. <br><br> Your current number is ${dice1}${dice2}`;
};
//second message that the players see - it's the same for both p1 and p2
var secondMessage = function (playerNumberSecondMsg) {
  if (playerNumberSecondMsg == 1) {
    return `Hello Player ${playerNumberSecondMsg}. <br> Your final number is ${player1Array[0]}${player1Array[1]}. It's Player 2's turn now!`;
  } else if (playerNumberSecondMsg == 2) {
    return `Hello Player ${playerNumberSecondMsg}. <br> Your final number is ${player2Array[0]}${player2Array[1]}. It's Player 1's turn now!`;
  }
};
//first step of the game where both dice are rolled
var gameFirstStep = function (mainDice1, mainDice2, playerNumberFirstStep) {
  // default message once player x presses submit
  var defaultMessage = firstMessage(
    mainDice1,
    mainDice2,
    playerNumberFirstStep
  );
  return defaultMessage;
};
//second step of the game where the player gets to input which value they wants to be first
var gameSecondStep = function (
  playerInput,
  playerNumberSecondStep,
  diceInsert1,
  diceInsert2
) {
  //game step 2 is when the player 1 has said which dice they wanna put first
  insertArray(playerInput, diceInsert1, diceInsert2, playerNumberSecondStep);
  var defaultMessage = secondMessage(playerNumberSecondStep);
  return defaultMessage;
};
// kinda useless, i wanted to create a function that would make the main function as clean as possible
var playerGameSequence = function (
  diceGameSeq1,
  diceGameSeq2,
  dicePos,
  playerNumberGameSeq
) {
  gameFirstStep(diceGameSeq1, diceGameSeq2, playerNumberGameSeq);
  gameSecondStep(dicePos, playerNumberGameSeq);
};
//compare who's tens are bigger. return player value if their tens are bigger
var isTensBigger = function () {
  if (player1Array[0] > player2Array[0]) {
    return 1;
  } else if (player1Array[0] == player2Array[0]) {
    return 0;
  } else {
    return 2;
  }
};
//compare who's ones are bigger. return player value if their ones are bigger
var isOnesBigger = function () {
  if (player1Array[1] > player2Array[1]) {
    return 1;
  } else if (player1Array[1] == player2Array[1]) {
    return 0;
  } else {
    return 2;
  }
};
// to see which player has the bigger number
var winCondition = function () {
  // if p1 tens is equal to p2 tens
  if (isTensBigger() == 0) {
    //return isOnesBigger. We can deterine the winner/draw from isOnesBigger
    return isOnesBigger();
  } else {
    //if tens is not equal, isTensBigger will return the winning player.
    return isTensBigger();
  }
};
// returns who wins or not
var winConditionStatement = function () {
  gameStep = 0;
  var winningPlayer = winCondition();
  if (winningPlayer != 0) {
    return `Congrats Player ${winningPlayer}!! You have won! <br><br> Player 1's number is ${player1Array[0]}${player1Array[1]}. <br> Player 2's number is ${player2Array[0]}${player2Array[1]}. <br><br> Would you like to play again?`;
  } else {
    return `It's a draw! Would you like to play again?`;
  }
};
var main = function (input) {
  if (playerIsNumber == 1) {
    if (gameStep == 0) {
      mainDiceRoll1 = diceRoll();
      mainDiceRoll2 = diceRoll();
      myOutputValue = gameFirstStep(
        mainDiceRoll1,
        mainDiceRoll2,
        playerIsNumber
      );
      gameStep = 1;
    } else if (gameStep == 1) {
      myOutputValue = gameSecondStep(
        input,
        playerIsNumber,
        mainDiceRoll1,
        mainDiceRoll2
      );
      playerIsNumber = 2;
      gameStep = 0;
    }
  } else if (playerIsNumber == 2) {
    if (gameStep == 0) {
      mainDiceRoll1 = diceRoll();
      mainDiceRoll2 = diceRoll();
      myOutputValue = gameFirstStep(
        mainDiceRoll1,
        mainDiceRoll2,
        playerIsNumber
      );
      gameStep = 1;
    } else if (gameStep == 1) {
      myOutputValue = gameSecondStep(
        input,
        playerIsNumber,
        mainDiceRoll1,
        mainDiceRoll2
      );
      playerIsNumber = 1;
      gameStep = 2;
    }
  }
  if (gameStep == 2) {
    myOutputValue = winConditionStatement();
  }
  return myOutputValue;
};
