"use strict"

import Grid from "./grid.js"
import Tile from "./tile.js"

const game_board = document.querySelector("#game-board");

const grid = new Grid(game_board);

grid.getRandomEmptyCell().tile = new Tile(game_board);
grid.getRandomEmptyCell().tile = new Tile(game_board);

setupInput();

function setupInput(){
    window.addEventListener("keydown", keyPressed, {once: true});
}

function keyPressed(event){
    switch(event.key){
        case "ArrowUp":
            console.log("up");
            break;
        case "ArrowDown":
            console.log("down");
            break;
        case "ArrowLeft":
            console.log("left");
            break;
        case "ArrowRight":
            console.log("right");
            break;
        default:
            break;
    }

}