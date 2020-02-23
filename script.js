let gameBoard =(() => {

    let gameboard = ['','','','','','','','','']

    let updatePlayState = (symbol, square) => {
            if(gameboard[square] !== ''){
                return;
            }
            else {
                gameboard[square] = symbol;
                gameLogic.switchPlayer();
            }

            
    }
    let gameBoardDisplay = ()=> gameboard

    return { updatePlayState:updatePlayState,
             gameBoardDisplay:gameBoardDisplay }
})();

let displayController = (() => {

    let playArea = document.getElementById('playRender')
    let squares = gameBoard.gameBoardDisplay()
    let i = 0;

    squares.forEach((e) => {
        let square = document.createElement('div');
        square.classList= 'playSquares'
        square.id = `${i}`
        square.innerHTML = e;
        playArea.appendChild(square)
        i++;
    })

    let reRender = (cell) => {
        let cellID = document.getElementById(`${cell}`)
        if(squares[cell] === '') {

            return;

        }
        else {
            cellID.innerHTML = squares[cell]

        }
        
    }

    let scoreBoard = () => {

        let player1Name = document.getElementById('player1Name')
        let player2Name = document.getElementById('player2Name')
        let player1Score = document.getElementById('player1Score')
        let player2Score = document.getElementById('player2Score')
    
        player1Name.innerHTML = player1.name;
        player2Name.innerHTML = player2.name;
        player1Score.innerHTML = player1.score;
        player2Score.innerHTML = player2.score;
    
    
    }   

        return {reRender: reRender, scoreBoard: scoreBoard}

})();


let gameLogic = (() => {

    

    let currentPlayer = () => {
        let playa = null;
        player1.isCurrentPlayer === true ? playa = player1: playa = player2
        return playa.symbol;
    }

    let switchPlayer = () => {

        if(player1.isCurrentPlayer === true) {
            player1.isCurrentPlayer = false
        }
        else {
            player1.isCurrentPlayer = true
        }
    }

    let squares = document.querySelectorAll('.playSquares')

    squares.forEach((e) =>  {
        e.addEventListener('click', ()=> {

            gameBoard.updatePlayState(currentPlayer(),e.id)
            displayController.reRender(e.id);
            //check for winner?
            let winCheck = hasAPlayerWon(gameBoard.gameBoardDisplay(), player1.symbol, player2.symbol);
            
            if (winCheck === 'p1') {
                alert(`${player1.name} wins!`)
                player1.score++
                location.reload();
            }
            else if(winCheck === 'p2') {
                alert(`${player2.name} wins!`)
                player2.score++
                location.reload();
            }
            else if(winCheck === 'tie') {
                alert('its a tie!')
                location.reload();
            }
            console.table(gameBoard.gameBoardDisplay())
        })
    })

    return {switchPlayer:switchPlayer}
})();

let player = (name, isCurrentPlayer, symbol, score) => {

    return {name:name, isCurrentPlayer:isCurrentPlayer, symbol:symbol, score:score}

}

function hasAPlayerWon(array, p1, p2) {

    //win vertical indexes
    //0,3,6
    if(array[0] === p1 && array[3] === p1 && array[6]===p1){
        return 'p1'
    }
    if(array[0] === p2 && array[3] === p2 && array[6]===p2){
        return 'p2'
    }
    //1,4,7
    if(array[1] === p1 && array[4] === p1 && array[7]===p1){
        return 'p1'
    }
    if(array[1] === p2 && array[4] === p2 && array[7]===p2){
        return 'p2'
    }
    //2,5,8
    if(array[2] === p1 && array[5] === p1 && array[8]===p1){
        return 'p1'
    }
    if(array[2] === p2 && array[5] === p2 && array[8]===p2){
        return 'p2'
    }
    // win horizontal indexes
    //0,1,2
    if(array[0] === p1 && array[1] === p1 && array[2]===p1){
        return 'p1'
    }
    if(array[0] === p2 && array[1] === p2 && array[2]===p2){
        return 'p2'
    }
    //3,4,5
    if(array[3] === p1 && array[4] === p1 && array[5]===p1){
        return 'p1'
    }
    if(array[3] === p2 && array[4] === p2 && array[5]===p2){
        return 'p2'
    }
    //6,7,8
    if(array[6] === p1 && array[7] === p1 && array[8]===p1){
        return 'p1'
    }
    if(array[6] === p2 && array[7] === p2 && array[8]===p2){
        return 'p2'
    }
    //win diagonally indexes 
    //0,4,8
    if(array[0] === p1 && array[4] === p1 && array[8]===p1){
        return 'p1'
    }
    if(array[0] === p2 && array[4] === p2 && array[8]===p2){
        return 'p2'
    }
    //2,4,6
    if(array[2] === p1 && array[4] === p1 && array[6]===p1){
        return 'p1'
    }
    if(array[2] === p2 && array[4] === p2 && array[6]===p2){
        return 'p2'
    }
    //tie
    const tie = array.includes('');

    if(!tie) {
        return 'tie';
    }


}



//fill these in via a form
let player1 = player('Edd', true, 'x', 0)
let player2 = player('Tom', false, 'o', 0)
displayController.scoreBoard();








