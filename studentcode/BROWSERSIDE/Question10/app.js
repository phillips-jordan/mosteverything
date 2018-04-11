let randomTime = Math.floor(Math.random() * (8000 - 2000) + 2000)
let bod = document.getElementById('bod')
let start = document.getElementById('startbutton')
let msg = document.getElementById('msg')
let gameOver = false
let roundStart = false
let roundCounter = 1
let playerOnePt = 0
let playerTwoPt = 0


let genEndButton = () => {
    let restartButton = document.createElement('button')
    restartButton.style.top = '30%'
    restartButton.style.left = '30%'
    restartButton.style.position = 'fixed'
    restartButton.style.fontSize = '60pt'
    bod.appendChild(restartButton)
    restartButton.innerText = 'RESTART GAME'
    restartButton.addEventListener('click', () => {
        location.reload();
    })
}

let genNextButton = () => {
    let nextButton = document.createElement('button')
    nextButton.style.top = '30%'
    nextButton.style.left = '27%'
    nextButton.style.position = 'fixed'
    nextButton.style.fontSize = '60pt'
    nextButton.innerText = 'ROUND ' + roundCounter + ' GO!'
    bod.appendChild(nextButton)
    nextButton.addEventListener('click', () => {
    randomTime = Math.floor(Math.random() * (8000 - 2000) + 2000)
    startRound();
    falseStart();
    setTimeout(startGame, randomTime)
    bod.removeChild(nextButton);
})
}

let gameEvents = () => {
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == 81) {
            playerOneWin();
        }
    })
    
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == 80) {
            playerTwoWin();
        }
    })
}


let playerOneWin = () => {
    if (!gameOver) {
        gameOver = true
        playerOnePt++
        if (playerOnePt == 3 || playerTwoPt == 3){
            endCeremony();}
        else{msg.innerHTML = 'P1 SCORES!<br>P1SCORE: ' +playerOnePt+ '<br>P2SCORE: ' +playerTwoPt
        genNextButton();}
    }

}

let playerTwoWin = () => {
    if (!gameOver) {
        gameOver = true
        playerTwoPt++
        if (playerOnePt == 3 || playerTwoPt == 3) {
            endCeremony();}
        else{msg.innerHTML = 'P2 SCORES!<br>P1SCORE: ' + playerOnePt + '<br>P2SCORE: ' + playerTwoPt
        genNextButton();}
    }

}

let falseStart = () => {
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == 81 && !gameOver && !roundStart) {
            gameOver = true;
            playerTwoPt++
            if (playerOnePt == 3 || playerTwoPt == 3) {
                endCeremony();
            }
            else{msg.innerHTML = 'PLAYER ONE HAS MISFIRED<br>PLAYER TWO SCORES!<br>P1SCORE: ' + playerOnePt + '<br>P2SCORE: ' + playerTwoPt
            genNextButton();}
        }
    })
    window.addEventListener('keydown', (x) => {
        if (x.keyCode == 80 && !gameOver && !roundStart) {
            gameOver = true;
            playerOnePt++
            if (playerOnePt == 3 || playerTwoPt == 3) {
                endCeremony();
            }
            else {msg.innerHTML = 'PLAYER TWO HAS MISFIRED<br>PLAYER ONE SCORES!<br>P2SCORE: ' + playerOnePt + '<br>P2SCORE: ' + playerTwoPt
            genNextButton();}
        }
    })
}

let startRound = () => {
    roundStart= false
    gameOver=false
    roundCounter++
    msg.innerHTML = "ROUND WILL BEGIN IN " + randomTime / 1000 + " SECONDS!<br>PLAYER ONE USES 'Q', PLAYER TWO USES 'P'"
}



let startGame = () => {
    roundStart = true
    if (!gameOver) {
        msg.innerHTML = "ROUND START"
        gameEvents();
    }
}

let endCeremony = () => {
    if (playerOnePt == 3){
        msg.innerHTML = "PLAYER ONE HAS OBTAINED THREE POINTS<br>PLAYER ONE WINS!"
        genEndButton();
    }
    if (playerTwoPt == 3) {
        msg.innerHTML = "PLAYER TWO HAS OBTAINED THREE POINTS<br>PLAYER TWO WINS!"
        genEndButton();
    }
}


start.addEventListener('click', () => {
    startRound();
    falseStart();
    setTimeout(startGame, randomTime)
}
)