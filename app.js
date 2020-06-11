/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/



var round,total,activePlayer;
var gamePlaying;
var dice = document.querySelector('.dice');
var winningScore=18;

init();


/* --------------------------- */
/* ---- Game Events ------ */
/* --------------------------- */
    

// ON NEW GAME
document.querySelector('.btn-new').addEventListener('click',init)

// ON CLICK
document.querySelector('.btn-roll').addEventListener('click', roll)

// ON HOLD
document.querySelector(".btn-hold").addEventListener('click',hold)



/* --------------------------- */
/* ---- Major Functions ------ */
/* --------------------------- */
    
function init(){
    round=0;
    total=[0,0];
    activePlayer=0
    gamePlaying=true;


    for(i=0;i<=1;i++){

        document.getElementById("current-"+i).textContent=0;

        document.getElementById("score-"+i).textContent=0;

        document.getElementById("name-"+i).textContent="player "+2;
        
        document.querySelector(".player-"+i+"-panel").classList.remove("winner");
        
        document.querySelector(".player-"+i+"-panel").classList.remove("active");

    }    
        
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

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

            // Changing Active Class & Active PLayer
            switchPlayer()
        }
        
        // If Winner is available
        if ( (round+total[activePlayer]) >= winningScore ) {
            

            totalUpdate();
            // // total Update - Add score to global
 
            
            // Remove Active Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove('active');

            // Add & Display Winner Class
            document.querySelector(".player-"+activePlayer+"-panel").classList.add('winner');
            document.querySelector("#name-"+activePlayer).textContent="Winner";

            
            // Hide Dice 
            dice.style.display="none";
            
            // Stop Game
            gamePlaying=false;
        }
        
        
    }

}


function hold() {
        
    if (gamePlaying){
        
        
        // Hide Dice 
        dice.style.display="none";
        
        totalUpdate();
        // // total Update - Add score to global

        
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
            
            // Changing Active Class & Active PLayer
            switchPlayer()
            
        }

    }    

}


/* --------------------------- */
/* ---- Mini Functions ------ */
/* --------------------------- */
    

function switchPlayer() {
    
    // Changing Old Active Class
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    
    // Change Player
    activePlayer ===0 ? activePlayer=1 : activePlayer =0;
    
    // Changing New Active Class
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');

}


function totalUpdate() {

    // total Update - Add score to global
    total[activePlayer] += round;
    document.getElementById("score-"+activePlayer).textContent=total[activePlayer]
    
    // Round Update 0  
    round = 0;
    document.getElementById("current-"+activePlayer).textContent=0;
}
