var playerNo = 1;
var gameMode = 'roll die';
var diceRoll1 = 0;
var diceRoll2 = 0;
var firstPlayerNo = 0;
var secondPlayerNo = 0;
var firstPlayerCumNo = 0;
var secondPlayerCumNo = 0;
var lowMode = '';

// dice roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// compare Player 1 and Player 2 numbers
var compareTwoNo = function (lowMode, firstPlayerCumNo, secondPlayerCumNo) {
  if (
    (lowMode == 'false' && firstPlayerCumNo > secondPlayerCumNo) ||
    (lowMode == 'true' && firstPlayerCumNo < secondPlayerCumNo)
  ) {
    message =
      'The running sum of Player 1 number is ' +
      firstPlayerCumNo +
      ' and the running sum of Player 2 number is ' +
      secondPlayerCumNo +
      '. Player 1 wins. The leaderboard is:<br>First place - Player 1 ' +
      firstPlayerCumNo +
      '<br>Second place - Player 2 ' +
      secondPlayerCumNo;
    return message;
  }
  if (
    (lowMode == 'false' && firstPlayerCumNo < secondPlayerCumNo) ||
    (lowMode == 'true' && firstPlayerCumNo > secondPlayerCumNo)
  ) {
    message =
      'The running sum of Player 1 number is ' +
      firstPlayerCumNo +
      ' and the running sum of Player 2 number is ' +
      secondPlayerCumNo +
      '. Player 2 wins. The leaderboard is:<br>First place - Player 2 ' +
      secondPlayerCumNo +
      '<br>Second place - Player 1 ' +
      firstPlayerCumNo;
    return message;
  }
  message =
    'The running sum of Player 1 number is ' +
    firstPlayerCumNo +
    ' and the running sum of Player 2 number is ' +
    secondPlayerCumNo +
    '. It is a draw. The leaderboard is:<br>Player 1 ' +
    firstPlayerCumNo +
    '<br>Player 2 ' +
    secondPlayerCumNo;
  return message;
};

var main = function (input) {
  var myOutputValue = '';
  // player rolls 2 die
  if (gameMode == 'roll die') {
    diceRoll1 = diceRoll();
    diceRoll2 = diceRoll();
    console.log('First dice ' + diceRoll1 + 'Second dice ' + diceRoll2);
    myOutputValue =
      'Welcome Player ' +
      playerNo +
      '. <br>You rolled ' +
      diceRoll1 +
      ' for Dice 1 and ' +
      diceRoll2 +
      ' for Dice 2. <br>Please choose your game mode next.';
    gameMode = 'pick high or low';
    return myOutputValue;
  }
  // player chooses if want the player with the lowest combined number to be the winner
  if (gameMode == 'pick high or low') {
    if (input != 'low' && input != 'high') {
      myOutputValue =
        'Please input "high" if the player with the highest combined number is the winner.<br>Please input "low" if the player with the lowest combined number is the winner.';
      return myOutputValue;
    }
    if (input == 'low') {
      lowMode = 'true';
      gameMode = 'pick first numeral';
      myOutputValue =
        'The player with the lowest combined number is the winner. Please choose the order of the dice.';
      return myOutputValue;
    }
    if (input == 'high') {
      lowMode = 'false';
      gameMode = 'pick first numeral';
      myOutputValue =
        'The player with the highest combined number is the winner. Please choose the order of the dice.';
      return myOutputValue;
    }
  }
  // player chooses the dice as first numeral
  if (gameMode == 'pick first numeral') {
    // default message to choose first numeral
    if (input != diceRoll1 && input != diceRoll2 && input != 'auto') {
      myOutputValue =
        'Please pick either ' +
        diceRoll1 +
        ' or ' +
        diceRoll2 +
        ' as the first numeral or type auto to auto-generate the highest combined number.';
      return myOutputValue;
    }
    // if Player 1 chooses first dice
    if (input == diceRoll1 && playerNo == 1) {
      firstPlayerNo = diceRoll1 * 10 + diceRoll2;
      firstPlayerCumNo = firstPlayerCumNo + firstPlayerNo;
      playerNo = 2;
      gameMode = 'roll die';
      myOutputValue =
        'Player 1, you chose Dice 1 first.<br>Your number is ' +
        firstPlayerNo +
        '.<br>It is now the turn of Player 2.';
      return myOutputValue;
    }
    // if Player 1 chooses second dice
    if (input == diceRoll2 && playerNo == 1) {
      firstPlayerNo = diceRoll2 * 10 + diceRoll1;
      firstPlayerCumNo = firstPlayerCumNo + firstPlayerNo;
      playerNo = 2;
      gameMode = 'roll die';
      myOutputValue =
        'Player 1, you chose Dice 2 first.<br>Your number is ' +
        firstPlayerNo +
        '.<br>It is now the turn of Player 2.';
      return myOutputValue;
    }
    // autogenerate for Player 1
    if (input == 'auto' && playerNo == 1) {
      if (
        (diceRoll1 > diceRoll2 && lowMode == 'false') ||
        (diceRoll1 < diceRoll2 && lowMode == 'true')
      ) {
        firstPlayerNo = diceRoll1 * 10 + diceRoll2;
      } else {
        firstPlayerNo = diceRoll2 * 10 + diceRoll1;
      }
      firstPlayerCumNo = firstPlayerCumNo + firstPlayerNo;
      playerNo = 2;
      gameMode = 'roll die';
      myOutputValue =
        'Player 1, you chose the computer to auto-choose.<br>Your number is ' +
        firstPlayerNo +
        '.<br>It is now the turn of Player 2.';
      return myOutputValue;
    }
    // if Player 2 chooses first dice
    if (input == diceRoll1 && playerNo == 2) {
      secondPlayerNo = diceRoll1 * 10 + diceRoll2;
      secondPlayerCumNo = secondPlayerCumNo + secondPlayerNo;
      playerNo = 1;
      gameMode = 'roll die';
      myOutputValue =
        'Player 2, you chose Dice 1 first.<br>Your number is ' +
        secondPlayerNo +
        '.<br>' +
        compareTwoNo(lowMode, firstPlayerCumNo, secondPlayerCumNo);
      return myOutputValue;
    }
    // if Player 2 chooses second dice
    if (input == diceRoll2 && playerNo == 2) {
      secondPlayerNo = diceRoll2 * 10 + diceRoll1;
      secondPlayerCumNo = secondPlayerCumNo + secondPlayerNo;
      playerNo = 1;
      gameMode = 'roll die';
      myOutputValue =
        'Player 2, you chose Dice 2 first.<br>Your number is ' +
        secondPlayerNo +
        '.<br>' +
        compareTwoNo(lowMode, firstPlayerCumNo, secondPlayerCumNo);
      return myOutputValue;
    }
    // autogenerate for Player 2
    if (input == 'auto' && playerNo == 2) {
      if (
        (diceRoll1 > diceRoll2 && lowMode == 'false') ||
        (diceRoll1 < diceRoll2 && lowMode == 'true')
      ) {
        secondPlayerNo = diceRoll1 * 10 + diceRoll2;
      } else {
        secondPlayerNo = diceRoll2 * 10 + diceRoll1;
      }
      secondPlayerCumNo = secondPlayerCumNo + secondPlayerNo;
      playerNo = 1;
      gameMode = 'roll die';
      myOutputValue =
        'Player 2, you chose the computer to auto-choose.<br>Your number is ' +
        secondPlayerNo +
        '.<br>' +
        compareTwoNo(lowMode, firstPlayerCumNo, secondPlayerCumNo);
      return myOutputValue;
    }
  }
  return myOutputValue;
};
