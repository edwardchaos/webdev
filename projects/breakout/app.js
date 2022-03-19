const grid = document.querySelector('.grid');
const grid_width = 560;
const grid_height = 300;
grid.style.width = grid_width + 'px';
grid.style.height = grid_height + 'px';

const block_width = 100;
const block_height = 20;

const user_width = 100;
const user_height = 20;

// [x_px, y_px] bottom left
let user_position = [grid_width/2 - user_width/2, 10];

let ball_position = [270, 40]; // [x_px, y_px] bottom left
const ball_circumference = 20; // px

// BLOCK
const block_classlist = ['block', 'inside-grid'];
const user_classlist = ['user', 'inside-grid'];
const ball_classlist = ['ball', 'inside-grid'];

class Block{
    /*
    x,y denote the coordinates of the bottom left corner of the block
    x px horizontal offset from the left of grid
    y px vertical offset from the bottom of grid
    */
    constructor(x, y, width, height){
       this.x = x;
       this.y = y;
       this.width = width;
       this.height = height;
    }
}

const blocks = [
    // TODO: create in for loop
    new Block(10, 270, block_width, block_height),
    new Block(120, 270, block_width, block_height),
    new Block(230, 270, block_width, block_height),
    new Block(340, 270, block_width, block_height),
    new Block(450, 270, block_width, block_height),

    new Block(10, 240, block_width, block_height),
    new Block(120, 240, block_width, block_height),
    new Block(230, 240, block_width, block_height),
    new Block(340, 240, block_width, block_height),
    new Block(450, 240, block_width, block_height),

    new Block(10, 210, block_width, block_height),
    new Block(120, 210, block_width, block_height),
    new Block(230, 210, block_width, block_height),
    new Block(340, 210, block_width, block_height),
    new Block(450, 210, block_width, block_height),
]

function addBlocksToGrid(blocks){
    for(let i = 0; i < blocks.length; i++){
        const block_div = document.createElement('div');
        block_div.classList.add(...block_classlist);
        block_div.style.left = blocks[i].x + 'px';
        block_div.style.bottom = blocks[i].y + 'px';
        block_div.style.width = blocks[i].width + 'px';
        block_div.style.height = blocks[i].height + 'px';
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
ball.style.borderRadius = Math.round(ball_circumference / 2) + 'px';
grid.appendChild(ball);

// Move ball

// function moveBall();