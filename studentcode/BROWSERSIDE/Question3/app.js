let button = document.getElementById('buttonhere');
let hei = screen.height - 100
let wid = screen.width - 100
let random = Math.floor(Math.random()*(3000-1000)+1000)
let body = document.getElementById('bod')
let gameOver = false


button.innerText = 'After ' + random/1000 + ' seconds... You have 1.5 seconds to click the button!'


let generateButton = () => {
    button.style.top = (Math.round(Math.random() * hei)) + 'px';
    console.log(button.style.top)
    button.style.left = (Math.round(Math.random() * wid)) + 'px';
    button.style.position = 'fixed'
    button.innerHTML = "<button style='font-size:30px;'>CLICK THIS</button>"
    
} 


let gameWin = () => {
    gameOver=true
    body.innerText = 'you win'
}

let loseGame = () => {
    body.addEventListener('click', ()=>{
        if (!gameOver){
            body.innerText = 'you lose'
            gameOver=true
        }
    })
    setTimeout(()=>{
        if (!gameOver){
        body.innerText = 'you lose'
        gameOver = true}
    }, 1500)
}

let gameStart = () => {
    generateButton();
    let victory = document.querySelector('button')
    victory.addEventListener('click', gameWin);
    loseGame();
    console.log(gameOver)
}

setTimeout(setTimeout(gameStart, 1500), random)