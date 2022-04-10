"use strict"

document.addEventListener("DOMContentLoaded",() => {

    let squares = document.querySelectorAll(".grid div");
    let current_player = document.querySelector("#current-player");
    let result = document.querySelector("#result");

    squares.forEach((square)=>{
        square.onclick = clickSquare;
    });

    function clickSquare(){
        console.log("clicked square.");
    }

});
