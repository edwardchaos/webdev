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

async function keyPressed(event){
    switch(event.key){
        case "ArrowUp":
            if(!canMoveUp()){
                setupInput();
                return;
            }
            await moveUp();
            break;
        case "ArrowDown":
            if(!canMoveDown()){
                setupInput();
                return;
            }
            await moveDown();
            break;
        case "ArrowLeft":
            if(!canMoveLeft()){
                setupInput();
                return;
            }
            await moveLeft();
            break;
        case "ArrowRight":
            if(!canMoveRight()){
                setupInput();
                return;
            }
            await moveRight();
            break;
        default:
            await setupInput();
            return;
    }

    // Ohter stuff
    grid.cells.forEach(cell => cell.mergeTiles());

    const new_tile = new Tile(game_board);
    grid.getRandomEmptyCell().tile = new_tile;

    if(!canMoveUp() && !canMoveDown() && !canMoveRight() && !canMoveLeft()){
        new_tile.waitForTransition(true).then(()=>{
            alert("You lose");
        });
    }else{
        setupInput();
    }
}

function canMoveUp(){
    return canMove(grid.cellsByColumn);
}
function canMoveDown(){
    return canMove(grid.cellsByColumn.map(col=>[...col].reverse()));
}
function canMoveLeft(){
    return canMove(grid.cellsByRow);
}
function canMoveRight(){
    return canMove(grid.cellsByRow.map(row=>[...row].reverse()));
}

function canMove(cells){
    return cells.some(group => {
        return group.some((cell, idx) => {
            if(cell.tile == null) return false;
            if(idx == 0) return false;

            const move_to_cell = group[idx-1];
            return move_to_cell.canAccept(cell);
        });
    });
}

function moveUp(){
    return slideTiles(grid.cellsByColumn);
}

function moveDown(){
    return slideTiles(grid.cellsByColumn.map(col => [...col].reverse()));
}

function moveLeft(){
    return slideTiles(grid.cellsByRow);
}

function moveRight(){
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

function slideTiles(cells){
    return Promise.all(
    cells.flatMap(group => {
        const promises = [];
        for(let i = 1; i < group.length; ++i){
            const cell = group[i];
            if(cell.tile == null) continue;
            let last_valid_cell;
            for(let j = i-1; j >= 0 ; --j){
                const move_to_cell = group[j];
                if(!move_to_cell.canAccept(cell.tile)) break;
                last_valid_cell = move_to_cell;
            }
            if(last_valid_cell == null) continue;

            promises.push(cell.tile.waitForTransition());

            // Move cell to last valid cell location
            if(last_valid_cell.tile != null){
                last_valid_cell.merge_tile = cell.tile;
            }else{
                last_valid_cell.tile = cell.tile;
            }

            cell.tile = null;
        }
        return promises;
    }))
}

