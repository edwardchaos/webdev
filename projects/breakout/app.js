const grid = document.querySelector('.grid');
const grid_width = 560;
const grid_height = 300;
grid.style.width = grid_width + 'px';
grid.style.height = grid_height + 'px';

const block_width = 100;
const block_height = 20;

const user_width = 100;
const user_height = 20;
const user_start = [230, 10];
let user_position = user_start;

let ball_position = [270, 40];
const ball_circumference = 20; // px

// BLOCK
const block_classlist = ['block', 'inside-grid'];
const user_classlist = ['user', 'inside-grid'];
const ball_classlist = ['ball', 'inside-grid'];

class Block{
    constructor(x, y){
       this.bottomLeft = [x, y];
       this.bottomRight = [x + block_width, y];
       this.topLeft = [x, y + block_height]; 
       this.topRight = [x + block_width, y + block_height]; 
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

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

function addBlocksToGrid(blocks){
    for(let i = 0; i < blocks.length; i++){
        const block_div = document.createElement('div');
        block_div.classList.add(...block_classlist);
        block_div.style.left = blocks[i].bottomLeft[0] + 'px';
        block_div.style.bottom = blocks[i].bottomLeft[1] + 'px';
        block_div.style.width = block_width + 'px';
        block_div.style.height = block_height + 'px';
        grid.appendChild(block_div);
    }
}

addBlocksToGrid(blocks);

// USER

const user = document.createElement('div');
user.classList.add(...user_classlist);
user.style.width = user_width + 'px';
user.style.height = user_height + 'px';
user.style.left = user_position[0] + 'px';
user.style.bottom = user_position[1] + 'px';
grid.appendChild(user);

function moveUserLeft(){
    user_position[0] = Math.max(user_position[0]-10, 0)
    user.style.left = user_position[0] + 'px';
}

function moveUserRight(){
    user_position[0] = Math.min(user_position[0]+10, grid_width - block_width)
    user.style.left = user_position[0] + 'px';
}

function keyDownEventCallback(event){
    switch(event.key){
        case 'ArrowLeft':
            moveUserLeft();
            break;
        case 'ArrowRight':
            moveUserRight();
            break;
        default:
    }
}

document.addEventListener("keydown", keyDownEventCallback)

// BALL
const ball = document.createElement('div');
ball.classList.add(...ball_classlist);
ball.style.left = ball_position[0] + 'px';
ball.style.bottom = ball_position[1] + 'px';
ball.style.width = ball_circumference + 'px';
ball.style.height = ball_circumference + 'px';
console.log(Math.round(ball_circumference / 2));
ball.style.borderRadius = Math.round(ball_circumference / 2) + 'px';
grid.appendChild(ball);

// Move ball

// function moveBall();