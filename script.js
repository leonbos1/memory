window.onload = function() {
    timePassed();

    var chosenLetters = [];
    var gridSize = 6;
    var charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    for (let j = 0; j < (gridSize**2/2); j++) {
        let randomIndex = Math.floor(Math.random() * charArray.length);
        let randomLetter = charArray.splice(randomIndex, 1)

        chosenLetters.push(randomLetter);
        chosenLetters.push(randomLetter);
    }

    for (let i = 0; i < (gridSize**2); i++) {
        let randomIndex = Math.floor(Math.random() * chosenLetters.length);
        let randomLetter = chosenLetters.splice(randomIndex, 1);

        let grid = document.getElementById("grid");
        grid.innerHTML += `<div id=card-${i} class="closed card" tabindex="0" aria-label="closed card"><p>${randomLetter}</p></div>`;
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

var selectedCards = [];

function openCard(event){
    let current = event.currentTarget;
    if (current.className === 'closed card'){
        if (selectedCards.length === 2){
            changeCards('closed card');
        }

        current.className = 'open card';
        current.ariaLabel = 'open card';
        selectedCards.push(current);

        if (selectedCards.length === 2){
            if (selectedCards[0].innerText === selectedCards[1].innerText){
                changeCards('found card');
            }
            if (document.getElementsByClassName("closed").length === 0){
                gameWon();
            }

        }
    }
}

function changeCards(name){
    selectedCards[0].className = name;
    selectedCards[1].className = name; 
    selectedCards[0].ariaLabel = name;
    selectedCards[1].ariaLabel = name; 
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