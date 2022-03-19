const squares = document.querySelectorAll(".square")

const mole = document.querySelector(".mole")

const time_remaining_h2 = document.querySelector("#time_remaining")

const score_h2 = document.querySelector("#score")

let result = 0
let mole_square_id
let timeleft = 5 
let mole_move_timer = null

moveMoleOnTimer()

function moveMoleOnTimer(){
    mole_move_timer = setInterval(teleportMole, 500)
}

function teleportMole(){
    removeAllMoles()
    addMoleOnSquare(getRandomSquare())
}

function removeAllMoles(){
    squares.forEach(
        square => {
            square.classList.remove("mole")
        }
    )
}

function getRandomSquare(){
    let random_idx = Math.floor(Math.random() * squares.length)

    let random_square = squares[random_idx]

    return random_square
}

function addMoleOnSquare(square){
    square.classList.add("mole")
    mole_square_id = square.id
}

function squareClickEvent(event){
    square_id = event.target.id
    if(square_id == mole_square_id){
        result++
        score_h2.textContent = result
        mole_square_id = null
    }
}

squares.forEach(
    square => {
        square.addEventListener(
            "mousedown",
            squareClickEvent)
    }
)

function countDown(){
    timeleft--
    time_remaining_h2.textContent = timeleft

    if(timeleft == 0){
        alert("Times up! your score is: " + result)
        destructor()
    }
}

countdown_timer = setInterval(countDown, 1000)

function destructor(){
    clearInterval(countdown_timer)
    clearInterval(mole_move_timer)
    removeClickEventListeners()
}

function removeClickEventListeners(){
    squares.forEach(
        square => {
            square.removeEventListener("mousedown", squareClickEvent)
        }
    )
}