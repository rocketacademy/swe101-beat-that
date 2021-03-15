// ######## MORE COMFORTABLE :  Knockout Mode.


// random number
function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}
// keep track of all the randomly rolled numbers. store it in an array.
function storeRolledNumbers(dices) {
  let diceRollArray = [];
  for (let i = 0; i < dices; i++) {
    let roll = rollDice(6);
    diceRollArray.push(roll);
  }
  return diceRollArray;
}

// this function is to generate largest number from random numbers automatically.
function autoGenNumber(rolledNumArray, gameMode) {
  let array = rolledNumArray;
  let finalNumber = 0;
  let length = array.length;
  for (let i = 0; array.length >= 1; i++) {
    if (gameMode == 'highest') {
      let max = Math.max.apply(null, array);
      finalNumber = finalNumber * 10 + max;
      console.log(finalNumber + ' final number');
      rolledNumArray = array.splice(array.indexOf(max), 1);
      console.log(array + ' array after splice');
    }
    else if (gameMode == 'lowest') {
      let smallest = Math.min.apply(null, array);
      console.log('smallest number: ' + smallest);
      finalNumber = finalNumber * 10 + smallest;
      console.log('final number: ' + finalNumber);
      rolledNumArray = array.splice(array.indexOf(smallest), 1);
      console.log(array + ' array after splice');
    }
  }
  return finalNumber;
}

function findWinner(totalScore, result) {
  let winner;
  let outPut;
  if (gameModeInput == 'lowest') {
    let minTotalScore = Math.min.apply(null, totalScore);
    for (let i = 0; i < totalScore.length; i++) {
      if (minTotalScore == totalScore[i]) {
        winner = i;
      }
    }
    winner = 'Player' + (winner + 1);

    outPut = result + `. <br>The winner is ${winner} with ${minTotalScore} score.<br> the scores are : ${totalScore.sort().reverse()}. <br>now ${winner} will play with next player `;
  }
  else if (gameModeInput == 'highest') {
    let maxTotalScore = Math.max.apply(null, totalScore);
    for (let i = 0; i < totalScore.length; i++) {
      if (maxTotalScore == totalScore[i]) {
        winner = i;
      }
    }
    winner = 'Player' + (winner + 1);
    outPut = result + `.  <br>The winner is ${winner} with ${maxTotalScore} score. <br> the scores are : ${totalScore.sort()}<br> now ${winner} will play with next player`;
  }
  return outPut;
}

// dafault mode at the start of the game.
let mode = 'num of players';
let numOfDice;
let rolledNumbers;
let numOfPlayers = 0;
let player1score = 0;
let player2score = 0;
let numOfRounds = 1;
let totalScore = [];
let gameModeInput;
let roundsInCurentGame = 0;
let playerNumber = 0;
let currentAvailablePlayer;
function main(input) {
  let result = 'enter number of dice you want to play with';
  if (mode == 'num of players') {
    numOfPlayers = input;
    currentAvailablePlayer = numOfPlayers;
    mode = 'num of dice';
    return 'number of players set. enter the number of dice.';
  }
  if (mode == 'num of dice') {
    numOfDice = input;
    mode = 'play';
    result = 'number of dice set.';
  }
  if (mode == 'play') {
    rolledNumbers = storeRolledNumbers(numOfDice);
    mode = 'auto order';
    result = ` here is the array of your rolled numbers ${rolledNumbers}`;
    return result + ' enter Game Mode (highest/lowest) to auto generate THE NUMBER.';
  }
  if (mode == 'auto order') {
    gameModeInput = input;
    let largestNumInArray = autoGenNumber(rolledNumbers, input);
    console.log(largestNumInArray + ' largest num in array');
    totalScore.push(largestNumInArray);
    console.log(totalScore);
    console.log(numOfRounds + ' num of rounds');
    console.log(totalScore + ' total score');
    let playerTotalNumber = totalScore[numOfRounds - 1];
    console.log(playerTotalNumber + ' player total number');
    playerNumber += 1;
    result = `score of last round ${largestNumInArray}.`;
  }

  roundsInCurentGame += 1;
  if (roundsInCurentGame == 2) {
    currentAvailablePlayer = Number(currentAvailablePlayer) - 1;
  }

  numOfRounds += 1;
  mode = 'num of dice';
  if (roundsInCurentGame == 2 && currentAvailablePlayer == 1) {
    console.log('this loop is running');
    let localizedResult = 'GAME OVER.';
    result = findWinner(totalScore, result);
    result = localizedResult + result;
    numOfRounds = 1;
    totalScore = [];
    mode = 'num of dice';
    playerNumber = 0;
  }
  else if (roundsInCurentGame == 2) {
    let localizedResult = 'ROUND OVER.'
    result = findWinner(totalScore, result);
    result = localizedResult + result;
    roundsInCurentGame = 0;
    totalScore = [];
    mode = 'num of dice';
  }

  return result;
}
