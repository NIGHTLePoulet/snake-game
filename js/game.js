const restartBtn = document.querySelector('.btn-rst')
const playBtn = document.querySelector('.btn-play')
const board = {
    canvas: document.querySelector('#snake-grid'),
    blockSize:  25,
    rows: 20,
    cols: 20,
    start: false
}

let snake = {
    body: [
        {x: 10, y: 10}, // head
        {x: 9, y: 10}, // body
        {x: 8, y: 10} // queue
    ],
    direction: null,
    dead: false
}

let food = {
    x: null,
    y: null
}

board.ctx = board.canvas.getContext('2d') // Used for drawing on the board 
board.canvas.height = board.rows * board.blockSize 
board.canvas.width = board.cols * board.blockSize

document.addEventListener('keydown', (e) => {
    if (board.start) {
        if (e.key === 'ArrowRight') snake.direction = 'right'
        if (e.key === 'ArrowLeft') snake.direction = 'left'
        if (e.key === 'ArrowUp') snake.direction = 'up'
        if (e.key === 'ArrowDown') snake.direction = 'down'
    }
})

restartBtn.addEventListener('click', () => {
    resetGame()
})

playBtn.addEventListener('click', () => {
    board.start = true
    snake.direction = 'right'
})

function resetGame() {
    snake = {
        body: [
            {x: 10, y: 10}, // head
            {x: 9, y: 10}, // body
            {x: 8, y: 10} // queue
        ],
        direction: null,
        dead: false
    }

    food = {
        x: null,
        y: null
    }
    game()
}

function drawSnake() {
    board.ctx.fillStyle = '#00c950'
    board.ctx.beginPath()
        board.ctx.roundRect(
            board.blockSize * snake.body[0].x, 
            board.blockSize * snake.body[0].y, 
            board.blockSize-2,
            board.blockSize-2, 
            6
        )
        board.ctx.fill();
    for (let i = 1; i < snake.body.length; i++) {
        board.ctx.beginPath()
        board.ctx.roundRect(
            board.blockSize * snake.body[i].x, 
            board.blockSize * snake.body[i].y, 
            board.blockSize-2,
            board.blockSize-2, 
            4
        )
        board.ctx.fill();
    }
}

function drawFood() {
    board.ctx.fillStyle = '#fb2c36ed'
    board.ctx.beginPath()
        board.ctx.roundRect(
            board.blockSize * food.x, 
            board.blockSize * food.y, 
            board.blockSize-2,
            board.blockSize-2, 
            4
        )
    board.ctx.fill();
}

function randomFoodGenerator() {
    food.x = Math.floor(Math.random() * board.cols) 
    food.y = Math.floor(Math.random() * board.rows)
}

function verifyFoodEaten() {
    if ((snake.body[0].x === food.x) && (snake.body[0].y === food.y)) {
        foodEaten()
        randomFoodGenerator()
        return true
    }
    return false
}

function foodEaten() {
    board.ctx.clearRect(food.x * board.blockSize, food.y * board.blockSize, board.blockSize, board.blockSize)
    
}

function checkBoardCollision() {
    if ((snake.body[0].x * board.blockSize >=  board.canvas.width) || (snake.body[0].x * board.blockSize <  0) || (snake.body[0].y * board.blockSize >=  board.canvas.height) || (snake.body[0].y * board.blockSize <  0)) {
            snake.dead = true
        }
}

function checkSelfCollision() {
    const head = snake.body[0]

    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            snake.dead = true 
        }
    }
}

function animation() {
    const foodEaten = verifyFoodEaten()

    if (snake.direction === 'right') {
        const newHead = {x: snake.body[0].x + 1, y: snake.body[0].y}
        snake.body.unshift(newHead)
        if (!foodEaten) {
            snake.body.pop()
        }
    }

    if (snake.direction === 'left') {
        const newHead = {x: snake.body[0].x - 1, y: snake.body[0].y}
        snake.body.unshift(newHead)
        if (!foodEaten) {
            snake.body.pop()
        }
    }

    if (snake.direction === 'up') {
        const newHead = {x: snake.body[0].x, y: snake.body[0].y - 1}
        snake.body.unshift(newHead)
        if (!foodEaten) {
            snake.body.pop()
        }
    }

    if (snake.direction === 'down') {
        const newHead = {x: snake.body[0].x, y: snake.body[0].y + 1}
        snake.body.unshift(newHead)
        if (!foodEaten) {
            snake.body.pop()
        }
    }



    board.ctx.clearRect(0, 0, board.canvas.width, board.canvas.height)

    drawSnake()
    drawFood()

}

function loopGame() {
    randomFoodGenerator()
    const loop = setInterval(() => {
        animation()
        checkSelfCollision()
        checkBoardCollision()
        if (snake.dead) {
            clearInterval(loop)
            return
        }
    }, 90)
}


function game() {
    loopGame()
}

game()