"use strict"

import Grid from "./grid.js"

const gameBoard = document.querySelector("#game-board");

const grid = new Grid(gameBoard);

console.log(grid.randomEmptyCell());

//grid.randomEmptyCell().tile = new Tile(gameBoard);