let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let turnO = true;
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

const winPatterns = [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],

    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],

    [0, 5, 10, 15], [3, 6, 9, 12]
];

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = 'O';
                box.style.color = 'green';
                turnO = false;
            } else {
                box.innerText = 'X';
                box.style.color = 'black';
                turnO = true;
            }
            box.disabled = true;
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const checkWinner = () => {
    let hasWin = false;
    for (let pattern of winPatterns) {
        let [a, b, c, d] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;
        let pos4Val = boxes[d].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val && pos3Val === pos4Val) {
            showWinner(pos1Val);
            hasWin = true;
            return;
        }
    }

    if (!hasWin) {
        const allBoxesFilled = [...boxes].every(box => box.innerText !== "");
        if (allBoxesFilled) {
            msg.innerText = 'Match Drawn';
            msgContainer.classList.remove('hide');
        }
    }
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hide');
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
