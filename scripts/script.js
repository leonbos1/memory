var gridSize = 6;
const gameLength = 300;
var timeRemaining = 300;
var pairsFound = 0;
var imageType = "dogs"

window.onload = function() {
    document.getElementById("login").addEventListener("click", function() {
        window.location.href="login.html";
    })

    document.getElementById("register").addEventListener("click", function() {
        window.location.href="register.html";
    })

    document.getElementById("newgame").addEventListener("click", function() {
        newGame();
    })
    
    document.getElementById("dimensions").addEventListener("change", changeGridSize);

    let imageButton = document.getElementById("images")
    imageButton.addEventListener("change", function(event) {
        imageType = event.currentTarget.value
        newGame()
    })

    let colorPicker = document.getElementById("card-color")
    colorPicker.addEventListener("change", function(event) {
        let items = document.getElementsByClassName("closed")
        for (let i = 0; i < (gridSize**2); i++) {    
            document.getElementById(`card-${i}`).style.backgroundColor = event.currentTarget.value
        }
    })

    createCardGrid();
    newGame();
    updateScoreboard();
    Timer();
};

function createCardGrid(){
    let grid = document.getElementById("grid");
    grid.innerHTML = "";
    for (let i = 0; i < (gridSize**2); i++) {    
        grid.innerHTML += `<div id=card-${i} class="closed card" tabindex="0" aria-label="closed card">
        <img id=card-${i}-img></img>
        </div>`;
    }
}

function newGame(){
    pairsFound = 0;
    updatePairsFound();
    timePassed = 0;
    timeRemaining = gameLength;
    var gridIndexes = []
    selectedCards = []
    createCardGrid();
    document.querySelectorAll('.card').forEach(
        card => card.className = "closed card"
    )

    for (let i = 0; i < (gridSize**2); i++) {    
        gridIndexes.push(i);
    }

    for (let j = 0; j < (gridSize**2/2); j++) {

        //choosing random grid card
        randomIndex = Math.floor(Math.random() * gridIndexes.length);
        i1 = gridIndexes.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * gridIndexes.length);
        i2 = gridIndexes.splice(randomIndex, 1);
        getImage(i1, i2)
        document.getElementById(`card-${i1}`).classList.add(`card-${i1}`)
        document.getElementById(`card-${i2}`).classList.add(`card-${i1}`)

    }

    //create events
    var cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", openCard);

        cards[i].addEventListener("keypress", function(key) {
            if (key.key == 'Enter') {
                openCard(key);
            }
        });
    }

}

function getImage(i1, i2) {
    switch(imageType){
        case 'random':
            let random = ['picsum', 'dogs', 'memes']
            let randomIndex = Math.floor(Math.random() * 3)
            imageType = random[randomIndex]
        case 'picsum':
            getPicsumImage(i1, i2)
            break;
        case 'dogs':
            getDogImage(i1, i2)
            break;
        case 'memes':
            getMemeImage(i1, i2)
    }
}

//geeft soms meerdere paren met dezelfde plaatjes
function getMemeImage(i1, i2){
    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then( response => {
        let randomIndex = Math.floor(Math.random() * response.data.memes.length)
        let meme = response.data.memes[randomIndex]
        el = document.getElementById(`card-${i1}-img`)
        el.src = meme.url
        el = document.getElementById(`card-${i2}-img`)
        el.src = meme.url
    })
}

function getDogImage(i1, i2){
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then( response => {
        el = document.getElementById(`card-${i1}-img`)
        el.src = response.message
        el = document.getElementById(`card-${i2}-img`)
        el.src = response.message
    })
}

function getPicsumImage(i1, i2){
    fetch("https://picsum.photos/200/300")
    .then(response => {
        el = document.getElementById(`card-${i1}-img`)
        el.src = response.url
        el = document.getElementById(`card-${i2}-img`)
        el.src = response.url
    })
}
        
function updateScoreboard() {
    fetch("http://localhost:8000/scores")
    .then(response => response.json())
    .then ( response => {
        let sortedScores = response.sort(compareScores)
        for (let i = 0; i < sortedScores.length; i++) {
            document.getElementById(`sb-${i}`).innerText = sortedScores[i].username + ", " + sortedScores[i].score + " seconds";
        }
    })
}

function compareScores(a, b) {
   if (a.score > b.score) {
       return 1;
   }
   if (a.score < b.score) {
       return -1;
   }
   return 0;
}

var selectedCards = [];

function changeGridSize() {
 
    let size = document.getElementById("dimensions").value;
    let styleString = ''
    
    for (let i = 0; i < size; i++) {
        styleString+='1fr '
    }

    gridSize = size;
    document.getElementsByClassName("grid-container")[0].style.gridTemplateColumns = styleString;
 
    newGame()
    
}

function updateTimeRemaining() {
    if (timeRemaining > 0) {
        timeRemaining--;
    } else {
        document.getElementById("game-over-pop-up").style.display = "block";
        document.getElementById("game-over").addEventListener('click', function() {
            document.getElementById("game-over-pop-up").style.display = "none";
            newGame();
        })
    }

    let timeRemainingBarDiv = document.getElementsByClassName("time-remaining-in");
    let timeRemainingNumberDiv = document.getElementById("time-remaining");
    let remainingPercentage = 100 * timeRemaining / gameLength;

    timeRemainingBarDiv[0].style.width = `${remainingPercentage}%`;
    timeRemainingNumberDiv.innerHTML = timeRemaining;
}

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
                pairsFound++;
                updatePairsFound();
                changeCards('open', 'found');
            }
            if (document.getElementsByClassName("closed").length === 0){
                gameWon();
            }

        }
    }
}

function updatePairsFound() {

    document.getElementById("pairs-found").innerHTML = `Pairs found: ${pairsFound}`;
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

    playing = false;
    let timeUsed = document.getElementById("time-used");
    timeUsed.innerText = `It took you ${timePassed} seconds to complete the game.`;

    document.getElementById("new-game").addEventListener('click', function() {
        document.getElementById("new-game-pop-up").style.display = "none";
        newGame();
    })

}

function Timer(){
    updateTimeRemaining()
    var doc = document.getElementById("timer");
    doc.innerText = `Time passed: ${timePassed} seconds`;
    timePassed++;
    setTimeout("Timer()",1000)
}

function request(method, url, body) {

    let options = {
        method: method,
        headers: {
            'Content-Type':'application/json;charset=utf-8',
            'Authorization':'Bearer ' + localStorage.getItem('token')
        }
    }
    if (method ==='POST'||method==='PUT') {
        options.body = JSON.stringify(body);
    }

    let response = fetch(url, options);
    response.then(result => result.json())
    .then(d => {
        return d;
    })
}