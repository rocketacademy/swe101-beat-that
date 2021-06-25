//define vars
var indivisualDiceRoll;
var mode = `instructions`;
var playerNumber = 1;
var allValues = [];
var numberOfPlayer = 2;
var diceNumber = 2;
var whoPlays = `player`;
var winCondition = `highest value wins`;
var diceNumber = 2;
var allDiceRoll = [];
var currentDice = 1;

var main = function (input) {
  if (input == `instructions`) {
    return instruction();
  }
  if (input == `computer` || input == `player`) {
    whoPlays = input;
    return `Your player has been set to ${input}.Press submit to start the game. For any queries, enter 'instructions' and press submit.`;
  }

  if (input == `highest value wins` || input == `lowest value wins`) {
    winCondition = input;
    return `Your winning criteria has been set to ${input}.Press submit to start the game. For any queries, enter 'instructions' and press submit.`;
  }

  if (mode == `instructions`) {
    mode = `roll dice`;
    return instruction();
  }
  if (input == `player number` || input == `dice number`) {
    mode = input;
    return `Your mode has been set to ${input}. Please input the ${input} you want`;
  }
  if (mode == `player number`) {
    numberOfPlayer = input;
    return `The number of players have been set to ${numberOfPlayer}. Press submit to start the game. For any queries, enter 'instructions' and press submit.`;
  }
  if (mode == `dice number`) {
    diceNumber = input;
    return `The number of dice have been set to ${diceNumber}. Press submit to start the game. For any queries, enter 'instructions' and press submit.`;
  }
  console.log(1);
  while (playerNumber <= numberOfPlayer) {
    console.log(2);
    if (mode == `roll dice`) {
      console.log(3);
      while (currentDice <= diceNumber) {
        indivisualDiceRoll = diceRoll();
        allDiceRoll.push(indivisualDiceRoll);
        console.log(4);
        currentDice = currentDice + 1;
      }
      console.log(5);
      mode = `select order`;
      myOutputValue = diceRollMessage(playerNumber);
      allDiceRoll = [];
      currentDice = 1;
      return myOutputValue;
    }
    if (mode == `select order`) {
      console.log(diceNumber, allDiceRoll);
      allValues.push(Number(input));
      console.log(allValues);
      myOutputValue = selectOrderMessage(playerNumber, input);
      mode = `roll dice`;
      playerNumber = playerNumber + 1;
    }
  }
  if (winCondition == `highest value wins`) {
    return `The winner is player ${
      locationOfHighestValue(allValues) + 1
    } with a value of ${findHighestValueInArray(allValues)}`;
  }
  if (winCondition == `lowest value wins`) {
    return `The winner is player ${
      locationOfLowestValue(allValues) + 1
    } with a value of ${findLowestValueInArray(allValues)}`;
  }

  allValues = [];
  playerNumber = 1;
  console.log(locationOfHighestValue(allValues));
};
//dice roll function
var diceRoll = function () {
  var randomNumber = Math.random() * 6;
  var randomInteger = Math.ceil(randomNumber);
  return randomInteger;
};

//roll dice message
diceRollMessage = function (playerNumber) {
  var message = `Player ${playerNumber}: Your dice rolls are ${allDiceRoll}. Please key in your dice roll in the order you want.(eg if your dice roll are 2 and 3, please type in 23/32). Remember, ${winCondition}!`;
  return message;
};

//select order function

selectOrderMessage = function (playerNumber, input) {
  var message = `Player ${playerNumber}: Your value is ${input}. Player ${
    playerNumber + 1
  }, please click submit to roll your dice.`;
  return message;
};
//instructions function
instruction = function () {
  var message = ` By default, the number of players and number of dice that will be rolled has been set to 2.<br>The rules also follow the standard beat that. <br>If you would like to change any of these, please follow the instructions below.(if the changes made are successful, a message will appear)
    <br>To change the number of players: Type 'player number' and press sumbit. Next input the number of players you want before pressing submit again. 
    <br>To change the number of dices rolled: Type 'dice number' and press sumbit. Next input the number of dice you want before pressing submit again.
    <br> To change the mode: Enter either 'highest value wins' or 'lowest value wins'
    <br>To select the player/computer to be the one selecting the combination of numbers: Type 'computer' or 'player'`;

  return message;
};

findHighestValueInArray = function (arrayValue) {
  highestValue = Math.max(...arrayValue);
  return highestValue;
};

findLowestValueInArray = function (arrayValue) {
  highestValue = Math.min(...arrayValue);
  return highestValue;
};

locationOfHighestValue = function (arrayValue) {
  return arrayValue.indexOf(findHighestValueInArray(arrayValue));
};

locationOfLowestValue = function (arrayValue) {
  return arrayValue.indexOf(findLowestValueInArray(arrayValue));
};