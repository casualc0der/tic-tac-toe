let gameBoard =(() => {

    let gameboard = [1,2,3,4,5,6,7,8,9]

    let updatePlayState = (symbol, square) => {
            gameboard[square] = symbol
    }

    let gameBoardDisplay = ()=> gameboard

    return { updatePlayState:updatePlayState,
             gameBoardDisplay:gameBoardDisplay }
})();

//testing that the module is private
gameBoard.updatePlayState('X', 7);
console.table(gameBoard.gameBoardDisplay());

let displayController = (() => {

    let playArea = document.getElementById('playRender')
    let squares = gameBoard.gameBoardDisplay()

    squares.forEach((e) => {
    let square = document.createElement('div');
    square.classList= 'playSquares'
    square.id = `square-${squares.indexOf(e)}`
    square.innerHTML = e;
    playArea.appendChild(square)
    })

})();