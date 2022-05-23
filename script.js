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
        current.className = 'open card';
        current.ariaLabel = 'open card';
        selectedCards.push(current);
        if (selectedCards.length === 2){
            if (selectedCards[0].innerText === selectedCards[1].innerText){
                selectedCards[0].className = 'found card';
                selectedCards[1].className = 'found card';
                selectedCards[0].ariaLabel = 'found card';
                selectedCards[1].ariaLabel = 'found card';
                selectedCards = [];
            } else {
                setTimeout(closeCards, 1000);
            }
        }
    }
}

// TODO bug: kan nu meer dan 2 selecteren, timeout is misschien niet de beste oplossing

function closeCards(){
    selectedCards[0].className = 'closed card';
    selectedCards[1].className = 'closed card'; 
    selectedCards[0].ariaLabel = 'closed card';
    selectedCards[1].ariaLabel = 'closed card'; 
    selectedCards = []; 
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