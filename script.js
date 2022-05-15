var gridSize = 6;
var charArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'];

window.onload = function() {
    timePassed();

    let doc = document.getElementById("grid");

    for (i = 0; i < (gridSize**2); i++) {

        let randomInt = Math.floor(Math.random() * charArray.length);
        let randomLetter = charArray[randomInt];

        doc.innerHTML += `<div id=card-${i} class="closed card" onclick=cardClickHandler('card-${i}')>${randomLetter}</div>`;

    }

    //voorbeeld om gevonden kaarten te laten zien
    let card4 =  document.getElementById("card-4");
    card4.className = 'found card';
    card4.innerText = 'E';
    let card12 =  document.getElementById("card-12");
    card12.className = 'found card';
    card12.innerText = 'E';

};

function cardClickHandler(id) {

    doc = document.getElementById(id);

    if (doc.className === 'closed card') {
        doc.className = 'open card';
    }

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