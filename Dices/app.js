
const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');

const totalScore0 = document.querySelector('.totalScore-0');
const totalScore1 = document.querySelector('.totalScore-1');

const score0 = document.querySelector('.score-0');
const score1 = document.querySelector('.score-1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let currentScore;
let activePlayer;
let score;
let playing;

const init = function () {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    totalScore0.textContent = 0;
    totalScore1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;

    dice.src = './img/dice-0.png';

    player0.classList.remove('player-winner');
    player1.classList.remove('player-winner');
    player1.classList.remove('player-active');

    player0.classList.add('player-active');
}

const roll = function () {
    if (playing) {
        const number = Math.trunc(Math.random() * 6) + 1;

        dice.src = `./img/dice-${number}.png`;

        if (number !== 1) {
            currentScore += number;
            document.querySelector(`.score-${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
}

const switchPlayer = function () {
    document.querySelector(`.score-${activePlayer}`).textContent = 0;
    currentScore = 0;

    // activePlayer = activePlayer === 0 ? 1 : 0;

    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    player0.classList.toggle('player-active');
    player1.classList.toggle('player-active');
}

const hold = function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.querySelector(`.totalScore-${activePlayer}`).textContent = score[activePlayer];
        if (score[activePlayer] >= 100) {
            playing = false;

            dice.src = './img/dice-0.png';

            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
        } else {
            switchPlayer();
        }
    }
}

init();

btnNew.addEventListener('click', init);
btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);