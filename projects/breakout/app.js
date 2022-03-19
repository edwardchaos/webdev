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

       this.div = document.createElement('div');
       this.div.style.left = this.x + 'px';
       this.div.style.bottom = this.y + 'px';
       this.div.style.width = this.width + 'px';
       this.div.style.height = this.height + 'px';
    }
    
    addClassList(class_list){
       this.div.classList.add(...class_list);
    }
}

class User extends Block{
    updateXPosition(new_x){
        this.x = new_x;
        this.div.style.left = this.x + 'px';
    }
}

function createAllBlocks(num_rows, num_columns, spacer_px, block_width, block_height){
    const blocks = [];

    for(let i = 0; i < num_rows; ++i){
        let offset_from_grid_bottom = grid_height
                                    - (i+1) * spacer_px
                                    - (i+1) * block_height;

        for(let j = 0; j < num_columns; j++){
            let offset_from_grid_left = (j+1) * spacer_px
                                      + j * block_width

            let block = new Block(offset_from_grid_left,
                                  offset_from_grid_bottom,
                                  block_width,
                                  block_height);
            block.addClassList(block_classlist);
            blocks.push(block);
        }
    }

    return blocks;
}

function addBlocksToGrid(blocks){
    for(let i = 0; i < blocks.length; ++i){
        grid.appendChild(blocks[i].div);
    }
}

let blocks = createAllBlocks(num_block_rows,
                             num_block_columns,
                             block_spacer_px,
                             block_width,
                             block_height);

addBlocksToGrid(blocks);

// USER

const user = new User(user_position[0],
                      user_position[1],
                      user_width,
                      user_height);
user.addClassList(user_classlist);
grid.appendChild(user.div);

function moveUserLeft(){
    user.updateXPosition(Math.max(user.x - 10, 0));
}

function moveUserRight(){
    user.updateXPosition(Math.min(user.x + 10, grid_width - block_width));
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
    reverseVerticalDirection(){
        this.vertical_dy = -this.vertical_dy;
    }
}

const ball = new Ball(ball_circumference, ball_position[0], ball_position[1]);
grid.appendChild(ball.div);

function mainLoop(){
    ball.move();

    handleWallCollisions();
    handleBlockCollisions();
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
    for(let i = 0; i < blocks.length; ++i){
        if(ballContactBlock(ball, blocks[i])){
            grid.removeChild(blocks[i].div);
            blocks.splice(i, 1);
            ball.reverseVerticalDirection();
        }
    }
}

function handleUserCollision(){

}

function ballContactBlock(ball, block){
    let leftmost_min_x = undefined;
    let leftmost_max_x = undefined;
    let other_min_x = undefined;
    let other_max_x = undefined;

    if(ball.x < block.x){
        leftmost_min_x = ball.x;
        leftmost_max_x = ball.x + ball.circumference;
        other_min_x = block.x;
        other_max_x = block.x + block.width;
    }else{
        leftmost_min_x = block.x;
        leftmost_max_x = block.x + block.width;
        other_min_x = ball.x;
        other_max_x = ball.x + ball.circumference;
        // TODO: edge case when they line up
    }

    if(leftmost_min_x != other_min_x){
        // Not an edge case
        if(leftmost_max_x < other_min_x) return false;
        else{
            let lowest_min_y;
            let lowest_max_y;
            let highest_min_y;
            let highest_max_y;

            if(ball.y < block.y){
                lowest_min_y = ball.y;
                lowest_max_y = ball.y + ball.circumference;
                highest_min_y = block.y;
                highest_max_y = block.y + block.height;
            }else{
                lowest_min_y = block.y;
                lowest_max_y = block.y + block.height;
                highest_min_y = ball.y;
                highest_max_y = ball.y + ball.circumference;
            }

            if(lowest_max_y < highest_min_y) return false;
            else return true;
        }
    }

    console.log("edge case.");
}

function ggnore(){
    alert("ggnore");
    clearInterval(main_loop_timer);
}

main_loop_timer = setInterval(mainLoop, 30);
