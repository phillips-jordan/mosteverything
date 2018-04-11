let wid = screen.width - 100
let hei = screen.height - 100
let gameOver = false
let bod = document.getElementById('bod')
let mdg = document.getElementById('msg')
let out = document.getElementById('out')
let randomTime = Math.floor(Math.random()*(3000-1000)+1000)
let n = Math.floor(Math.random()*(10-1)+1)
let clickTime = ((1+n*0.4)*1000)
let nClicks = 0

console.log(n)

let genButton = () => {
    let randomButton = document.createElement('button')
    randomButton.style.top = Math.floor(Math.random()*hei) + 'px'
    randomButton.style.left = Math.floor(Math.random()*wid) + 'px'
    randomButton.style.position= 'fixed'
    randomButton.innerText = 'CLICK ME'
    bod.appendChild(randomButton)
    randomButton.className= 'gameButtons'
    randomButton.addEventListener('click', ()=>{
        nClicks++;
        console.log(nClicks)
        bod.removeChild(randomButton);
        if (nClicks == n){
            gameWin();
        }
    })
}

let makeN = () => {
    for (let i = 0; i < n; i++){
        genButton()
    }
}

let clearButtons = () => {
    let buttonArray = document.getElementsByClassName('gameButtons')
    while (buttonArray.length > 0){
        bod.removeChild(buttonArray[0])
    }
}

let genEndbutton = () => {
    let finalButton = document.createElement('button')
    finalButton.style.top = '40%'
    finalButton.style.left = '40%'
    finalButton.style.position = 'fixed'
    finalButton.innerText = 'RESTART GAME'
    bod.appendChild(finalButton)
    finalButton.addEventListener('click', () => {
        location.reload()
    })
    }

    let gameWin = () => {
        if(!gameOver){
            gameOver=true;
            msg.innerText= 'YOU WIN THE GAME'
            genEndbutton();
        }
    }

    let clickOut = () => {
        out.addEventListener('click', ()=>{
        if(!gameOver){
            gameOver=true;
            clearButtons();
            msg.innerText= 'YOU HAVE LOST THE GAME';
            genEndbutton();
        }
        })
    }

    let loseGame = () => {
        if (!gameOver){
            gameOver=true;
            clearButtons();
            msg.innerText= 'YOU HAVE LOST THE GAME'
            genEndbutton();
        }
    }

    let beginRound = () => {
        msg.innerHTML='ROUND BEGINS IN '+randomTime/1000+' SECONDS!<br>YOU WILL HAVE ' +clickTime/1000+ ' SECONDS TO CLICK THE BUTTONS'
    }

    let startGame = () => {
        msg.innerText= 'ROUND START'
        makeN();
        clickOut();
        setTimeout(loseGame,clickTime);
    }

    msg.addEventListener('click', ()=>{
        beginRound();
        setTimeout(startGame, randomTime)
    })