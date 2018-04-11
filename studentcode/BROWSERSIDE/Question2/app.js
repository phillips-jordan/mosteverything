let msG = document.getElementById('msg');
let body = document.getElementById('bod');
let gameOver = false
let random = Math.floor(Math.random()*(3000-1000)+1000)

msG.innerText = 'Round begins in ' + random/1000 + ' seconds!'

setTimeout(()=>{
    msG.innerText = 'GO'
}, random)

setTimeout(()=>{    
    window.addEventListener("keypress",(e) => {
        if (e.keyCode == 32 && !gameOver){
            msG.innerText = 'you win'
            gameOver=true
        }
    } )
    
    body.addEventListener('click', ()=>{
        if (!gameOver){
            msG.innerText = 'you win'
            gameOver=true
        }
    })
    setTimeout (()=> {
        if (gameOver){
            return
        }
        else {
            msG.innerText = 'you lose :('
            gameOver=true
        }
    }, 500)
},random)

    