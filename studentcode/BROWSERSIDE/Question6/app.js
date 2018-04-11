let hei = screen.height - 100
let wid = screen.width - 150
let bod = document.getElementById('bod')
let msg = document.getElementById('msg')
let out = document.getElementById('out')
let gameOver = false
let random = Math.floor(Math.random() * (3000 - 1000) + 1000)
let fiveClicks = 0

let genButton = () => {
    let buttonNew = document.createElement('button');
    buttonNew.style.top = Math.round(Math.random() * hei) + 'px';
    buttonNew.style.left = Math.round(Math.random() * wid) + 'px';
    buttonNew.style.position = 'fixed';
    buttonNew.innerText = 'Please CLICK';
    bod.appendChild(buttonNew);
    buttonNew.className = 'buttons';
    buttonNew.addEventListener('click', ()=>{
        fiveClicks++;
        bod.removeChild(buttonNew);
        if (fiveClicks == 5){
            winGame();
        }
    });}

let makeFive = () => {
for (i=0; i < 5; i++){
    console.log(i)
    genButton();
    }    
}

let genEndbutton = () => {
    let buttonEnd = document.createElement('button');
    buttonEnd.style.top = 40 + '%';
    buttonEnd.style.left = 40 + '%';
    buttonEnd.style.position = 'fixed';
    buttonEnd.innerText = 'Restart';
    bod.appendChild(buttonEnd);
    buttonEnd.addEventListener('click', () => {
        location.reload();
    })
}

let removeButtons = () => {
    let buttonArray = document.getElementsByClassName('buttons');
    while (buttonArray.length > 0 ){
        console.log(buttonArray)
        bod.removeChild(buttonArray[0])
    }
}   

let winGame = () => {
        if (!gameOver) {
            gameOver = true;
            msg.innerText = 'YOU WIN';
            removeButtons();
            genEndbutton();
        }
}

let clickOut = () => {
    out.addEventListener('click', () => {
        if (!gameOver) {
            gameOver = true;
            msg.innerText = 'YOU LOSE';
            removeButtons();
            genEndbutton();
        }
    })
}

let loseGame = () => {
    if (!gameOver) {
        gameOver = true;
        msg.innerText = 'YOU LOSE';
        removeButtons();
        genEndbutton();
    }
}




let startRound = () => {
    msg.innerHTML = 'find and click after ' + random / 1000 + ' seconds!'
}


let startGame = () => {
    msg.innerHTML = 'ROUND START'
    makeFive();
    clickOut();
    setTimeout(loseGame, 3000);
}

msg.addEventListener('click', () => {
    startRound();
    setTimeout(startGame, random)
})