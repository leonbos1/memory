var gridSize = 6;
var charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'];

window.onload = function() {
    timePassed();

    for (i = 0; i < (gridSize**2); i++) {

        let randomInt = Math.floor(Math.random() * charArray.length);
        let randomLetter = charArray[randomInt];
        var grid = document.getElementById("grid");

        grid.innerHTML += `<div id=card-${i} class="closed card">${randomLetter}</div>`;

    }    

    var cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function() {
            if (cards[i].className === 'closed card') {
                cards[i].className = 'open card';
            }
        });
    }

    //voorbeeld om gevonden kaarten te laten zien
    let card4 =  document.getElementById("card-4");
    card4.className = 'found card';
    card4.innerText = 'E';
    let card12 =  document.getElementById("card-12");
    card12.className = 'found card';
    card12.innerText = 'E';

};


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