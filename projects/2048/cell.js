"use strict"

export const CELL_SIZE = 20; // vmin
export const CELL_GAP = 2; // vmin

export default class Cell{
    #element
    #row
    #col
    #tile

    constructor(cell_element, row, col){
        this.#element = cell_element;
        this.#row = row;
        this.#col = col;
    }

    get tile(){
        return this.#tile;
    }

    set tile(tile){
        this.#tile = tile;
        if(tile == null) return;

        this.#tile.row = this.#row;
        this.#tile.col = this.#col;
    }

    empty(){
        return this.#tile == null;
    }
}