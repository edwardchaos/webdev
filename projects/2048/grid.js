"use strict"

const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid{
    #cells

    constructor(gridElement){

        gridElement.style.setProperty("--grid-size", GRID_SIZE);
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        this.#cells = createCellElements(gridElement).map(
            (cell, idx) => {
                let col = idx % GRID_SIZE;
                let row = Math.floor(idx / GRID_SIZE);
                return new Cell(cell, row, col);
            }
        )
    }

    get #emptyCells(){
        console.log("emptyCells called");
        return this.#cells.filter(cell => cell.tile == null);
    }

    randomEmptyCell(){
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);

        return this.#emptyCells[randomIndex];
    }
}

class Cell{
    #element
    #row
    #col
    #tile

    constructor(cellElement, row, col){
        this.#element = cellElement;
        this.#row = row;
        this.#col = col;
    }

    get tile(){
        return this.#tile;
    }

    set tile(value){
        this.#tile = value;
        if(value == null) return;

        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }
}

function createCellElements(gridElement){
    const cells = [];

    for(let i = 0; i < GRID_SIZE; ++i){
        for(let j = 0; j < GRID_SIZE; ++j){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cells.push(cell);
            gridElement.append(cell);
        }
    }
    return cells;
}
