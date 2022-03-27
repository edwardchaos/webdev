"use strict"

let timeLeftSpan = document.querySelector("#time-left");
let resultSpan = document.querySelector("#result");
let startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const GRID_HEIGHT=9;
const GRID_WIDTH=9;
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

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

function autoMoveLogs(){
    logsLeft.forEach(log => {moveLogLeft(log)});
    logsRight.forEach(log => {moveLogRight(log)});
    carsLeft.forEach(car => {moveCarLeft(car)});
    carsRight.forEach(car => {moveCarRight(car)});
}

function moveLogLeft(log){
    switch(true){
        case log.classList.contains("l1"):
            log.classList.remove("l1");
            log.classList.add("l2");
            break;
        case log.classList.contains("l2"):
            log.classList.remove("l2");
            log.classList.add("l3");
            break;
        case log.classList.contains("l3"):
            log.classList.remove("l3");
            log.classList.add("l4");
            break;
        case log.classList.contains("l4"):
            log.classList.remove("l4");
            log.classList.add("l5");
            break;
        case log.classList.contains("l5"):
            log.classList.remove("l5");
            log.classList.add("l1");
            break;
    }
}

function moveLogRight(log){
    switch(true){
        case log.classList.contains("l1"):
            log.classList.remove("l1");
            log.classList.add("l5");
            break;
        case log.classList.contains("l2"):
            log.classList.remove("l2");
            log.classList.add("l1");
            break;
        case log.classList.contains("l3"):
            log.classList.remove("l3");
            log.classList.add("l2");
            break;
        case log.classList.contains("l4"):
            log.classList.remove("l4");
            log.classList.add("l3");
            break;
        case log.classList.contains("l5"):
            log.classList.remove("l5");
            log.classList.add("l4");
            break;
    }
}

function moveCarLeft(car){
    switch(true){
        case car.classList.contains("c1"):
            car.classList.remove("c1");
            car.classList.add("c2");
            break;
        case car.classList.contains("c2"):
            car.classList.remove("c2");
            car.classList.add("c3");
            break;
        case car.classList.contains("c3"):
            car.classList.remove("c3");
            car.classList.add("c1");
            break;
    }
}

function moveCarRight(car){
    switch(true){
        case car.classList.contains("c1"):
            car.classList.remove("c1");
            car.classList.add("c3");
            break;
        case car.classList.contains("c2"):
            car.classList.remove("c2");
            car.classList.add("c1");
            break;
        case car.classList.contains("c3"):
            car.classList.remove("c3");
            car.classList.add("c2");
            break;
    }
}

let logLeftInterval = setInterval(autoMoveLogs, 1000);
















