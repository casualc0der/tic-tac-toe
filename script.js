let gameBoard =(() => {

    let gameboard = ['','','','','','','','','']

    let updatePlayState = (symbol, square) => {
            gameboard[square] = symbol;
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
        squares[cell] !== '' ? cellID.innerHTML = squares[cell]: false
    }

        return {reRender: reRender}

})();

let clicker = (() => {

    let squares = document.querySelectorAll('.playSquares')

    squares.forEach((e) =>  {
        e.addEventListener('click', ()=> {

            gameBoard.updatePlayState('O',e.id)
            displayController.reRender(e.id);
        })
    })
})();




