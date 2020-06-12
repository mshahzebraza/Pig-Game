/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

- Challenge 3: Introduce another dice and only if one of the dice rolls to be one then round score gets reset.
*/



var round,total,activePlayer;
var gamePlaying;
var winningScore=100;
// var lastRollScore=0;
// var current;
var current1,current2;
// var dice = document.querySelector('.dice');
var dice1 = document.querySelector('.dice-1');
var dice2 = document.querySelector('.dice-2');

init();

// IMPORTANT

/* --------------------------- */
/* ---- Game Events ------ */
/* --------------------------- */


// ON NEW GAME
document.querySelector('.btn-new').addEventListener('click',init)

// ON CLICK
document.querySelector('.btn-roll').addEventListener('click', roll)

// ON HOLD
document.querySelector(".btn-hold").addEventListener('click',hold)

// ON CHANGING WINNING LIMIT
document.getElementById("winLim").addEventListener('input' /* 'change' */,updateWinLimit)


/* --------------------------- */
/* ---- Major Functions ------ */
/* --------------------------- */
    
function init(){
    round=0;
    total=[0,0];
    activePlayer=0
    gamePlaying=true;

    
    // Hide Dice 
    diceToggle(0);  // dice.style.display="none";

    for(i=0;i<=1;i++){

        document.getElementById("current-"+i).textContent=0;

        document.getElementById("score-"+i).textContent=0;

        document.getElementById("name-"+i).textContent="player "+(i+1);
        
        document.querySelector(".player-"+i+"-panel").classList.remove("winner");
        
        document.querySelector(".player-"+i+"-panel").classList.remove("active");

    }    
        
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

}


function roll() {
        
    if (gamePlaying) {
        
        // Random Number
        current1 = Math.floor(Math.random()*6+1);
        current2 = Math.floor(Math.random()*6+1);

        // Change Dice
        dice1.src = "dice-"+current1+".png";
        dice2.src = "dice-"+current2+".png";

        // If Number >1 then:   
        if (current1 > 1 && current2 > 1) {
            diceToggle(1);  // Toggle Dice Visibility
            roundUpdate(1); // Round Update - ADD
        } 

        // If Number =1 then:   
        else {

            // Hide Dice 
            diceToggle(0);
            
            // Round Update - ZERO  
            roundUpdate(0);

            // Changing Active Class & Active PLayer
            switchPlayer()
        }


       // If Winner is available
        if ( (round+total[activePlayer]) >= winningScore ) {
            
            // total Update - Add score to global
            totalUpdate();
        
            // Remove Active Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');

            // Add & Display Winner Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
            document.querySelector("#name-"+activePlayer).textContent="Winner";

            
            // Hide Dice 
            diceToggle(0);
            
            // Stop Game
            gamePlaying=false;
        }
        
        
    }

}


function hold() {
        
    if (gamePlaying){
        
        
        // Hide Dice 
        diceToggle(0)
        
        // total Update - Add score to global
        totalUpdate();

        
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
        } 
        else {
            
            // Changing Active Class & Active PLayer
            switchPlayer()
            
        }

    }    

}

function updateWinLimit() {
    this.value ? winningScore=this.value : winningScore=100; 
    // init();      // Optional : If you want to reset game for every new limit change
}

/* --------------------------- */
/* ---- Mini Functions ------ */
/* --------------------------- */
    

function switchPlayer() {
    
    // Removing Old Active Class
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    
    // Change Player
    activePlayer ===0 ? activePlayer=1 : activePlayer =0;
    
    // Adding New Active Class
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    

}


function totalUpdate(resetIfZero) {

    // add score for "non-zero" and reset for zero
    resetIfZero === 0 ? total[activePlayer] = 0 : total[activePlayer] += round;
    document.getElementById("score-"+activePlayer).textContent=total[activePlayer]    
    
    // Round Update 0  
    roundUpdate(0);
}


// Accepts a truthy value to show BOTH dice
function diceToggle(truthyValueHere) {
    // truthyValueHere ? dice.style.display="block": dice.style.display="none";

    // truthyValueHere ? dice1.style.display="block": dice1.style.display="none";
    // truthyValueHere ? dice2.style.display="block": dice2.style.display="none";

    truthyValueHere ? dice1.style.opacity="1": dice1.style.opacity=".2";
    truthyValueHere ? dice2.style.opacity="1": dice2.style.opacity=".2";
    
}

function roundUpdate(resetIfZero) {
    // increment for 'non-zero' and reset for '0'
    resetIfZero === 0 ? round = 0 : round += current1+current2;
    // resetIfZero === 0 ? round = 0 : round += current;

    document.getElementById("current-"+activePlayer).textContent=round;    

}