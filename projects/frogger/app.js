"use strict"

let timeLeftSpan = document.querySelector("#time-left");
let resultSpan = document.querySelector("#result");
let startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const GRID_HEIGHT=9;
const GRID_WIDTH=9;

let currentPosition = {x: 8, y: 4};

function positionToGridIdx({x, y} = {}){
    if(x===undefined || y===undefined) return -1;
    return x*GRID_WIDTH+y;
}

function getGridIdx(){return positionToGridIdx(currentPosition)};

function moveFrog(event){
    undrawFrog();

    switch(event.key){
        case 'ArrowLeft':
            currentPosition.y = Math.max(0, currentPosition.y-1);
            break;
        case 'ArrowRight':
            currentPosition.y = Math.min(GRID_WIDTH-1, currentPosition.y+1);
            break;
        case 'ArrowUp':
            currentPosition.x = Math.max(0, currentPosition.x-1);
            break;
        case 'ArrowDown':
            currentPosition.x = Math.min(GRID_HEIGHT-1, currentPosition.x+1);
            break;
        default:
            return;
    }

    drawFrog();
}

function undrawFrog(){
    squares[getGridIdx()].classList.remove("frog");
}

function drawFrog(){
    squares[getGridIdx()].classList.add("frog");
}

document.addEventListener("keyup", moveFrog);
