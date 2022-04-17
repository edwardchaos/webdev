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
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            setupInput();
            return;
    }

    // Ohter stuff
    grid.getRandomEmptyCell().tile = new Tile(game_board);

    setupInput();
}

function moveUp(){
    slideTiles(grid.cellsByColumn);
}

function moveDown(){
    slideTiles(grid.cellsByColumn.map(col => [...col].reverse()));
}

function moveLeft(){
    slideTiles(grid.cellsByRow);
}

function moveRight(){
    slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function slideTiles(cells){
    cells.forEach(group => {
        for(let i = 1; i < group.length; ++i){
            const cell = group[i];
            if(cell.tile == null) continue;
            let last_valid_cell;
            for(let j = i-1; j >= 0 ; --j){
                const move_to_cell = group[j];
                if(!move_to_cell.canAccept(cell)) break;
                last_valid_cell = move_to_cell;
            }
            if(last_valid_cell == null) continue;

            // Move cell to last valid cell location
            if(last_valid_cell.tile != null){
                last_valid_cell.merge_tile = cell.tile;
            }else{
                last_valid_cell.tile = cell.tile;
            }

            cell.tile = null;
        }
    })
}

