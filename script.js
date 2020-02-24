
let player1, player2; 

let gameBoard =(() => {

    let gameboard = ['','','','','','','','','']

    let updatePlayState = (symbol, square) => {
            if(gameboard[square] !== ''){
                return;
            }
            else {
                gameboard[square] = symbol;
                console.log(gameboard[square])
                gameLogic.switchPlayer();
            }

            
    }
    let gameBoardDisplay = () => gameboard

    let resetBoard = () => {

        gameboard = ['','','','','','','','','']

    }
    

    return { updatePlayState:updatePlayState,
             gameBoardDisplay:gameBoardDisplay,
             resetBoard: resetBoard }
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
            squares = gameBoard.gameBoardDisplay()
            cellID.innerHTML = squares[cell]
            console.log(squares[cell])
            console.table(gameBoard.gameBoardDisplay())

    }

    let resetBoardRender = () => {

        let resetSquares = document.querySelectorAll('.playSquares')

        resetSquares.forEach((e) => e.innerHTML = '')
    }

    let updateScores = () => {

        let player1Score = document.getElementById('player1Score')
        let player2Score = document.getElementById('player2Score')

        player1Score.innerHTML = player1.score;
        player2Score.innerHTML = player2.score;
    
    }

    let turnHighlighter = () => {

        let player1Name = document.getElementById('player1Name')
        let player2Name = document.getElementById('player2Name')

        if(player1.isCurrentPlayer) {
            player1Name.classList.add('highlighted')
            player2Name.classList.remove('highlighted')
        }
        else if (player2.isCurrentPlayer){
            player2Name.classList.add('highlighted')
            player1Name.classList.remove('highlighted')
        }
    }

 

        return { reRender: reRender,
                 resetBoardRender:resetBoardRender,
                 updateScores:updateScores,
                 turnHighlighter: turnHighlighter
            
            }

})();


let gameLogic = (() => {

    

    let currentPlayer = () => {
        let playa = null;
        if (player1.isCurrentPlayer){
            playa = player1;
        }
        else if(player2.isCurrentPlayer)
        {
            playa = player2;
        }

        return playa.symbol;
    }

    let switchPlayer = () => {

        if(player1.isCurrentPlayer === true) {
            player1.isCurrentPlayer = false
            player2.isCurrentPlayer = true
        }
        else {
            player1.isCurrentPlayer = true
            player2.isCurrentPlayer = false
        }
    }

    let squares = document.querySelectorAll('.playSquares')


    squares.forEach((e) =>  {
        e.addEventListener('click', ()=> {

            console.log(`p1 is current player: ${player1.isCurrentPlayer}`)
            console.log(`p2 is current player: ${player2.isCurrentPlayer}`)

            gameBoard.updatePlayState(currentPlayer(),e.id)
            displayController.turnHighlighter();
            displayController.reRender(e.id);
            //check for winner?
            let winCheck = hasAPlayerWon(gameBoard.gameBoardDisplay(), player1.symbol, player2.symbol);
            
            if (winCheck === 'p1') {
                // alert(`${player1.name} wins!`)
                player1.score++
                 gameBoard.resetBoard();
                 displayController.resetBoardRender();
                displayController.updateScores();
                // location.reload();
            }
            else if(winCheck === 'p2') {
                // alert(`${player2.name} wins!`)
                player2.score++
                gameBoard.resetBoard();
                displayController.resetBoardRender();
                displayController.updateScores();
                // location.reload();
            }
            else if(winCheck === 'tie') {
                alert('its a tie!')
                gameBoard.resetBoard();
                displayController.resetBoardRender();
                // location.reload();
            }
            // console.table(gameBoard.gameBoardDisplay())
        })
    })

    return {switchPlayer:switchPlayer}
})();

let player = (name, isCurrentPlayer, symbol, score) => {

    return {name:name, isCurrentPlayer:isCurrentPlayer, symbol:symbol, score:score}

}

let gameStart = (() => {
    
    let mainView = document.getElementById('mainView')
    let playButton  = document.getElementById('playButton')
    let p1NameInput = document.getElementById('p1')
    let p2NameInput = document.getElementById('p2')
    let p1NameDisplay = document.getElementById('player1Name')
    let p2NameDisplay = document.getElementById('player2Name')
    let playForm = document.getElementById('playerForm')

    playButton.addEventListener('click', () => gameStart());

    let gameStart = () => {

        let nameFinal1 = p1NameInput.value;
        let nameFinal2 = p2NameInput.value;

        if(nameFinal1 === '') {
            nameFinal1 = 'X'
        }
        if(nameFinal2 === '') {
            nameFinal2 = 'O'
        }

        player1 = player(nameFinal1, true, 'x', 0)
        player2 = player(nameFinal2, false, 'o', 0)
        playForm.classList.add('invisible')
        p1NameDisplay.innerHTML = player1.name;
        p2NameDisplay.innerHTML = player2.name;
        mainView.classList.remove('hidden');
        displayController.updateScores();
        displayController.turnHighlighter();  
    }




})();

//this needs to be refactored!
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











