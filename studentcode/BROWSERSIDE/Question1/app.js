let body = document.getElementById('bod')
let winLose = document.getElementById('msg')
let clicC = false

body.addEventListener('click', ()=>{
    if (clicC==false){
        clicC=true
        winLose.innerText = 'you win'
    }
    return
})

setTimeout(()=> {
    if (clicC){ return
    }
    else {
        winLose.innerText = 'you lose'
        clicC=true
    }
}, 1000)