// Initialize variables
const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = 'red';
let gameActive = true;

// Create the game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => placePiece(col));
            gameBoard.appendChild(cell);
            board[row][col] = '';
        }
    }
}

// Place a piece in the selected column
function placePiece(col) {
    if (!gameActive) return;

    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(
                `.cell[data-row="${row}"][data-col="${col}"]`
            );
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                document.getElementById('game-status').innerText = `${currentPlayer.toUpperCase()} wins!`;
                gameActive = false;
            } else if (board.flat().every(cell => cell)) {
                document.getElementById('game-status').innerText = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                document.getElementById('game-status').innerText = `${currentPlayer.toUpperCase()}'s turn`;
            }
            return;
        }
    }
}

// Check for a win
function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}

// Helper function to check four in a row in a specific direction
function checkDirection(row, col, rowIncrement, colIncrement) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
        const newRow = row + i * rowIncrement;
        const newCol = col + i * colIncrement;
        if (
            newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= cols ||
            board[newRow][newCol] !== currentPlayer
        ) break;
        count++;
    }
    for (let i = 1; i < 4; i++) {
        const newRow = row - i * rowIncrement;
        const newCol = col - i * colIncrement;
        if (
            newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= cols ||
            board[newRow][newCol] !== currentPlayer
        ) break;
        count++;
    }
    return count >= 4;
}

// Reset the game
document.getElementById('reset-button').addEventListener('click', () => {
    currentPlayer = 'red';
    gameActive = true;
    document.getElementById('game-status').innerText = `${currentPlayer.toUpperCase()}'s turn`;
    createBoard();
});

// Initialize the game
createBoard();
document.getElementById('game-status').innerText = `${currentPlayer.toUpperCase()}'s turn`;
