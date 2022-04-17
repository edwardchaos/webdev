"use strict"

import Cell from "./cell.js"
import { CELL_SIZE, CELL_GAP } from "./cell.js";

const GRID_SIZE = 4;

export default class Grid{
    #cell_objects

    constructor(grid_element){

        grid_element.style.setProperty("--grid-size", GRID_SIZE);
        grid_element.style.setProperty("--cell-size", `${CELL_SIZE}vmin`);
        grid_element.style.setProperty("--cell-gap", `${CELL_GAP}vmin`);

        let cell_elements = createCellElements(GRID_SIZE);
        cell_elements.forEach(cell_element => grid_element.append(cell_element));

        this.#cell_objects = createCellObjectsFromElements(cell_elements, GRID_SIZE);

    }

    get #emptyCells(){
        return this.#cell_objects.filter(cell => cell.empty());
    }

    getRandomEmptyCell(){
        const currentlyEmptyCells = this.#emptyCells;
        const randomIndex = Math.floor(Math.random() * currentlyEmptyCells.length);

        return currentlyEmptyCells[randomIndex];
    }

    get cellsByColumn(){
        return this.#cell_objects.reduce(

            (cell_columns, cell) => {
                if(cell_columns[cell.col] == null) cell_columns[cell.col] = [];
                cell_columns[cell.col].push(cell);
                return cell_columns;
            },[]);
    }

    get cellsByRow(){
        return this.#cell_objects.reduce(

            (cell_rows, cell) => {
                if(cell_rows[cell.row] == null) cell_rows[cell.row] = [];
                cell_rows[cell.row][cell.col] = cell;
                return cell_rows;
            }, []);

    }
}

function createCellElements(grid_size){
    const cells = [];

    for(let i = 0; i < grid_size; ++i){
        for(let j = 0; j < grid_size; ++j){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cells.push(cell);
        }
    }
    return cells;
}

function createCellObjectsFromElements(cell_elements, grid_size){
    const cell_objects = cell_elements.map(
        (cell_element, idx) => {
            let row = Math.floor(idx / grid_size);
            let col = idx % grid_size;
            return new Cell(cell_element, row, col);
        }
    )

    return cell_objects;
}