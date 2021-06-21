var mode = 'highest'
var gameMode='dice roll'
var diceNumberPlayer1=[]
var diceNumberPlayer2=[]
var currPlayer=1
var concastenateNumber1=``
var concastenateNumber2=``
var concastenateNumberPlayer1=[]
var concastenateNumberPlayer2=[]
var player1NumberWin=0
var player2NumberWin=0
var main = function (input) {
  if(input=='highest'){
    mode='highest'
    return `highest mode, player with the highest combined number is the winner`
  }
  if(input=='lowest'){
    mode='lowest'
     return `lowest mode, player with the lowest combined number is the winner`
  }
  if(mode=='highest'){
    if(gameMode=='dice roll'){
    gameMode='concastenate'
    return diceRollMode()
  }
  if(gameMode=='concastenate'){
  return concastenateModeHighest(input)
  }
  if(gameMode=='result'){
    return resultHighest()
  }
  }
   if(mode=='lowest'){
    if(gameMode=='dice roll'){
    gameMode='concastenate'
    return diceRollMode()
  }
  if(gameMode=='concastenate'){
  return concastenateModeLowest(input)
  }
  if(gameMode=='result'){
    return resultLowest()
  }
  }
  
};

var diceRoll=function(){
  var randomInteger=Math.ceil(Math.random()*6)
  return randomInteger
}
var diceRollMode=function(){
  var counter=0
  if(currPlayer==1){
  while(counter<2){
    diceNumberPlayer1.push(diceRoll())
    counter+=1
  }
   return `Welcome Player ${currPlayer}.
<br>You rolled ${diceNumberPlayer1[0]} for Dice 1 and ${diceNumberPlayer1[1]} for Dice 2.
<br>Choose the order of the dice by inputting either 1 or 2, input 3 for auto generate lowest or highest combine number.`
}
if(currPlayer==2){
  while(counter<2){
    diceNumberPlayer2.push(diceRoll())
    counter+=1
  }
   return `Welcome Player ${currPlayer}.
<br>You rolled ${diceNumberPlayer2[0]} for Dice 1 and ${diceNumberPlayer2[1]} for Dice 2.
<br>Choose the order of the dice by inputting either 1 or 2, input 3 for auto generate lowest or highest combine number.`
}
}
//highest mode function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

var concastenateModeHighest=function(input){
  concastenateNumber1= Number(String(diceNumberPlayer1[0])+String(diceNumberPlayer1[1]))
  concastenateNumber2= Number(String(diceNumberPlayer1[1])+String(diceNumberPlayer1[0]))
  concastenateNumber3= Number(String(diceNumberPlayer2[0])+String(diceNumberPlayer2[1]))
  concastenateNumber4= Number(String(diceNumberPlayer2[1])+String(diceNumberPlayer2[0]))
  var userPick=Number(input)
if(currPlayer==1){
  currPlayer=2
  gameMode='dice roll'
  if(userPick==1){
    concastenateNumberPlayer1.push(concastenateNumber1)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
  if(userPick==2){
     concastenateNumberPlayer1.push(concastenateNumber2)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
if(userPick==3){
  if(diceNumberPlayer1[0]>=diceNumberPlayer1[1]){
    concastenateNumberPlayer1.push(concastenateNumber1)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
  }
  if(diceNumberPlayer1[1]>=diceNumberPlayer1[0]){
     concastenateNumberPlayer1.push(concastenateNumber2)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
  }
}
}
if(currPlayer==2){
  gameMode='result'
  if(userPick==1){
    concastenateNumberPlayer2.push(concastenateNumber3)
    return `Player 2, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
  if(userPick==2){
    concastenateNumberPlayer2.push(concastenateNumber4)
    return `Player 2, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
if(userPick==3){
  if(diceNumberPlayer2[0]>=diceNumberPlayer2[1]){
    concastenateNumberPlayer2.push(concastenateNumber3)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer2[0]}.<br>Click submit to determine the result`
  }
  if(diceNumberPlayer2[1]>=diceNumberPlayer2[0]){
     concastenateNumberPlayer2.push(concastenateNumber4)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer2s[0]}.<br>Click submit to determine the result`
  }
}
}
}
var resultHighest = function(){
  gameMode='dice roll'
  currPlayer=1
  console.log(concastenateNumberPlayer1,concastenateNumberPlayer2)
  if(concastenateNumberPlayer1[0]>concastenateNumberPlayer2[0]){
    player1NumberWin+=1
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    if(player1NumberWin>player2NumberWin){
      return `Player 1 win yay<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `Player 1 win yay<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `Player 1 win yay<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
  }
  if(concastenateNumberPlayer1[0]<concastenateNumberPlayer2[0]){
    player2NumberWin+=1
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
     if(player1NumberWin>player2NumberWin){
      return `Player 2 win yay<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `Player 2 win yay<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `Player 2 win yay<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
  }
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    if(player1NumberWin>player2NumberWin){
      return `draw<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `draw<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `draw<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
}
// lowest number mode
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var concastenateModeLowest=function(input){
  concastenateNumber1= Number(String(diceNumberPlayer1[0])+String(diceNumberPlayer1[1]))
  concastenateNumber2= Number(String(diceNumberPlayer1[1])+String(diceNumberPlayer1[0]))
  concastenateNumber3= Number(String(diceNumberPlayer2[0])+String(diceNumberPlayer2[1]))
  concastenateNumber4= Number(String(diceNumberPlayer2[1])+String(diceNumberPlayer2[0]))
  var userPick=Number(input)
if(currPlayer==1){
  currPlayer=2
  gameMode='dice roll'
  if(userPick==1){
    concastenateNumberPlayer1.push(concastenateNumber1)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
  if(userPick==2){
     concastenateNumberPlayer1.push(concastenateNumber2)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
}
  if(userPick==3){
  if(diceNumberPlayer1[0]<=diceNumberPlayer1[1]){
    concastenateNumberPlayer1.push(concastenateNumber1)
    return `Player 1, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
  }
  if(diceNumberPlayer1[0]>=diceNumberPlayer1[1]){
     concastenateNumberPlayer1.push(concastenateNumber2)
    return `Player 1, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer1[0]}.<br>It is now Player 2's turn`
  }
}
}
if(currPlayer==2){
  gameMode='result'
  if(userPick==1){
    concastenateNumberPlayer2.push(concastenateNumber3)
    return `Player 2, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
  if(userPick==2){
    concastenateNumberPlayer2.push(concastenateNumber4)
    return `Player 2, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer2[0]}.Click submit to determine the result`
}
  if(userPick==3){
  if(diceNumberPlayer2[0]<=diceNumberPlayer2[1]){
    concastenateNumberPlayer2.push(concastenateNumber3)
    return `Player 2, you chose Dice 1 first.<br>Your number is ${concastenateNumberPlayer2[0]}.<br>Click submit to determine the result`   
  }
  if(diceNumberPlayer2[0]>=diceNumberPlayer2[1]){
     concastenateNumberPlayer2.push(concastenateNumber4)
    return `Player 2, you chose Dice 2 first.<br>Your number is ${concastenateNumberPlayer2[0]}.<br>Click submit to determine the result`
  }
}
}
}
var resultLowest = function(){
  gameMode='dice roll'
  currPlayer=1
  console.log(concastenateNumberPlayer1,concastenateNumberPlayer2)
  if(concastenateNumberPlayer1[0]<concastenateNumberPlayer2[0]){
    player1NumberWin+=1
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    if(player1NumberWin>player2NumberWin){
      return `Player 1 win yay<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `Player 1 win yay<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `Player 1 win yay<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
  }
  if(concastenateNumberPlayer1[0]>concastenateNumberPlayer2[0]){
    player2NumberWin+=1
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
     if(player1NumberWin>player2NumberWin){
      return `Player 2 win yay<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `Player 2 win yay<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `Player 2 win yay<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
  }
    diceNumberPlayer1=[]
    diceNumberPlayer2=[]
    concastenateNumberPlayer1=[]
    concastenateNumberPlayer2=[]
    if(player1NumberWin>player2NumberWin){
      return `draw<br>1. Player 1 win :${player1NumberWin}<br>2. Player 2 win :${player2NumberWin}`
    }
    if(player1NumberWin<player2NumberWin){
      return `draw<br>1. Player 2 win :${player2NumberWin}<br>2. Player 1 win :${player1NumberWin}`
    }
    return `draw<br>1. Player 2 win :${player2NumberWin}<br>1. Player 1 win :${player1NumberWin}`
}
