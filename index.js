let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width;
let height = canvas.height;

let score = 0; // Количество очков
let speedGame = 1000; // Скорость игры
let blockSize = 10; // Размер блока
let widthBlocks = width / blockSize; // Ширина блоков 
let heightBlocks = height / blockSize; // Высота блоков

function drawBorder() { // Рисует рамку
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
}

function drawScore() { // Рисует колличество очков
    ctx.font = '20px Courier';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Счет: '+ score, blockSize, blockSize)
}

function gameOver() { // Рисует gameOver
    ctx.font = '60px Courier';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', width / 2, height / 2);
    clearInterval(interval);
}

let Block = function(col, row) { // Создает блок с размерами
    this.col = col;
    this.row = row;
}

let simpleBlock = new Block(38, 20); // Позиция простого блока
let simpleBlockTwo = new Block(25, 20)

Block.prototype.drawSquare = function(color) { // Создает квадратный блок
    let x = this.col * blockSize;
    let y = this.row * blockSize;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
}

Block.prototype.drawCircle = function(color, isFill) { // Создает круглый блок
    let centerX = this.col * blockSize + blockSize  /2;
    let centerY = this.row * blockSize + blockSize  /2;

    ctx.beginPath()
    ctx.fillStyle = color;
    ctx.arc(centerX,centerY, blockSize / 2, 0, Math.PI * 2, false )

    if(isFill) {
        ctx.fill();
    }else{
        ctx.stroke()
    }
}

Block.prototype.equal = function(otherBlock) { // Проверяет находятся ли блоки в одном месте
    return this.col === otherBlock.col && this.row === otherBlock.row;
}
    
let Snake = function() { // Объект змейки с ее частями
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ]

    this.direction = 'rigth';
    this.newDirection = 'right';
    
}

drawBorder();

Snake.prototype.draw = function() { // Функция отрисовки частей змейки
    for(let i = 0; i<this.segments.length; i++){
        this.segments[i].drawSquare('blue'); // new Block.drawSquert()
    }
}

Snake.prototype.move = function() { // Функция движения змейки
    let head = this.segments[0]; // Голова змейки
    let newHead; // Новая голова
    
    this.direction = this.newDirection; // Направление змейки

    if(this.direction === 'right') {
        newHead = new Block(head.col + 1, head.row);
    }else if(this.direction === 'left') {
        newHead = new Block(head.col - 1, head.row);
    }else if(this.direction === 'up') {
        newHead = new Block(head.col, head.row - 1);
    }else if(this.direction === 'down') {
        newHead = new Block(head.col, head.row + 1);
    }

    if(this.checkCoollision(newHead)) { // Проверка попадания в себя или в стену
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if(newHead.equal(apple.position)){
        score++
        apple.move();
    }else{
        this.segments.pop()
    }
}

Snake.prototype.checkCoollision = function(head) { // Функция проверки столкновений
    let leftCoolision = (head.col === 0);
    let topCoolision = (head.row === 0);
    let rightCoolision = (head.col === widthBlocks - 1);
    let bottomCoolision = (head.row === widthBlocks -1);

    let wallCollision = leftCoolision || topCoolision || rightCoolision || bottomCoolision;

    let selfCollision = false;

    for(let i = 0; i<this.segments.length; i++) {
        if(head.equal(this.segments[i])) {
            selfCollision = true;
        }
    }
    return wallCollision || selfCollision;
}

Snake.prototype.setDirection = function(newDirection) {
    
    if(this.direction === 'up' && newDirection === 'down') {
        return;
    }else if(this.direction === 'right' && newDirection === 'left'){
        return
    }else if(this.direction === 'left' && newDirection === 'right'){
        return
    }else if(this.direction === 'down' && newDirection === 'up'){
        return
    }

    this.newDirection = newDirection;
}

 let direction = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
 }

 document.querySelector('body').addEventListener('keydown', (event) => {
    let newDirection = direction[event.keyCode];
    if(newDirection !== undefined) {
        snake.setDirection(newDirection);
    }
 })

 let Apple = function() {
    this.position = new Block(10, 10);
 }

 Apple.prototype.draw = function() {
    this.position.drawCircle('LimeGreen', true);
 }

 Apple.prototype.move = function() {
    let randomCol = Math.floor(Math.random() * (widthBlocks - 2) + 1);
    let randomRow = Math.floor(Math.random() * (heightBlocks - 2) + 1);
    this.position = new Block(randomCol, randomRow);
 }

 let snake = new Snake();
 let apple = new Apple()

 let interval = setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    drawScore();
    snake.move();
    snake.draw();
    apple.draw();
    drawBorder();
   
 }, 100)







