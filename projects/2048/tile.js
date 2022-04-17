"use strict"

export default class Tile{
    #element
    #row
    #col
    #value

    constructor(grid_element, value=Math.random() > 0.5 ? 2 : 4){
        this.#element = createTileElement();
        grid_element.append(this.#element);
        this.value = value;
    }

    get value(){
        return this.#value;
    }

    set value(value){
        this.#value = value;
        this.#element.textContent = value;

        this.setTileElementColour(value);
    }

    set row(row){
        this.#row = row;
        this.#element.style.setProperty("--row", row);
    }

    set col(col){
        this.#col = col;
        this.#element.style.setProperty("--col", col);
    }

    setTileElementColour(value){
        const power_of_2 = Math.log2(value);
        const background_lightness = 100 - power_of_2*9;
        this.#element.style.setProperty("--background-lightness", `${background_lightness}%`);
        this.#element.style.setProperty("--text-lightness", `${background_lightness < 50 ? 90 : 10}%`);
    }
}

function createTileElement(){
    let element = document.createElement("div");
    element.classList.add("tile");
    return element;
}