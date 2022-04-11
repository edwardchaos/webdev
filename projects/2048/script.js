"use strict"

import Grid from "./grid.js"
import Tile from "./tile.js"

const gameBoard = document.querySelector("#game-board");

const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
//grid.randomEmptyCell().tile = new Tile(gameBoard);