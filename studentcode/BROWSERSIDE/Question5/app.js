let hei = screen.height - 100
let wid = screen.width - 150
let bod = document.getElementById('bod')
let msg = document.getElementById('msg')
let out = document.getElementById('out')
let gameOver = false
let random = Math.floor(Math.random()*(3000-1000)+1000)
let button = 0

let genButton = () => {
    let buttonNew = document.createElement('button');
    buttonNew.style.top = Math.round(Math.random() * hei) + 'px';
    buttonNew.style.left = Math.round(Math.random() * wid) + 'px';
    buttonNew.style.position = 'fixed';
    buttonNew.innerText = 'Please CLICK';
    bod.appendChild(buttonNew);
    buttonNew.id = 'but'
    button = document.getElementById('but')
}

let genEndbutton = () => {
    let buttonEnd = document.createElement('button');
    buttonEnd.style.top = 40+'%';
    buttonEnd.style.left = 40+'%';
    buttonEnd.style.position = 'fixed';
    buttonEnd.innerText = 'Restart';
    bod.appendChild(buttonEnd);
    buttonEnd.addEventListener('click', ()=>{
        location.reload();
    })
}

let winGame = () => {
    button.addEventListener('click', ()=>{
        if (!gameOver){
            gameOver=true;
            bod.removeChild(button);
            msg.innerText= 'YOU WIN';
            genEndbutton();
        }
    })
}

let clickOut = () => {
    out.addEventListener('click', ()=>{
        if(!gameOver){
            gameOver=true;
            bod.removeChild(button);
            msg.innerText= 'YOU LOSE';
            genEndbutton();
        }
    })
}

let loseGame = () => {
    if(!gameOver){
    gameOver=true;
    bod.removeChild(button)
    msg.innerText='YOU LOSE';
    genEndbutton();}
}




let startRound = () => {
    msg.innerHTML='find and click after ' +random/1000+' seconds!'
}


let startGame = () => {
    msg.innerHTML= 'ROUND START'
    genButton();
    console.log(button.id)
    winGame();
    clickOut();
    setTimeout(loseGame, 1500);
}

msg.addEventListener('click', ()=>{
    startRound();
    setTimeout(startGame, random)
})