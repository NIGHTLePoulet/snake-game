const canvas = document.querySelector('#snake-grid')
const ctx = canvas.getContext('2d')

document.addEventListener('keydown', (e) => {
    const rightArrow = e.key

    if (rightArrow === 'ArrowRight'){
        console.log(rightArrow)
    }
})

function draw() {
    let snake = ctx.fillRect(0, 0, 50, 50)
    return snake
}

draw()