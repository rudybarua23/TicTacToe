(function() {
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('grid-container');
    const clear = document.getElementById('clear');
    let gameboard = ["","","","","","","","",""];
    let currentPlayer = "X";

    function generateGrid() {
        container.innerHTML = '';
        gameboard.forEach((_, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.index = index;
            gridItem.addEventListener('click', cellClick, { once: true });
            container.appendChild(gridItem);
        });
    }

    generateGrid();

    function cellClick(e) {
        const cellIndex = e.target.dataset.index;
        gameboard[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;
        
        setTimeout(() => {
        if (checkWin(currentPlayer)) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
            return;
        } else if (checkDraw()) {
            alert("It's a draw!");
            resetGame();
            return;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; //This line effectively says, "If currentPlayer is currently 'X', set currentPlayer to 'O'. Otherwise, set currentPlayer to 'X'."
        }
        }, 10);
    }

    function checkWin(player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];
        return winConditions.some(condition => {
            return condition.every(index => {
                return gameboard[index] === player;
            });
        });
    }
    
    // Checks for a draw condition
    function checkDraw() {
        return gameboard.every(cell => cell !== "");
    }
    
    // Resets the game to its initial state
    function resetGame() {
        gameboard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        generateGrid(); // Re-initialize the gameboard UI
    }

    document.getElementById('clear').addEventListener('click', resetGame);
})
})();