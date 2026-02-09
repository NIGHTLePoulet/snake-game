const canvas = document.querySelector('#snake-grid')
const ctx = canvas.getContext('2d')

let direction = null 
let x = 200
let y = 200
const size = 50


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        direction = 'right'
    } 

    if (e.key === 'ArrowDown') {
        direction = 'up'
    } 

    if (e.key === 'ArrowLeft') {
        direction = 'left'
    } 

    if (e.key === 'ArrowUp') {
        direction = 'down'
    } 
})

function animate() {
    if (direction === 'right') {
        x += 1
    } 

    if (direction === 'up') {
        y += 1
    } 

    if (direction === 'left') {
        x -= 1
    } 

    if (direction === 'down') {
        y -= 1
    } 
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'green'
    ctx.fillRect(x, y, size, size)

    requestAnimationFrame(animate)
}

animate()