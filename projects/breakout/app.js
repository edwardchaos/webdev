const grid = document.querySelector('.grid');
const grid_width = 560;
const grid_height = 300;
grid.style.width = grid_width + 'px';
grid.style.height = grid_height + 'px';

const num_block_rows = 3;
const num_block_columns = 5;
const block_spacer_px = 10;
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

function createAllBlocks(num_rows, num_columns, spacer_px, block_width, block_height){
    const blocks = [];

    for(let i = 0; i < num_block_rows; i++){
        let offset_from_grid_bottom = grid_height
                                    - (i+1) * block_spacer_px
                                    - (i+1) * block_height;

        for(let j = 0; j < num_block_columns; j++){
            let offset_from_grid_left = (j+1) * block_spacer_px
                                    + j * block_width

            blocks.push(new Block(offset_from_grid_left,
                                offset_from_grid_bottom,
                                block_width,
                                block_height));
        }
    }

    return blocks;
}

let blocks = createAllBlocks(num_block_rows,
                             num_block_columns,
                             block_spacer_px,
                             block_width,
                             block_height);

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

function createUser(user_width, user_height, offset_from_left, offset_from_bottom){
    const user = document.createElement('div');
    user.classList.add(...user_classlist);
    user.style.width = user_width + 'px';
    user.style.height = user_height + 'px';
    user.style.left = offset_from_left + 'px';
    user.style.bottom = offset_from_bottom + 'px';

    return user;
}

const user = createUser(user_width, user_height, user_position[0], user_position[1]);
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

class Ball{
    constructor(circumference_px, offset_from_left, offset_from_bottom){
        this.vertical_dy = 2;
        this.horizontal_x = 2;

        this.x = offset_from_left;
        this.y = offset_from_bottom;
        this.circumference = circumference_px;

        this.div = document.createElement('div');
        this.div.classList.add(...ball_classlist);
        this.div.style.left = this.x + 'px';
        this.div.style.bottom = this.y + 'px';
        this.div.style.width = this.circumference + 'px';
        this.div.style.height = this.circumference + 'px';
        this.div.style.borderRadius = Math.round(this.circumference / 2) + 'px';
    }

    move(){
        this.x += this.horizontal_x;
        this.y += this.vertical_dy;
        this.div.style.left = this.x + 'px';
        this.div.style.bottom = this.y + 'px';
    }

    setHorizontalDirectionLeft(){
        this.horizontal_x = -2;
    }
    setHorizontalDirectionRight(){
        this.horizontal_x = 2;
    }
    setVerticalDirectionUp(){
        this.vertical_dy = 2;
    }
    setVerticalDirectionDown(){
        this.vertical_dy = -2;
    }
}

const ball = new Ball(ball_circumference, ball_position[0], ball_position[1]);
grid.appendChild(ball.div);

function mainLoop(){
    ball.move();

    // Check for collision with wall
    handleWallCollisions();

    // Check for collision with blocks
    handleBlockCollisions();

    // Check for collision with user
    handleUserCollision();
}

function handleWallCollisions(){
    if(rightWallCollision()) ball.setHorizontalDirectionLeft();
    else if(leftWallCollision()) ball.setHorizontalDirectionRight();

    if(topWallCollision()) ball.setVerticalDirectionDown();
    else if(floorCollision()) ggnore();
}

function rightWallCollision(){
    return ball.x >= grid_width - ball.circumference
}

function leftWallCollision(){
    return ball.x <= 0;
}

function topWallCollision(){
    return ball.y >= grid_height - ball.circumference;
}

function floorCollision(){
    return ball.y <= 0;
}

function handleBlockCollisions(){

}

function handleUserCollision(){

}

function ggnore(){
    alert("ggnore");
    clearInterval(main_loop_timer);
}

main_loop_timer = setInterval(mainLoop, 30);
