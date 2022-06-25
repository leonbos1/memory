var gridSize = 6;
const gameLength = 300;
var timeRemaining = 300;
var timePassed = 0;
var pairsFound = 0;
var imageType = "" // dogs, picsum, random, memes ...
var closedCardColor = ""

window.onload = function() {
    if(localStorage.getItem('token') === null){
        window.location.href="login.html";            
    }

    // document.getElementById("login").addEventListener("click", function() {
    //     window.location.href="login.html";
    // })

    // document.getElementById("register").addEventListener("click", function() {
    //     window.location.href="register.html";
    // })

    document.getElementById("account").addEventListener("click", function() {
        window.location.href="account.html";
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
        closedCardColor = event.currentTarget.value
        changeCardColor('closed', closedCardColor)
    })

    checkJwtTime();
    getFavorites().then( response => {
        newGame()
        updateScoreboard();
        Timer();
    })
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
    changeCardColor('closed', closedCardColor)
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
            break;
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
        console.log(response)
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

function changeCardColor(cardType, color){
    cards = document.getElementsByClassName(cardType)
    for (let i = 0; i < (cards.length); i++) {    
        cards[i].style.backgroundColor = color
    }
}

function gameWon(){
    let score = timePassed

    document.getElementById("new-game-pop-up").style.display = "block";

    playing = false;
    let timeUsed = document.getElementById("time-used");
    timeUsed.innerText = `It took you ${score} seconds to complete the game.`;

    document.getElementById("new-game").addEventListener('click', function() {
        document.getElementById("new-game-pop-up").style.display = "none";
        newGame();
    })

    postGame(score)
}

function postGame(score){
    let jwt = parseJwt(localStorage.getItem('token'))
    let id = jwt['sub']

    let method = `POST`
    let url = `http://localhost:8000/game/save`
    let body = {
        "id": id,
        "score": score,
        "api": imageType
    }

    request(method, url, body)
}

function getFavorites(){
    let jwt = parseJwt(localStorage.getItem('token'))
    let id = jwt['sub']
    let url = `http://localhost:8000/api/player/${id}/preferences`
    return request('GET', url)
    .then( response => {
        if (response.status === 200){
            return response.json()
        }
        else {
            console.log(response)
        }
    })
    .then (response => {
        // console.log(response)
        let api = response['preferred_api']
        let closed = response['color_closed']
        let found = response['color_found']
        if (api){
            imageType = api
        } else {
            imageType = "random"
        }
        if (closed){
            closedCardColor = closed
        } else {
            closedCardColor = "#0004ff"
        }
        if (!found){
            found = "#00ff37"
        }
        document.getElementById('images').value = imageType
        document.getElementById('card-color').value = closedCardColor
        document.getElementById('found-card').value = found
    })    

}

//is nogsteeds heel bugged oeps
function Timer(){
    updateTimeRemaining()
    var doc = document.getElementById("timer");
    doc.innerText = `Time passed: ${timePassed} seconds`;
    timePassed++;
    setTimeout("Timer()",1000)
}

function request(method, url, body) {
    let jwt = localStorage.getItem('token')

    let options = {
        method: method,
        headers: {
            'Content-Type':'application/json;charset=utf-8',
            'Authorization':`Bearer ${jwt}`
        }
    }
    if (method ==='POST'||method==='PUT') {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options)

}


function checkJwtTime(){
    var jwt = parseJwt(localStorage.getItem('token'))
    if (Date.now() > jwt['exp']*1000){
        window.alert('Your login session has expired, please login again')
        window.location.href="login.html";    
    }
    setTimeout("checkJwtTime()", 1000)
}

// from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}