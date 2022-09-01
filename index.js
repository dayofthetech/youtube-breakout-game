//find the class of grid
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const userStart = [230, 10]
let currentPosition = userStart

//start position of the ball
const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
let score = 0

//my block
class Block {
  //this is the botton left of the block
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

//all my blocks
const blocks = [
  //the numbers inside the Blocks class are the
  //points of the bottom corner, that why the first 5 have the same 270
  //you are moving sideways,
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  //the next five, moved one row down and then sideways
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
]

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    //js to create an element, in this example, its creating a div
    //which in turn is a block
    const block = document.createElement('div')
    //now from that block var above, you are adding a new class, in this case
    //class of block, which is automatically styled from the css
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    //now after grabbing that grid class element, you are appending the
    //block characteristics, or styling in this case
    //so from here, you are able to create an element and givin it a class,
    //you don't necessarily have to get all the elements in the html
    //now grid, which is a div, you are appending block which is a class
    //<div class "block">
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

//add user to the screen
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
//this creates a div within the html doc
const ball = document.createElement('div')
ball.classList.add('ball')
//we are putting the ball, inside the parent of grid, grid in itself is a div
grid.appendChild(ball)
//this drawBall function is used more than one.
drawBall()

//move user
function moveUser(e) {
  //this is to listen for left or right
  switch (e.key) {
    case 'ArrowLeft':
      //by clicking on left arrow
      if (currentPosition[0] > 0) {
        //and as long the position is not pass the edge
        currentPosition[0] -= 10
        console.log(currentPosition[0] > 0)
        drawUser()
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 10
        console.log(currentPosition[0])
        drawUser()
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    //after changing the position of the ball, you redraw it
    //for example, the ball new position is what describe above
    //redraw it
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      //if the ball Xaxis is larger than block Xaxis but smaller than right Xaxis
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0]
        && ballCurrentPosition[0] < blocks[i].bottomRight[0])
        &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1]
      && ballCurrentPosition[1] < blocks[i].topLeft[1])
    )
      { //this is within the first if
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      //and after the ball touches the i block, which i block is whatever block you are dealing with
      allBlocks[i].classList.remove('block')
      //by doing splice, you remove the index of i block
      //if the ball hits block 3 then it splice remove 3
      blocks.splice(i,1)
      //and once remove, you change direction
      changeDirection()
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        //this will display text on the html
        scoreDisplay.innerHTML = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight )
  )
  {
    changeDirection()
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}
