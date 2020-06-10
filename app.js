/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game




var currentScore,roundScore,totalScore,playerNumber,dice,rollBtn,holdBtn,switchPlayer;

playerNumber=0;

// switchPlayer();
console.log(playerNumber);

dice = document.querySelector('.dice');
dice.style.display='none';

document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;
document.getElementById('current-0').textContent=0;
document.getElementById('current-0').textContent=0;
roundScore=0;
totalScore=0;


rollBtn = document.querySelector('.btn-roll');
holdBtn = document.querySelector('.btn-hold');

rollBtn.addEventListener('click', roll);

holdBtn.addEventListener('click', upTotal);





function roll() {
    
    // Generate random current score
    currentScore = Math.floor( Math.random()*6+1 ) ;
    
    // display dice - on/off
    // roundScore update - null/add
    if (currentScore>1) {
        dice.style.display='block';
        dice.src='dice-'+currentScore+'.png';
        upRound();    

    } else {
        dice.style.display='none';   
        roundScore = 0;
        currentScore = 0;
        upRound();
        upTotal();
    }

    // Dice change

}


function upTotal() {
    totalScore=roundScore+totalScore;
    roundScore=0;
    currentScore=0;
    document.querySelector('#score-'+playerNumber).textContent = totalScore;
    upRound();
    switchPlayer();
}

function upRound() {
    roundScore=currentScore+roundScore;
    currentScore=0;
    document.querySelector('#current-'+playerNumber).textContent= roundScore ;

};


function switchPlayer() {
    // var currentPlayerStyle=document.querySelector('#score-'+playerNumber).style;

    document.querySelector('#score-'+playerNumber).style.color="red";
    document.querySelector('#score-'+playerNumber).style.fontWeight="100";
    if (playerNumber>0) {
        playerNumber=0;
    } else {
        playerNumber=1;
    }
    console.log("Active player: "+playerNumber);
    
    document.querySelector('#score-'+playerNumber).style.fontWeight="300";
    document.querySelector('#score-'+playerNumber).style.color="green";
    dice.style.display='none';   

    
}
*/

/* 
    

var dice,playerNumber,totalPlayers,total,round,current;

totalPlayers=2;
playerNumber = 0;
dice=document.querySelector('.dice')

total=round=current=0;

playerNameOf(playerNumber).textContent="shahzeb";
totalScoreOf(playerNumber).textContent="92";
roundScoreOf(playerNumber).textContent="11";
nextPlayer();

// functions to call the scores and names of player number x
// console.log(
//     'Player Name: '+ name(playerNumber).textContent, "\n" ,
//     'Round Score: '+ roundScore(playerNumber).textContent,"\n" ,
//     'Total Score: '+ totalScore(playerNumber).textContent,"\n" ,
//     'diceScore: '+ diceScore(),"\n",
//     );
    
    

    document.querySelector('.btn-new').addEventListener('click',newGame);
    document.querySelector('.btn-hold').addEventListener('click',hold);
    document.querySelector('.btn-roll').addEventListener('click',roll);




    function hold() {
        // update total score and nullify the round/current score
        total+=round;
        round=0;
        
        dice.style.display="none";

        console.log("\n"+"Player nummber: " + nextPlayer() + "\n\n");

        // playerNameOf(playerNumber).textContent="shahzeb";
        // totalScoreOf(playerNumber).textContent="92";
        roundScoreOf(playerNumber).textContent="15";
    }

    function newGame() {
        
    }
    

// roundScoreOf(1)="09";



    // Generates, Checks & changes image
    function roll(){
        // Random number
        var current = Math.floor(Math.random()*6)+1;        

        // check random and nullify random
        if (current>1) {
            dice.style.display = 'block';
            round+=current;
            // roundScoreOf(playerNumber) = round;
        } else {
            dice.style.display = 'none';
            current=0;

            round=0;
            // roundScoreOf(playerNumber)=round;
            hold();
        }

        // current=ranX;

        console.log(
            "Round score: "+ round
        );
        
        dice.src = 'dice-' + current + '.png';

    }









    // Fetch the current player name
    function playerNameOf(x) {
        return document.getElementById('name-'+x).textContent;
    }
    
    
    // Fetch the current player Round Score
    function roundScoreOf(x) {
        return document.getElementById('current-'+x).textContent;
    }
    
    
    // Fetch the current player Total Score
    function totalScoreOf(x) {
        return document.getElementById('score-'+x).textContent;
    }
    
    // Switch player
    function nextPlayer() {
        playerNumber +=1;
        if (playerNumber > totalPlayers || playerNumber === totalPlayers) {
            playerNumber=0;   
        }
        return playerNumber;
    }
    

     */

var round,total,activePlayer;
var gamePlaying;
var dice = document.querySelector('.dice');
var winningScore=18;
init();

// ON NEW GAME
document.querySelector('.btn-new').addEventListener('click',init)

// ON CLICK
document.querySelector('.btn-roll').addEventListener('click', roll)

// ON HOLD
document.querySelector(".btn-hold").addEventListener('click',hold)




    
function init(){
    round=0;
    total=[0,0];
    activePlayer=0
    gamePlaying=true;


    for(i=0;i<=1;i++){
        // document.getElementById("current-0").textContent=0;
        // document.getElementById("current-1").textContent=0;
        document.getElementById("current-"+i).textContent=0;
        // document.getElementById("score-0").textContent=0;
        // document.getElementById("score-1").textContent=0;
        document.getElementById("score-"+i).textContent=0;
        
        // document.getElementById("name-0").textContent="player "+1;
        // document.getElementById("name-1").textContent="player "+2;
        document.getElementById("name-"+i).textContent="player "+2;
        
        // document.querySelector(".player-0-panel").classList.remove("winner");
        // document.querySelector(".player-1-panel").classList.remove("winner");
        document.querySelector(".player-"+i+"-panel").classList.remove("winner");
        
        // document.querySelector(".player-0-panel").classList.remove("active");
        // document.querySelector(".player-1-panel").classList.remove("active");
        document.querySelector(".player-"+i+"-panel").classList.remove("active");

    }    
        
    document.querySelector(".player-0-panel").classList.add("active");

}




function roll() {
        
    if (gamePlaying) {
        
        // Random Number
        var current = Math.floor(Math.random()*6+1);

        // If Number >1 then:   
        if (current !== 1) {
            // Change & Display Dice
            dice.src = "dice-"+current+".png";
            dice.style.display = "block";
            
            // Round Update - ADD
            round+=current;
            document.getElementById("current-"+activePlayer).textContent=round;

            
        // If Number =1 then:   
        } else {

            // Hide Dice 
            dice.style.display="none";
            
            // Round Update - ZERO  
            round = 0;
            document.getElementById("current-"+activePlayer).textContent=round;

            // Changing Old Active Class
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            
            // Change Player
            activePlayer ===0 ? activePlayer=1 : activePlayer =0;
            
            // Changing New Active Class
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
        }
        
        // If Winner is available
        if ( (round+total[activePlayer]) >= winningScore ) {
            

            // totalUpdate()
            // total Update - Add score to global
            total[activePlayer] += round;
            document.getElementById("score-"+activePlayer).textContent=total[activePlayer]
            
            // Round Update 0  
            round = 0;
            document.getElementById("current-"+activePlayer).textContent=0;
 
            
            // Remove Active Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');

            // Add & Display Winner Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
            document.querySelector("#name-"+activePlayer).textContent="Winner";

            
            // Hide Dice 
            dice.style.display="none";
            
            // Stop Game
            gamePlaying=false;
            console.log("Stop!!!!!!");
        }
        
        
    }

}


function totalUpdate() {

    // total Update - Add score to global
    total[activePlayer] += round;
    document.getElementById("score-"+activePlayer).textContent=total[activePlayer]
    
    // Round Update 0  
    round = 0;
    document.getElementById("current-"+activePlayer).textContent=0;
}

function hold() {
        
    if (gamePlaying){
        
        
        // Hide Dice 
        dice.style.display="none";
        
        // totalUpdate()
        // total Update - Add score to global
        total[activePlayer] += round;
        document.getElementById("score-"+activePlayer).textContent=total[activePlayer]
        
        // Round Update 0  
        round = 0;
        document.getElementById("current-"+activePlayer).textContent=0;

        
        // If Winner is available
        if ( total[activePlayer] >= winningScore ) {
            
            // Remove Active Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');

            // Add & Display Winner Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
            document.querySelector("#name-"+activePlayer).textContent="Winner";

            // Stop Game
            gamePlaying=false;


        // If Winner is not available
        } else {
            
            // Changing Old Active Class
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            
            // Change Player
            activePlayer ===0 ? activePlayer=1 : activePlayer =0;
            
            // Changing New Active Class
            document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
            
        }

    }    

}
   