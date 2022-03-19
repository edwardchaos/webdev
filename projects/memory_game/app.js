const card_array = [

    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },

]

let clicked_cards = []
let clicked_card_ids = []
const cards_won = []

card_array.sort(
    () => 0.5 - Math.random()
)

const grid = document.querySelector("#grid") // Find grid div by id
const score_h3 = document.querySelector("#score_h3")

console.log(grid)

function createBoard(){

    for(let i = 0; i < card_array.length; i++){
        const card_img = document.createElement("img")
        card_img.setAttribute("src", "images/blank.png")
        card_img.setAttribute("data_id", i)
        card_img.addEventListener("click", flipCard)

        grid.append(card_img)
    }

}

createBoard()

function checkMatch(){
    const all_grid_imgs = document.querySelectorAll("#grid img") // Look in id grid, all img

    const first_card_id = clicked_card_ids[0] 
    const second_card_id = clicked_card_ids[1]

    if(first_card_id == second_card_id){
        alert("You clicked the same card.")
        all_grid_imgs[first_card_id].setAttribute("src", "images/blank.png")
        all_grid_imgs[second_card_id].setAttribute("src", "images/blank.png")
        clicked_cards = []
        clicked_card_ids = []
        return
    }

    const first_card_name = clicked_cards[0]
    const second_card_name = clicked_cards[1]

    if(first_card_name == second_card_name){
        all_grid_imgs[first_card_id].setAttribute("src", "images/white.png")
        all_grid_imgs[second_card_id].setAttribute("src", "images/white.png")
        all_grid_imgs[first_card_id].removeEventListener("click", flipCard)
        all_grid_imgs[second_card_id].removeEventListener("click", flipCard)
        cards_won.push(clicked_cards);
    }else{
        all_grid_imgs[first_card_id].setAttribute("src", "images/blank.png")
        all_grid_imgs[second_card_id].setAttribute("src", "images/blank.png")
    }
    score_h3.textContent = cards_won.length

    clicked_cards = []
    clicked_card_ids = []

    if(cards_won.length == card_array.length/2){
        score_h3.textContent = "Concrats you are winner"
    }
}

function flipCard(){
    const data_id = this.getAttribute("data_id")
    const card_name = card_array[data_id].name
    const img_src = card_array[data_id].img

    clicked_cards.push(card_name)
    clicked_card_ids.push(data_id)

    this.setAttribute("src", img_src)

    if(clicked_cards.length === 2){
        setTimeout(checkMatch, 100) // ms
    }
}
