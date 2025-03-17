document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let cells = Array(9).fill(null);
    let isXNext = true;

    const renderBoard = () => {
        board.innerHTML = "";
        cells.forEach((value, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = value;
            cell.addEventListener("click", () => handleMove(index));
            board.appendChild(cell);
        });
    };

    const handleMove = (index) => {
        if (cells[index] || checkWinner()) return;
        cells[index] = isXNext ? "X" : "O";
        isXNext = !isXNext;
        updateStatus();
        renderBoard();
    };

    const checkWinner = () => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let line of lines) {
            const [a, b, c] = line;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }
        return null;
    };

    const updateStatus = () => {
        const winner = checkWinner();
        if (winner) {
            status.textContent = `Winner: ${winner}`;
        } else {
            status.textContent = `Next player: ${isXNext ? "X" : "O"}`;
        }
    };

    resetButton.addEventListener("click", () => {
        cells = Array(9).fill(null);
        isXNext = true;
        status.textContent = "Next player: X";
        renderBoard();
    });

    renderBoard();
});
