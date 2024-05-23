let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;

let score = 0;
let speedGame = 1000;
let blockSize = 10;
let widthBlocks = width / blockSize;
let heightBlocks = height / blockSize;

function drawBorder() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
}

function drawScore() {
    ctx.font = '20px Courier';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Счет: '+ score, blockSize, blockSize)
}

function gameOver() {
    ctx.font = '60px Courier';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
    clearInterval(interval);
}

drawScore()
drawBorder()

let interval = setInterval(() => {
    ctx.clearRect(0, 0, width, height)
    drawBorder()
    drawScore();
    score++
    gameOver()
    
}, speedGame)





