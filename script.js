// some inspiration from: https://medium.com/front-end-hacking/create-simon-game-in-javascript-d53b474a7416

var game = {
  count: 0,
  colors: ['#red','#green', '#blue', '#yellow'],
  serie: [],
  myclicks: [],
  sound:{
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function newGame() {
  clearGame();
}

function clearGame() {
  game.serie = [];
  game.myclicks = [];
  game.count = 0;
  serieMove();
}

function serieMove() {
  game.count++;
  $('#lcd').text(game.count);
  var randomNum=Math.floor(Math.random() * 4);
  game.serie.push(game.colors[randomNum]);
  pcMoves()
}

function pcMoves() {
    var i = 0;
    var moves = setInterval(function(){
        playGame(game.serie[i]);
        i++;
        if (i >= game.serie.length) {
            clearInterval(moves);
        }
        }, 1000)
      
}

function playGame(theColor) {
  
  $(theColor).addClass('fade');
  var theColorStr= theColor.substring(1);
  game.sound[theColorStr].play();
  setTimeout(function(){
      $(theColor).removeClass('fade');
  }, 300);
}


function checkMove(myId){

      var myLoop=0;
      var myIdS = "#"+myId;
      game.myclicks.push(myIdS);
      $(myIdS).addClass('fade');
      game.sound[myId].play();
      setTimeout(function(){
          $(myIdS).removeClass();
      }, 300);
      checkResult();
  } 


function checkResult(){
  
  var a = game.myclicks.toString();
  var b = game.serie.toString();
  
  
  if (game.myclicks[game.myclicks.length-1]!==game.serie[game.myclicks.length-1]) {
    game.myclicks = [];
    $('#lcd').text('ERR!');
    
    if(game.strict){
      
     setTimeout(function(){
         clearGame();
     }, 3000);
    } else {
      
     setTimeout(function(){
         $('#lcd').text(game.count);
     }, 1000);
    }
    
  } else if (game.myclicks.length===game.serie.length) {
    game.myclicks = [];
    if(game.count===20){
      $('#lcd').text('WIN!');
      setTimeout(function(){
       newGame();
     }, 3000);
    } else {
     $('#lcd').text('ok!');
     setTimeout(function(){
        serieMove();
     }, 3000);
  }

  } 
}

function startLoop(){
  game.strict= false;
  newGame();
}
function startStrict(){
  game.strict= true;
  newGame();
}