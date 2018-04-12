let randomTime = Math.floor(Math.random() * (8000 - 2000) + 2000);
let bod = document.getElementById('bod');
let start = document.getElementById('startbutton');
let msg = document.getElementById('msg');
let gameOver = false;
let roundStart = false;
let roundCounter = 1;
let playerOnePt = 0;
let playerTwoPt = 0;
let startSound = new Audio('start.wav');
let startBg = new Audio('startbg.mp3');
let fStart = new Audio('false.wav');
let ptGet = new Audio('point.wav');
let bG = new Audio('bg.mp3');
let win = new Audio('win.wav');
let end = new Audio('end.mp3');
let nex = new Audio('alert.wav');
let bugFix = '';
let p1buts = [81,87,69,82,65,83,68,70]
let p2buts = [85,73,79,80,72,74,75,76]
let p1Char = ['Q','W','E','R','A','S','D','F']
let p2Char = ['U','I','O','P','H','J','K','L']
let randomI = Math.floor(Math.random()*(8-1)+1)
let randomI2 = Math.floor(Math.random() * (8 - 1) + 1)

//This function generates the restart button at end of game
let genEndButton = () => {
    let restartButton = document.createElement('button');
    restartButton.className='gameButton';
    bod.appendChild(restartButton);
    restartButton.innerText = 'RESTART GAME';
    restartButton.addEventListener('click', () => {
        location.reload();
    })
}

//This function creates a button to proceed to the next round... generates new randomTime and clearTimeout id???
let genNextButton = () => {
    let nextButton = document.createElement('button');
    nextButton.className='gameButton';
    nextButton.innerText = '  ROUND ' + roundCounter + ' GO';
    bod.appendChild(nextButton);
    nextButton.addEventListener('click', () => {
        randomTime = Math.floor(Math.random() * (8000 - 2000) + 2000);
        randomI = Math.floor(Math.random() * (8 - 1) + 1)
        randomI2 = Math.floor(Math.random() * (8 - 1) + 1)
        startRound();
        falseStart();
        setTimeout(startGame, randomTime);
        bod.removeChild(nextButton);
    })
}

//Creates listeners for keydowns to determine winner of point
let gameEvents = () => {
    nex.play();
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == p1buts[randomI]) {
            playerOneWin();
        }
    })
    
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == p2buts[randomI2]) {
            playerTwoWin();
        }
    })
}

//this function runs when player one wins a point... Adds a point to P1 score proceeds to Endgame if at 3 points
let playerOneWin = () => {
    if (!gameOver) {
        ptGet.play();
        gameOver = true;
        playerOnePt++;
        if (playerOnePt == 3 || playerTwoPt == 3) {
            endCeremony();
        }
        else {
            msg.innerHTML = 'P1 SCORES!<br>P1SCORE: ' + playerOnePt + '&nbsp&nbsp&nbsp&nbspP2SCORE: ' + playerTwoPt;
            genNextButton();
        }
    }
    
}


//Same as above but for P2
let playerTwoWin = () => {
    if (!gameOver) {
        ptGet.play();
        gameOver = true;
        playerTwoPt++;
        if (playerOnePt == 3 || playerTwoPt == 3) {
            endCeremony();
        }
        else {
            msg.innerHTML = 'P2 SCORES!<br>P1SCORE: ' + playerOnePt + '&nbsp&nbsp&nbsp&nbspP2SCORE: ' + playerTwoPt;
            genNextButton();
        }
    }
    
}


//if a player pushes their button before the round begins, the other player gets a point.
//I'm not sure why the else is there.... maybe from older version? might remove
let falseStart = () => {
    window.addEventListener('keydown', (x) => {
        console.log(p1buts)
        console.log(p1buts.includes(81))
        if (p1buts.includes(x.keyCode) && !gameOver && !roundStart) {
            bugFix = 'cliccOut';
            fStart.play();
            gameOver = true;
            playerTwoPt++;
            if (playerOnePt == 3 || playerTwoPt == 3) {
                endCeremony();
            }
            else {
                msg.innerHTML = 'PLAYER ONE HAS MISFIRED<br>PLAYER TWO SCORES!<br>P1SCORE: ' + playerOnePt + '&nbsp&nbsp&nbsp&nbspP2SCORE: ' + playerTwoPt;
                genNextButton();
            }
        }
    })
    window.addEventListener('keydown', (x) => {
        if (p2buts.includes(x.keyCode) && !gameOver && !roundStart) {
            bugFix = 'cliccOut';
            fStart.play();
            gameOver = true;
            playerOnePt++;
            if (playerOnePt == 3 || playerTwoPt == 3) {
                endCeremony();
            }
            else {
                msg.innerHTML = 'PLAYER TWO HAS MISFIRED<br>PLAYER ONE SCORES!<br>P2SCORE: ' + playerOnePt + '&nbsp&nbsp&nbsp&nbspP2SCORE: ' + playerTwoPt;
                genNextButton();
            }
        }
    })
}

//beginning of round ceremony... contains timing warning

let startRound = () => {
    roundStart = false;
    gameOver = false;
    roundCounter++;
    msg.innerHTML = "ROUND WILL BEGIN IN " + randomTime / 1000 + " SECONDS!<br>PLAYER ONE USES 'Q, W, E, R, A, S, D, F'<br>PLAYER TWO USES 'U, I, O, P, H, J, K, L'";
}



//begins the actual keydown game

let startGame = () => {
    console.log(bugFix)
    if(bugFix !== 'cliccOut'){
        roundStart = true;
        if (!gameOver) {
            msg.innerHTML = "ROUND START<br>P1: " + p1Char[randomI] + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp P2: " + p2Char[randomI2 ];
            gameEvents();
        }
    }
    if(bugFix == 'cliccOut'){
    bugFix = ''
    }
}


//ends game, plays new music, etc

let endCeremony = () => {
    bG.loop = false;
    bG.pause();
    win.play();
    end.loop = true;
    end.play();
    if (playerOnePt == 3) {
        msg.innerHTML = "PLAYER ONE HAS OBTAINED THREE POINTS<br>PLAYER ONE WINS!";
        genEndButton();
    }
    if (playerTwoPt == 3) {
        msg.innerHTML = "PLAYER TWO HAS OBTAINED THREE POINTS<br>PLAYER TWO WINS!";
        genEndButton();
    }
}

//Rainbow Start button

let stbut = document.querySelector('#startbutton');
let color = 0;
let color2 = 0;
setInterval(function () {
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    stbut.style.backgroundColor = color;
}, 1100);
setInterval(function () {
    color2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
    stbut.style.color = color2;
}, 1100); 

startBg.loop = true;
startBg.play();

// event listener for Start Button at beginning of game

start.addEventListener('click', () => {
    startBg.loop = false;
    startBg.pause();
    startSound.play();
    bG.loop = true;
    bG.play();
    msg.style.border= 'ridge';
    startRound();
    falseStart();
    setTimeout(startGame, randomTime);
}
)