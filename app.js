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

roundUpdate();

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

        // Check Dual Number
        oldRollScore === current ? console.log("equal \t\t" + oldRollScore)  : console.log("not equal:\t"+ oldRollScore + "\t" +current);

        if (oldRollScore===current) {
            // Hide Dice
            // total=0 & update
            // round=0 & update
            // Switch player
        }

        // Update oldRollScore
        oldRollScore = current;
        




        // If Number >1 then:   
        if (current > 1) {
            // Change & Display Dice
            dice.src = "dice-"+current+".png";
            diceToggle(1);
            
            // Round Update - ADD
            // round+=current;
            // document.getElementById("current-"+activePlayer).textContent=round;
            roundUpdate();


            
        // If Number =1 then:   
        } else {

            // equate current (=1) to 0
            current=0;

            // Hide Dice 
            diceToggle(0);
            
            // Round Update - ZERO  
            // round = 0;
            // document.getElementById("current-"+activePlayer).textContent=round;
            roundUpdate(0);

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
            diceToggle(0);
            
            // Stop Game
            gamePlaying=false;
        }
        
        
    }

}


function hold() {
        
    if (gamePlaying){
        
        
        // Hide Dice 
        diceToggle(1)
        
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
    // round = 0;
    // document.getElementById("current-"+activePlayer).textContent=round;
    roundUpdate(0);
}


// Accepts a truthy value to show dice
function diceToggle(truthyValueHere) {
    truthyValueHere ? dice.style.display="block": dice.style.display="none";
}

function roundUpdate(resetIfZero) {
    // any =0 : round=0
    // any !0 : round+=current
    resetIfZero === 0 ? round = 0 : round += current;
    document.getElementById("current-"+activePlayer).textContent=round;    
}