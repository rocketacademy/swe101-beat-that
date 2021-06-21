// First time main function runs, playerOneMode runs
// {both dice results are saved into an array (1st input - click to roll dice)
// user inputs either A or B to choose first or second dice (2nd input - select dice)
// output returns combined result(this is done by forcing them into strings using the googled method) - Once this condition is fulfilled, result is saved in a second array, and Global Variables are reset, together with first array collection.
// Repeat steps 1 to 4, and compare the results

//Googled Method
//______________
// var a = 5;
// var b = 6;
// console.log("" + a + b);

// OR

// const numbersAsString = `${5}${6}`;

//______________
var playerOneRolls = [];
var playerTwoRolls = [];
var comparisonArray = [];
//______________
var playerOneMode = 1;
var playerOneChoiceMode = 0;
var playerTwoMode = 0;
var playerTwoChoiceMode = 0;
var declareMode = 0;
var resetMode = 0;
//______________
var p1ChoiceA;
var p1ChoiceB;
var p2ChoiceA;
var p2ChoiceB;
var p1Final;
var p2Final;

var diceRoll = function () {
  var randomDecimalNumber = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimalNumber);
  return randomInteger;
};

var p1RollSpell = function () {
  var p1Results = diceRoll();
  playerOneRolls.push(p1Results);
  p1Results = diceRoll();
  playerOneRolls.push(p1Results);
  return playerOneRolls;
};
var p2RollSpell = function () {
  var p2Results = diceRoll();
  playerTwoRolls.push(p2Results);
  p2Results = diceRoll();
  playerTwoRolls.push(p2Results);
  return playerTwoRolls;
};
var castCombineNumberSpell = function (input) {
  if (playerOneChoiceMode == 1) {
    p1num1 = playerOneRolls[0];
    p1num2 = playerOneRolls[1];
    p1ChoiceA = "" + p1num1 + p1num2;
    p1ChoiceB = "" + p1num2 + p1num1;
    if (input == "A") {
      var spellResult = p1ChoiceA;
    }
    if (input == "B") {
      var spellResult = p1ChoiceB;
    }
  }
  if (playerTwoChoiceMode == 1) {
    p2num1 = playerTwoRolls[0];
    p2num2 = playerTwoRolls[1];
    p2ChoiceA = "" + p2num1 + p2num2;
    p2ChoiceB = "" + p2num2 + p2num1;
    if (input == "A") {
      var spellResult = p2ChoiceA;
    }
    if (input == "B") {
      var spellResult = p2ChoiceB;
    }
  }
  return spellResult;
};

// ____________________________________Main Function Begins Here______________________________________________
var main = function (input) {
  var myOutputValue = "Default Answer 1";
  if (declareMode == 1) {
    p1Final = comparisonArray[0];
    p2Final = comparisonArray[1];
    console.log("comparisonArray: " + p1Final + p2Final);

    if (p1Final > p2Final) {
      myOutputValue = "Player One is the Winner!";
      console.log("p1Final:" + p1Final);
    }
    if (p1Final < p2Final) {
      myOutputValue = "Player Two is the Winner!";
      console.log("p2Final:" + p2Final);
    }
    if (p1Final == p2Final) {
      myOutputValue = "Draw!";
    }
    return myOutputValue;
  }
  if (playerTwoChoiceMode == 1) {
    var finalP2Answer = castCombineNumberSpell(input);
    comparisonArray.push(finalP2Answer);
    myOutputValue =
      "You have chosen: " +
      finalP2Answer +
      "<br><br> The next click will declare the winner of the game";
    playerTwoChoiceMode = 0;
    playerTwoMode = 0;
    playerOneChoiceMode = 0;
    playerOneMode = 0;
    declareMode = 1;
  }
  if (playerTwoMode == 1) {
    var p2Results = p2RollSpell();
    myOutputValue =
      p2Results +
      "<br> <br> Please enter (A) for dice 1-2 combination, or (B) for dice 2-1 combination";
    playerTwoChoiceMode = 1;
    playerTwoMode = 0;
  }
  if (playerOneChoiceMode == 1) {
    var finalP1Answer = castCombineNumberSpell(input);
    playerOneChoiceMode = 0;
    playerOneMode = 0;
    comparisonArray.push(finalP1Answer);

    myOutputValue =
      "You have chosen: " +
      finalP1Answer +
      "<br><br> The next click will roll for player 2";
    playerTwoMode++;
    console.log("playerTwoChoiceMode:" + playerTwoChoiceMode);
    console.log("playerTwoMode: " + playerTwoMode);
  }
  if (playerOneMode == 1) {
    var p1Results = p1RollSpell();
    playerOneChoiceMode = 1;
    playerOneMode = 0;
    myOutputValue =
      p1Results +
      "<br> <br> Please enter (A) for dice 1-2 combination, or (B) for dice 2-1 combination";
  }
  return myOutputValue;
};
