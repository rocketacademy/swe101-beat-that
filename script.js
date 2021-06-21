//input = Username1, roll 2 dice, order of guess (dice1 or dice2)
//output = Username1, output 2 guesses ... username2, output 2 guesses + outcome (who wins/lose)

var gameMode = "enter username";
var username = "";
var myOutputValue = "";
var winTrackerP1 = 0;
var winTrackerP2 = 0;
var numberOfTries = 0;

var rollDice = function () {
  var randomNumber = Math.floor(Math.random() * 7);
  return randomNumber;
};

var main = function (input) {
  var myOutputValue = "‼ Invalid Entry ‼";
  if (gameMode == "enter username") {
    console.log("username entered");
    username = input;
    gameMode = "game start";
    myOutputValue = `Welcome ${username} 👋, <br><br> Please press Submit to roll Dice. `;
    console.log("dice game starts");
    return myOutputValue;
  }
  if (gameMode == "game start") {
    gameMode = "choose dice";
    diceOne = rollDice();
    diceTwo = rollDice();
    dicePlayerOne = "" + diceOne + diceTwo;
    myOutputValue = `Dice 1 rolled ${diceOne} and Dice 2 rolled ${diceTwo}. <br><br> Please choose order of dice guess by inputting 'Dice 1' or 'Dice 2' as the first dice.`;
    console.log("2 dice rolled" + diceOne + diceTwo + dicePlayerOne);
    return myOutputValue;
  }

  if (gameMode == "choose dice" && input == "Dice 1") {
    dicePlayerOne = "" + diceOne + diceTwo;
    myOutputValue = `${username} have chosen Dice 1 to go first. <br><br>Your number is ${dicePlayerOne}. <br><br> It is now Player Two's turn. 😁 <br><br> Please press submit to continue.`;
    gameMode = "player 2";
    console.log("player 1 choose dice 1 first order" + diceOne + diceTwo);
    return myOutputValue;
  }
  if (gameMode == "choose dice" && input == "Dice 2") {
    dicePlayerOne = "" + diceTwo + diceOne;
    myOutputValue = `${username} have chosen Dice 2 to go first. <br><br> Your number is ${dicePlayerOne}. It is now Player Two's turn. 😁 <br><br> Please press submit to continue.`;
    gameMode = "player 2";
    console.log("player 1 choose dice 2 first order" + diceTwo + diceOne);
    return myOutputValue;
  }

  if (gameMode == "player 2") {
    diceOne = rollDice();
    diceTwo = rollDice();
    dicePlayerTwo = "" + diceOne + diceTwo;
    if (dicePlayerTwo < dicePlayerOne) {
      winTrackerP1 += 1;
      numberOfTries += 1;
      myOutputValue = `Player 2 rolled ${dicePlayerTwo} <br><br> ${username} won! 🏆✨ <br><br> ${username}'s guess of ${dicePlayerOne} is greater than ${dicePlayerTwo}. <br><br> ${username}: ${winTrackerP1} wins. <br> Player 2: ${winTrackerP2}. <br> Number of tries: ${numberOfTries} <br><br> Press submit to play again! 😊 `;
    } else {
      winTrackerP2 += 1;
      numberOfTries += 1;
      myOutputValue = `Player 2 rolled ${dicePlayerTwo} <br><br> ${username} lost! 😒😪 <br><br> ${username}'s guess of ${dicePlayerOne} is lesser than ${dicePlayerTwo}. <br><br> ${username}: ${winTrackerP1} wins. <br> Player 2: ${winTrackerP2}. <br> Number of tries: ${numberOfTries} <br><br> Don't give up! Press submit to try again! 💪🏻😁`;
    }
  }
  return myOutputValue;
};
