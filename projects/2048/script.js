"use strict"

import Grid from "./grid.js"
import Tile from "./tile.js"

const game_board = document.querySelector("#game-board");

const grid = new Grid(game_board);

grid.getRandomEmptyCell().tile = new Tile(game_board);
grid.getRandomEmptyCell().tile = new Tile(game_board);