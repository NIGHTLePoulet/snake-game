const board = {
    canvas: document.querySelector('#snake-grid'),
    blockSize:  25,
    rows: 20,
    cols: 20
}

const snake = {
    body: [
        {x: 10, y: 10}, // head
        {x: 9, y: 10}, // body
        {x: 8, y: 10} // queue
    ],
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
    if (e.key === 'ArrowRight') snake.direction = 'right'
    if (e.key === 'ArrowLeft') snake.direction = 'left'
    if (e.key === 'ArrowUp') snake.direction = 'up'
    if (e.key === 'ArrowDown') snake.direction = 'down'
})

function drawSnake() {
    // Draw head Snake
    board.ctx.fillStyle = 'green'
    board.ctx.fillRect(
        board.blockSize * snake.body[0].x, 
        board.blockSize * snake.body[0].y, 
        board.blockSize,
        board.blockSize)

    // Draw body snake
    board.ctx.fillRect(
        board.blockSize * snake.body[1].x, 
        board.blockSize * snake.body[1].y, 
        board.blockSize,
        board.blockSize) 

    // Draw queue snake
    board.ctx.fillRect(
        board.blockSize * snake.body[2].x, 
        board.blockSize * snake.body[2].y, 
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

function foodEaten() {
    board.ctx.clearRect(food.x * board.blockSize, food.y * board.blockSize, board.blockSize, board.blockSize)
}

function animation() {
    if (snake.direction === 'right') {
        const newHead = {x: snake.body[0].x + 1, y: snake.body[0].y}
        snake.body.unshift(newHead)
        snake.body.pop()
    }

    if (snake.direction === 'left') {
        const newHead = {x: snake.body[0].x - 1, y: snake.body[0].y}
        snake.body.unshift(newHead)
        snake.body.pop()
    }

    if (snake.direction === 'up') {
        const newHead = {x: snake.body[0].x, y: snake.body[0].y - 1}
        snake.body.unshift(newHead)
        snake.body.pop()
    }

    if (snake.direction === 'down') {
        const newHead = {x: snake.body[0].x, y: snake.body[0].y + 1}
        snake.body.unshift(newHead)
        snake.body.pop()
    }
        
    board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height)

    drawSnake()
    drawFood()

    if ((snake.body[0].x === food.x) && (snake.body[0].y === food.y)) {
        console.log('Eat')
        foodEaten()
        randomFoodGenerator()
    }
}
randomFoodGenerator()
setInterval(animation, 90)
