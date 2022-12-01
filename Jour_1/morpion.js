let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

var O_TEXT = "O"
var X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}




document.querySelector('#changeName').addEventListener('click',changeValue)


function changeValue() {
    player1 = document.querySelector('#player1').value;
    player2 = document.querySelector('#player2').value;
    document.querySelector('h1').innerText = 'GO !'
    console.log('changeValue OK !')
}




function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !==false){
            if(currentPlayer == X_TEXT){
                if(player1 == ""){
                    player1 = "X"
                    currentPlayer = player1
                }
                else{
                    currentPlayer = player1
                }
                
            }
            else if(currentPlayer == O_TEXT){
                if(player2 == ""){
                    player2 = "O"
                    currentPlayer = player2
                }
                else{
                    currentPlayer = player2
                }
            }
            playerText.innerHTML = `${currentPlayer} a gagné !`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false;
}



restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null)
    document.querySelector('h1').innerHTML = 'Morpion Javascript'
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    currentPlayer = X_TEXT;
}

startGame()