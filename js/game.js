const board = {
    canvas: document.querySelector('#snake-grid'),
    blockSize:  25,
    rows: 20,
    cols: 20
}

const snake = {
    x: 10, // middle of the width
    y: 10, // middle of the heigt
    direction: null,
}

const food = {
    x: null,
    y: null
}

board.ctx = board.canvas.getContext('2d') // Used for drawing on the board 
board.canvas.height = board.rows * board.blockSize 
board.canvas.width = board.cols * board.blockSize

document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 'ArrowRight') snake.direction = 'right'
    if (e.key === 'ArrowLeft') snake.direction = 'left'
    if (e.key === 'ArrowUp') snake.direction = 'up'
    if (e.key === 'ArrowDown') snake.direction = 'down'
})

function drawSnake() {
    // Draw head Snake
    board.ctx.fillStyle = 'green'
    board.ctx.fillRect(
        board.blockSize * snake.x, 
        board.blockSize * snake.y, 
        board.blockSize,
        board.blockSize) 
}

function drawFood() {
    // Draw food 
    board.ctx.fillStyle = 'red'
    board.ctx.fillRect(
        board.blockSize * food.x, 
        board.blockSize * food.y, 
        board.blockSize,
        board.blockSize)
}


function randomFoodGenerator() {
    food.x = Math.floor(Math.random() * board.cols) 
    food.y = Math.floor(Math.random() * board.rows)
}


function animation() {
    if (snake.direction === 'right') snake.x += 1
    if (snake.direction === 'left') snake.x -= 1
    if (snake.direction === 'up') snake.y -= 1
    if (snake.direction === 'down') snake.y += 1
    
    board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height)

    drawSnake()
    drawFood()
     
}
randomFoodGenerator()
setInterval(animation, 100)
