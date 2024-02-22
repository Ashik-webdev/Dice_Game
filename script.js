'use strict';

// SELECTING ELEMENTS 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1'); 

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;  // TERNARY OPERATOR
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1. GENERATING A RANDOM DICE ROLL
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. DISPLAY DICE
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. CHECK FOR ROLLED 1: if true, switch to next player
        if(dice !== 1){
            //ADD DICE TO CURRENT SCORE
            /* currentScore = currentScore + dice; */
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener('click', function() {
    if(playing) {
        // 1. ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. CHECK IF PLAYER'S SCORE IS >= 50
        if(scores[activePlayer] >= 20) {
            // FINISH THE GAME
            playing = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            // SWITCH T0 THE NEXT PLAYER
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);