"use strict"

export default class Tile{
    #element
    #row
    #col
    #value

    constructor(tileContainer, value=Math.random() > 0.5 ? 2 : 4){
        this.#element = document.createElement("div");
        this.#element.classList.add("tile");
        tileContainer.append(this.#element);
        this.value = value;
    }

    set value(v){
        this.#value = v;
        this.#element.textContent = v;
        const power = Math.log2(v);
        const backgroundLightness = 100 - power*9;
        this.#element.style.setProperty("--background-lightness", `${backgroundLightness}%`);
        this.#element.style.setProperty("--text-lightness", `${backgroundLightness < 50 ? 90 : 10}%`);
    }

    set row(row){
        this.#row = row;
        this.#element.style.setProperty("--row", row);
    }

    set col(col){
        this.#col = col;
        this.#element.style.setProperty("--col", col);
    }
}