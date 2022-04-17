"use strict"

export const CELL_SIZE = 20; // vmin
export const CELL_GAP = 2; // vmin

export default class Cell{
    #element
    #row
    #col
    #tile
    #merge_tile

    constructor(cell_element, row, col){
        this.#element = cell_element;
        this.#row = row;
        this.#col = col;
    }
    
    get row(){
        return this.#row;
    }

    get col(){
        return this.#col;
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

    get merge_tile(){
        return this.#merge_tile;
    }

    set merge_tile(tile){
        this.#merge_tile = tile;
        if(tile == null) return;

        this.#merge_tile.row = this.#row;
        this.#merge_tile.col = this.#col;
    }

    canAccept(tile){
        if(this.#tile == null) return true;
        if(this.#tile.value === tile.value && this.merge_tile == null) return true;

        return false;
    }

    empty(){
        return this.#tile == null;
    }

    mergeTiles(){
        if(this.#tile == null) return;
        if(this.#merge_tile == null) return;

        this.#tile.value += this.#merge_tile.value;
        this.#merge_tile.remove();
        this.#merge_tile = null;
    }
}