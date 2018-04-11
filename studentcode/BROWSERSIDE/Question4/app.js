let msg = document.getElementById('msg')
let body = document.getElementById('bod')
let out = document.getElementById('out')
let random = Math.floor(Math.random()*(3000-2000)+1000)
let hei = screen.height -100
let wid = screen.width -100
let gameOver = false

let genButton = () => {
    let buttonNew = document.createElement('button');
    buttonNew.style.top = Math.round(Math.random()*hei) + 'px';
    buttonNew.style.left = Math.round(Math.random()*wid) + 'px';
    buttonNew.style.position = 'fixed';
    buttonNew.innerText = 'Please CLICK';
    bod.appendChild(buttonNew);

}

let winGame = () => {
    let button = document.querySelector('button');
    button.addEventListener('click', ()=>{
        if (!gameOver){
            gameOver=true;
            msg.innerHTML = "YOU'VE WON!";
            body.removeChild(button)
        }
    })    
    }

let clickOut = () =>{    
    body.addEventListener('click', ()=>{
        if (!gameOver){
        let button = document.querySelector('button')
        msg.innerHTML = "OH NO... YOU'VE LOST!"
        body.removeChild(button)}
        gameOver = true
    })
    }
    
let loseGame = () => {
    if (!gameOver) {
    let button = document.querySelector('button')
    gameOver=true
    msg.innerHTML="OH NO... YOU'VE LOST!"
    body.removeChild(button)
}
}

let startGame = () => {
    genButton();
    winGame();
    clickOut();
    setTimeout(loseGame, 1500)
}

let beginRound = () => {
    msg.innerHTML= 'Round begins in ' + random/1000 + ' seconds!'
}

msg.addEventListener('click', ()=>{
    beginRound();
    setTimeout(()=>{msg.innerHTML='ROUND START!!!!'}, random)
    console.log(msg.innerHTML)
    setTimeout(startGame,random)
})