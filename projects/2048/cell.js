"use strict"

export const CELL_SIZE = 20; // vmin
export const CELL_GAP = 2; // vmin

export default class Cell{
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