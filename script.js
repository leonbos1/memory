var gridSize = 2;
var gridIndexes = []

window.onload = function() {
    timePassed();

    let grid = document.getElementById("grid");
    for (let i = 0; i < (gridSize**2); i++) {    
        grid.innerHTML += `<div id=card-${i} class="closed card" tabindex="0" aria-label="closed card">
        <img id=card-${i}-img></img>
        </div>`;
        gridIndexes.push(i);
    }

    var charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    for (let j = 0; j < (gridSize**2/2); j++) {
        //index for choosing random letter
        let randomIndex = Math.floor(Math.random() * charArray.length);
        let randomLetter = charArray.splice(randomIndex, 1)

        //choosing random grid card
        
        randomIndex = Math.floor(Math.random() * gridIndexes.length);
        i1 = gridIndexes.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * gridIndexes.length);
        i2 = gridIndexes.splice(randomIndex, 1);
        getPicsumImage(i1, i2)
        document.getElementById(`card-${i1}`).classList.add(`card-${randomLetter}`)
        document.getElementById(`card-${i2}`).classList.add(`card-${randomLetter}`)

    }

    var cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", openCard);

        cards[i].addEventListener("keypress", function(key) {
            if (key.key == 'Enter') {
                openCard(key);
            }
        });
    }
};

function getPicsumImage(i1, i2){
    fetch("https://picsum.photos/200/300")
    .then(response => {
        el = document.getElementById(`card-${i1}-img`)
        el.src = response.url
        el = document.getElementById(`card-${i2}-img`)
        el.src = response.url
    })
}

var selectedCards = [];

function openCard(event){
    let current = event.currentTarget;
    if (current.classList.contains('closed')){
        if (selectedCards.length === 2){
            changeCards('open', 'closed');
        }

        current.classList.remove('closed')
        current.classList.add('open')
        current.ariaLabel = 'open';
        selectedCards.push(current);

        if (selectedCards.length === 2){
            if (selectedCards[0].className === selectedCards[1].className){
                changeCards('open', 'found');
            }
            if (document.getElementsByClassName("closed").length === 0){
                gameWon();
            }

        }
    }
}

function changeCards(current, change){
    selectedCards[0].classList.remove(current);
    selectedCards[1].classList.remove(current);
    selectedCards[0].classList.add(change);
    selectedCards[1].classList.add(change); 
    selectedCards[0].ariaLabel = change;
    selectedCards[1].ariaLabel = change; 
    selectedCards = [];
}

function gameWon(){
    document.getElementById("new-game-pop-up").style.display = "block";
    // stop time
    // show time?
    // top 5
    // new game?

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function timePassed() {
    var doc = document.getElementById("timer");
    let i = 0;

    while (1===1) {
        await sleep(1000);
        doc.innerText = `Time passed: ${i} seconds`
        i++;
      
    }
}