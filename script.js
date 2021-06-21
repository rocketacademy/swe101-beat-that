// Temporary array to store individual dice rolls 1 & 2 for each round
var diceArray = [];
// Array to collect players' scores for all rounds
var player1_score = [];
var player2_score = [];
// Variable for game modes
var gameMode = "player 1";
// Variable for default output value
var myOutputValue = "Hello, this game is for 2 players. Player 1 and 2 will take turns. Player 1 goes first - click submit to roll 2 dice.";


var rollDice = function(i) {
  var randNum = Math.random() * (i+1);
  var randNumber = Math.floor(randNum);
  return randNumber;
}

var generateNumber = function(input) {
  var index = Math.abs(1-input);
  // Set the number of the chosen dice as the first number
  var firstNum = diceArray[index];
  console.log(diceArray);
  console.log("Number to go first");
  console.log(firstNum);

  // Set the number of the other dice as the second number
  var secondNum = diceArray[Math.abs(index-1)];
  console.log("Number to go second");
  console.log(secondNum);

  // Concatenate the numbers into a string
  var numbersAsString = "" + firstNum + secondNum;
  console.log("Concatenated numbers to string");
  console.log(numbersAsString);

  //Convert the string to a number 
  var numberResult = Number(numbersAsString);
  
  return numberResult;
}

var scoreMessage = function(array1, array2) {
  var message = "";
  var score1 = 0;
  var score2 = 0;
  var i = 0;
  
  // Accumulate scores for player 1
  console.log("Counting score for player 1..")
  
  while (i < array1.length) {
    score1 = score1 + array1[i];
    i += 1;
  }
  console.log(score1);

  //Reset index
  i = 0;
  //Accumulate scores for player 2 
  console.log("Counting score for player 2..")
  
  while (i < array2.length) {
    score2 = score2 + array2[i];
    i += 1;
  }
  console.log(score2);
  
  message = `Player 1's results: ${array1}. Total score: ${score1}<br> Player 2's results: ${array2}. Total score ${score2}<br>`

  if (score1 == score2) {
    return message + "It is a draw.";
  }
  if (score1 > score2) {
    return message + "Player 1 wins!";
  }
  if (score1 < score2) {
    return message + "Player 2 wins!";
  }
}

var main = function (input) {
  //Mode 1: player 1 
    //roll dice twice and store both dicerolls in an array
  if (gameMode == "player 1") {
    var index = 0;
    while (index < 2) {
      //Roll the ith dice 
      console.log(`Rolling dice ${index + 1}...`)
      
      diceArray.push(rollDice(6));
      console.log(diceArray);
      index += 1;
    }
    console.log("")
    console.log(diceArray);
    
    gameMode = "dice order1";

    myOutputValue = `Welcome Player 1.<br>You rolled ${diceArray[0]} for Dice 1 and ${diceArray[1]} for Dice 2.<br>Choose the order of the dice by entering which dice goes first - 1 or 2. For example, by entering 2, you are choosing to place the second dice roll first, followed by the first dice roll.`;
    return myOutputValue;
  }

  if (gameMode == "dice order1") {
    // If user input is valid (eithr 1 or 2)
    if (Number(input) == 1 || Number(input) == 2) {
      //
      var numberResult = generateNumber(input);
      
      // Push number to score board
      player1_score.push(numberResult);
      console.log("Player 1 scores");
      console.log(player1_score);
      console.log("String to number");
      console.log(numberResult);

      // Reset temporary diceArray for player 2
      diceArray = [];

      // Update gamemode to player 2
      gameMode = "player 2";
      console.log("** Next game mode: player 2 **");
      console.log(gameMode);

      myOutputValue = `Player 1, you chose Dice ${input} first.<br> Your number is ${numberResult}.<br> Next, it's Player 2's turn! Player 2, hit the submit button to roll 2 dices.`;      
      return myOutputValue;
    }

    // Else, if user input is not valid 
    console.log("Invalid input. Prompt user to reenter 1 or 2");
    myOutputValue = "Please enter either 1 or 2";
    return myOutputValue;
  }

  //Mode 2: player 2
    //roll dice twice and store both dicerolls in an array
    if (gameMode == "player 2") {
      var index = 0;
      while (index < 2) {
        //Roll the ith dice 
        console.log(`Rolling dice ${index + 1}...`)
        
        diceArray.push(rollDice(6));
        console.log(diceArray);
        index += 1;
      }
      console.log("")
      console.log(diceArray);
      
      gameMode = "dice order2";
  
      myOutputValue = `Welcome Player 2.<br>You rolled ${diceArray[0]} for Dice 1 and ${diceArray[1]} for Dice 2.<br>Choose the order of the dice by entering which dice goes first - 1 or 2. For example, by entering 2, you are choosing to place the second dice roll first, followed by the first dice roll.`;
      return myOutputValue;
    }
  
    if (gameMode == "dice order2") {
      // If user input is valid (either 1 or 2)
      if (Number(input) == 1 || Number(input) == 2) {
        //
        var numberResult = generateNumber(input);
        
        // Push number to score board
        player2_score.push(numberResult);
        console.log("Player 2 scores");
        console.log(player2_score);
        console.log("String to number");
        console.log(numberResult);
  
        // Reset temporary diceArray for player 1
        diceArray = [];
  
        // Update gamemode to player 1
        gameMode = "player 1";

        // Generate score message with the ScoreMessage function
        var scoreMsg = scoreMessage(player1_score, player2_score);

        myOutputValue = `Player 2, you chose Dice ${input} first.<br>Your number is ${numberResult}.<br>`;      
        return myOutputValue + scoreMsg + "<br><br> To keep playing, hit the submit button for Player 1's turn next. ";
      }
  
      // Else, if user input is not valid 
      console.log("Invalid input. Prompt user to reenter 1 or 2");
      myOutputValue = "Please enter either 1 or 2";
      return myOutputValue;
    }

  return myOutputValue;
};
