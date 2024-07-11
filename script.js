let board;
let currentPlayer;
let gameActive;

const pages = document.querySelectorAll('.page');

function showPage(pageId) {
    pages.forEach(page => {
        if (page.id === pageId) {
            page.style.display = 'block';
        } else {
            page.style.display = 'none';
        }
    });
}

function gotoHome() {
    showPage('home');
}

function gotoGame() {
    showPage('game');
    startGame();
}

function gotoInstructions() {
    showPage('instructions');
}

function startGame() {
    // Kiểm tra xem có dữ liệu game trong local storage không
    const storedBoard = JSON.parse(localStorage.getItem('ticTacToeBoard'));
    if (storedBoard) {
        board = storedBoard.board;
        currentPlayer = storedBoard.currentPlayer;
        gameActive = storedBoard.gameActive;
    } else {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
    }

    setStatus(`Lượt chơi của người chơi ${currentPlayer}`);
    renderBoard();
}

function cellClick(cellIndex) {
    if (gameActive && board[cellIndex] === "") {
        board[cellIndex] = currentPlayer;
        renderBoard();
        if (checkWin()) {
            setStatus(`Người chơi ${currentPlayer} thắng!`);
            gameActive = false;
        } else if (checkDraw()) {
            setStatus(`Hòa!`);
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            setStatus(`Lượt chơi của người chơi ${currentPlayer}`);
        }

        // Lưu trạng thái game vào local storage
        saveGame();
    }
}

function saveGame() {
    localStorage.setItem('ticTacToeBoard', JSON.stringify({ board, currentPlayer, gameActive }));
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        let cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => {
            if (gameActive) {
                cellClick(index);
            }
        });
        gameBoard.appendChild(cellElement);
    });
}

function setStatus(message) {
    const statusDisplay = document.getElementById('status');
    statusDisplay.textContent = message;
}

function restartGame() {
    startGame();
    localStorage.removeItem('ticTacToeBoard'); // Xóa dữ liệu game trong local storage khi chơi lại
}

// Hiển thị trang chủ khi trang web được tải
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
