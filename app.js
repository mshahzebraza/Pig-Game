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
var winningScore=100;
var oldRollScore=0;
var current;


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

    
    // Hide Dice 
    diceToggle(0);  // dice.style.display="none";

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
        current = Math.floor(Math.random()*6+1);
        

        // DICE Repeat - old Score repeats
        if (oldRollScore===current) {
            
            diceToggle(0);      // Hide Dice

            totalUpdate(0);     // total=0 & update
            
            switchPlayer();     // Switch player
        }

        // NO DICE Repeat 
        else {

            // If Number >1 then:   
            if (current > 1) {

                // Change & Display Dice
                dice.src = "dice-"+current+".png";
                diceToggle(1);
                
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

            
        }

        // Old Score reset
        oldRollScore = current;
        
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
    // resetIfZero === 0 ? console.log("passed a zero xD") : console.log("passed a non-zero");
    
    
    // Round Update 0  
    roundUpdate(0);
}


// Accepts a truthy value to show dice
function diceToggle(truthyValueHere) {
    truthyValueHere ? dice.style.display="block": dice.style.display="none";
}

function roundUpdate(resetIfZero) {
    // increment for 'non-zero' and reset for '0'
    resetIfZero === 0 ? round = 0 : round += current;

    document.getElementById("current-"+activePlayer).textContent=round;    
}