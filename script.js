
let player1, player2; 
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

    let playAgainToggle = (name) => {
        let squares = document.querySelectorAll('.playSquares');
        let restartButton = document.getElementById('restart');
        let refreshButton = document.getElementById('refresh');
        let winnerTitle = document.getElementById('resultOfGame');

        restartButton.classList.remove('invisible');
        restartButton.classList.add('visible');
        refreshButton.classList.remove('invisible');
        refreshButton.classList.add('visible');

        if(name === undefined) {
            winnerTitle.innerHTML = `It's a tie!`;
        }
        else {
            winnerTitle.innerHTML = `${name} wins!`;
        }
      
        winnerTitle.classList.remove('invisible')
        refreshButton.addEventListener('click', ()=> location.reload())
        squares.forEach((e) => e.classList.add('hidden'));
        restartButton.addEventListener('click', ()=> {
            gameBoard.resetBoard();
            displayController.resetBoardRender();
            winnerTitle.classList.add('invisible')
            refreshButton.classList.add('invisible');
            restartButton.classList.add('invisible');
            squares.forEach((e) => e.classList.remove('hidden'));

        })
         }
        return { reRender: reRender,
                 resetBoardRender:resetBoardRender,
                 updateScores:updateScores,
                 turnHighlighter: turnHighlighter, 
                 playAgainToggle:playAgainToggle
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
            
            if (winCheck === 'x') {
                // alert(`${player1.name} wins!`)
                player1.score++
                displayController.updateScores();
                displayController.playAgainToggle(player1.name);
     
            }
            else if(winCheck === 'o') {
                // alert(`${player2.name} wins!`)
                player2.score++
                displayController.updateScores();
                displayController.playAgainToggle(player2.name);

            }
            else if(winCheck === 'tie') {
            displayController.playAgainToggle();
            }
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
    let playRender = document.getElementById('playRender')
    let p1NameInput = document.getElementById('p1')
    let p2NameInput = document.getElementById('p2')
    let p1NameDisplay = document.getElementById('player1Name')
    let p2NameDisplay = document.getElementById('player2Name')
    let playForm = document.getElementById('playerForm')
    let titles = document.querySelectorAll('.titles')
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
        titles.forEach((e) => e.classList.add('invisible'))
        p1NameDisplay.innerHTML = player1.name;
        p2NameDisplay.innerHTML = player2.name;
        mainView.classList.remove('hidden');
        playRender.classList.remove('hidden');
        displayController.updateScores();
        displayController.turnHighlighter();  
    }
})();


function hasAPlayerWon(squares) {
    const winningCombos = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
    ]

    const blankTiles = squares.includes('');
    if(!blankTiles) {
        return 'tie';
    }
    
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log(squares[a])
            return squares[a];
        }
      }
      return null;
    }
