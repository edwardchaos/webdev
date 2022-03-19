const computer_choice_h2 = document.getElementById('computer-choice')
const user_choice_h2 = document.getElementById('user-choice')
const result_h2 = document.getElementById('result')

let clicked_button_id
let computer_button_id
let result

const buttons = document.querySelectorAll('button')

buttons.forEach(
    buttons => buttons.addEventListener(
        'click',
        (e) => {
            clicked_button_id = e.target.id
            user_choice_h2.innerHTML = clicked_button_id
            generateComputerChoice()
            determineResult()
        }
    )
)

function generateComputerChoice(){
    const random_number = Math.floor(Math.random() * buttons.length) + 1
    
    if(random_number === 1){
        computer_button_id = "rock"
    }
    
    if(random_number === 2){
        computer_button_id = "scissors"
    }
    
    if(random_number === 3){
        computer_button_id = "paper"
    }

    computer_choice_h2.innerHTML = computer_button_id

}

function determineResult(){

    if(computer_button_id === clicked_button_id){
        result = "It's a draw."
    }
    if(computer_button_id === "rock" && clicked_button_id === "paper"){
        result = "You win"
    }
    if(computer_button_id === "rock" && clicked_button_id === "scissors"){
        result = "You lose"
    }
    if(computer_button_id === "paper" && clicked_button_id === "scissors"){
        result = "You win"
    }
    if(computer_button_id === "scissors" && clicked_button_id === "rock"){
        result = "You win"
    }
    if(computer_button_id === "scissors" && clicked_button_id === "paper"){
        result = "You lose"
    }
    if(computer_button_id === "paper" && clicked_button_id === "rock"){
        result = "You lose"
    }

    result_h2.innerHTML = result
}
