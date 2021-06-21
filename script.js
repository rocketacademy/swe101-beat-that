//global variables
var roll2Dice = 'Player starts to roll 2 dice';
var concatenateRandomDiceDigits = 'Player chooses Dice 1 or Dice 2 to be ordered first';
var gameMode = roll2Dice;
var userValue;
var dice1;
var dice2;
var playerNumber = 1;
var player1Value;
var player2Value;

// diceroll function 
var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var randomRoll = Math.floor(randomInteger) + 1;
  return randomRoll;
};

// roll 2 dice function
var roll2DiceFunction = function(){
    dice1 = rollDice();
    dice2 = rollDice();
    console.log('Dice1:' + dice1);
    console.log('Dice2:' + dice2);
    var myOutputValue =`Player ${playerNumber} rolled 2 dice! Dice 1 rolled a ${dice1} <br>Dice 2 rolled a ${dice2}. <br>Now, choose <b>Dice 1</b> or <b>Dice 2</b> for the first digit.`;
    return myOutputValue;
  };

// choose which dice value goes first
var createValue = function (input){
  
   if (input== 'Dice 1'){
     userValue = String(dice1)+String(dice2);
   } else if (input == 'Dice 2'){
     userValue = String(dice2)+String(dice1);
   };
   console.log ('uservalue:'+userValue);
   var myOutputValue = `Player ${playerNumber} chose ${input} to go first! Your value is ${userValue}!`;
   return myOutputValue;
};

var main = function (input) {
  if (gameMode == roll2Dice && playerNumber == 1){
    var tellUserTheyHaveRolled = roll2DiceFunction();
    gameMode = concatenateRandomDiceDigits;
  return tellUserTheyHaveRolled;
  }else if (gameMode == concatenateRandomDiceDigits && playerNumber == 1){
    var tellUserTheValueTheyCreated = createValue(input);
    gameMode = roll2Dice;
    playerNumber += 1;
    player1Value = userValue;
    return tellUserTheValueTheyCreated;
  }else if (gameMode == roll2Dice && playerNumber == 2){
    var tellUserTheyHaveRolled = roll2DiceFunction();
    gameMode = concatenateRandomDiceDigits;
  return tellUserTheyHaveRolled;
  }else if (gameMode == concatenateRandomDiceDigits && playerNumber == 2){
    var tellUserTheValueTheyCreated = createValue(input);
    gameMode = roll2Dice;
    playerNumber -=1;
     player2Value = userValue;

     if(player1Value>player2Value){
      return tellUserTheValueTheyCreated + ' Player 1 WINS as your value is more than Player 2!';
     }else if (player2Value>player1Value){
      return tellUserTheValueTheyCreated + ' Player 2 WINS as your value is more than Player 1!';
     };
    
  };
};
// player 2 roll
// player 2 choose 
// compare values, define output!