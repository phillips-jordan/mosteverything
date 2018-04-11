let randomTime = Math.floor(Math.random()*(8000-2000)+2000)
let bod = document.getElementById('bod')
let start = document.getElementById('startbutton')
let msg = document.getElementById('msg')
let gameOver = false
let roundStart = false
let bang = new Audio('gunshot.mp3');


let genEndButton = () => {
    let restartButton = document.createElement('button')
    restartButton.style.top= '30%'
    restartButton.style.left= '30%'
    restartButton.style.position= 'fixed'
    restartButton.style.fontSize= '60pt'
    bod.appendChild(restartButton)
    restartButton.innerText = 'RESTART GAME'
    restartButton.addEventListener('click', ()=>{
        location.reload();  
    })
}

let gameEvents = () => {
window.addEventListener('keydown', (x)=>{
    console.log("P1: "+ x)
    if (x.keyCode == 81){
        playerOneWin();
    }
})

window.addEventListener('keydown', (x)=>{
    console.log('P2: ' + x)
    if (x.keyCode == 80){
        playerTwoWin();
    }
})
}


let playerOneWin = () => {
    if(!gameOver){
        gameOver=true
        msg.innerText= 'PLAYER ONE WINS!'
        genEndButton();
    }

}

let playerTwoWin = () => {
    if (!gameOver) {
        gameOver = true
        msg.innerText = 'PLAYER TWO WINS!';
        genEndButton();
    }

}

let falseStart = () => {
    window.addEventListener('keydown', (x) => {
        console.log(x)
        if (x.keyCode == 81 && !gameOver && !roundStart) {
            gameOver=true;
            msg.innerHTML = 'PLAYER ONE HAS MISFIRED<br>PLAYER TWO WINS!'
            genEndButton();
        }
    })
    window.addEventListener('keydown', (x) => {
        console.log(x)
        if (x.keyCode == 80 && !gameOver && !roundStart) {
            gameOver = true;
            msg.innerHTML = 'PLAYER TWO HAS MISFIRED<br>PLAYER ONE WINS!'
            genEndButton();
        } 
    })
}

let startRound = () => {
    msg.innerHTML = "ROUND WILL BEGIN IN " + randomTime/1000 + " SECONDS!<br>PLAYER ONE USES 'Q', PLAYER TWO USES 'P'"
}



let startGame = () => {
    roundStart = true
    if (!gameOver){
        msg.innerHTML  = "ROUND START"
        gameEvents();
    }
}



start.addEventListener('click', ()=>{
    startRound();
    falseStart();
    setTimeout(()=>{
    bang.play();    
        },
        (randomTime-100));
    setTimeout(startGame, randomTime)
    }
)