'use-strict';
//// Selecting Elements
const common = document.querySelector('.common');
const name1 = document.querySelector('.name1').value = 'PLAYER 1'; 
const name2 = document.querySelector('.name2').value = 'PLAYER 2';
const sc1 = document.querySelector('.sc1').textContent;
const sc2 = document.querySelector('.sc2').textContent;
const cl1 = document.querySelector('.cl1').textContent;
const cl2 = document.querySelector('.cl2').textContent;
const playAgain = document.querySelector('.playAgain');
const rollDice = document.querySelector('.rollDice');
const hold = document.querySelector('.hold');
const player1bg = document.querySelector('.player1bg');
const player2bg = document.querySelector('.player2bg');

//// Functions to change styles
const setLeftMargin = (cl, val) =>{document.querySelector(cl).style.marginLeft = val;}

const activateP1 = () =>{
    collected = 0;
    player1bg.style.opacity = '100%';
    player2bg.style.opacity = '50%';
    player1bg.style.background = 'rgba(255, 255, 255, 0.5)';
    player2bg.style.background = 'rgba(255, 255, 255, 0.0)';
}   //Sets focus on Player 1
const activateP2 = () =>{
    collected = 0;
    player2bg.style.opacity = '100%';
    player1bg.style.opacity = '50%';
    player2bg.style.background = 'rgba(255, 255, 255, 0.5)';
    player1bg.style.background = 'rgba(255, 255, 255, 0.0)';
}   //Sets focus on Player 2

//// Declaring Variables
let gameState = 0, scored1 = scored2 = collected = prev = 0, player = 1;
//Initial State   //collected //toCheck  //Active Player(either 1 or 2).

// Player Won.
const winEffect = (player) => {
    const player1name = document.querySelector('.name1').value;
    const player2name = document.querySelector('.name2').value;
    document.querySelector(`.player${player}bg`).style.background = 'rgba(255, 255, 255, 1)';
    document.querySelector(`.p${player}Box`).classList.add('hidden');
    document.querySelector(`.p${player}won`).classList.remove('hidden');

    document.querySelector(`.cl${player}`).classList.add('hidden');
    document.querySelector(`.cll${player}`).textContent = `${player == 1 ? player1name : player2name} Won the Game!`;
    document.querySelector(`.cll${player}`).style.color = '#D2001A';
    document.querySelector(`.cll${player}`).style.width = '35vw';
    setLeftMargin(`.cll${player}`, '-10vw');
    document.querySelector('.rollDice').classList.add('hidden');
    document.querySelector('.hold').classList.add('hidden');
    // cl1 = 'You Won';
}

playAgain.addEventListener('click', function(){
    if(gameState === 0){   //confirms game is in initial state.
        gameState = 1; //Sets game to Idle State.
        
        // Opens Actual GAME UI.
        playAgain.textContent = 'Play Again';
        common.style.width = '80vw';
        common.style.marginLeft = '0vw';
        document.querySelector('body').style.backgroundImage = 'url("./images/noise-transparent.png"), linear-gradient(90deg, #7623a7 10%, #8ff1e9, #8ff1e9, #7623a7 90%)';
        setLeftMargin('.player1bg', '0vw'); setLeftMargin('.controls', '0vw')
        player1bg.classList.remove('hidden'); player2bg.classList.remove('hidden');
        activateP1();
        document.querySelector('.dice').src= '';
        // Setting All to Zero.
        scored1 = scored2 = collected = prev = 0, player = 1;
        document.querySelector('.cl1').textContent = 0;
        document.querySelector('.cl2').textContent = 0;
        document.querySelector('.sc1').textContent = 0;
        document.querySelector('.sc2').textContent = 0;
    }
    else{
        // Reversing Everything to Initial State.
        scored1 = scored2 = collected = prev = 0, player = 1;
        document.querySelector('.cl1').textContent = 0;
        document.querySelector('.cl2').textContent = 0;
        document.querySelector('.sc1').textContent = 0;
        document.querySelector('.sc2').textContent = 0;
        document.querySelector('.dice').src= '';
        activateP1();
        document.querySelector('.name1').value = 'PLAYER 1';
        document.querySelector('.name2').value = 'PLAYER 2';
        document.querySelector(`.cll1`).textContent = 'Collected';
        document.querySelector(`.cll2`).textContent = 'Collected';
        document.querySelector(`.cll1`).style.color = '#FFFFFF';
        document.querySelector(`.cll2`).style.color = '#FFFFFF';

        document.querySelector(`.p1Box`).classList.remove('hidden');
        document.querySelector(`.p2Box`).classList.remove('hidden');
        document.querySelector(`.p1won`).classList.add('hidden');
        document.querySelector(`.p2won`).classList.add('hidden');
        document.querySelector(`.cl1`).classList.remove('hidden');
        document.querySelector(`.cl2`).classList.remove('hidden');
        setLeftMargin(`.cll1`, '0vw'); setLeftMargin(`.cll2`, '0vw');
        document.querySelector('.rollDice').classList.remove('hidden');
        document.querySelector('.hold').classList.remove('hidden');
    }
});

rollDice.addEventListener('click', () => {
    let roll = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').src=`./dice/dice-${roll}.png`;
        if(prev !== roll){
            if(player == 1){
                collected += roll; prev = roll;
                document.querySelector(`.cl${player}`).textContent = collected;                 
            }
            else{
                player = 2; collected += roll; prev = roll;
                document.querySelector(`.cl${player}`).textContent = collected; 
            }
        }
        else{
            prev = 0; collected = 0;
            player == 1 ? activateP2() : activateP1();
            player == 1 ? player = 2 : player = 1;
            document.querySelector(`.cl1`).textContent = collected;
            document.querySelector(`.cl2`).textContent = collected; 
        }
});

hold.addEventListener('click', () =>{
if(gameState == 1){
    if(player === 1){
        scored1 += collected;
        document.querySelector('.sc1').textContent = scored1;
        document.querySelector('.cl1').textContent = 0; 
        if(scored1 >= 100){ winEffect(player);}
        else{ activateP2(); player = 2; }
    }
    else{
        scored2 += collected;
        document.querySelector('.sc2').textContent = scored2;
        document.querySelector('.cl2').textContent = 0; 
        if(scored2 >= 100){ winEffect(player); }
        else{ activateP1(); player = 1; }
}}
});