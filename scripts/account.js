var jwt = localStorage.getItem('token')

window.onload = function() {
    checkJwtTime()

    document.getElementById("back").addEventListener("click", function() {
        window.location.href="index.html"
    })

    getPreferences()
    getEmail()


    // change favorites
    document.getElementById("save-preferences").addEventListener("click", function() {
        let image = document.getElementById("images").value    
        let cardColor = document.getElementById('card-color').value
        let foundCard = document.getElementById('found-card').value
        changePreferences(image, cardColor, foundCard)
    })

    // change email
    document.getElementById("save-email").addEventListener("click", function() {
        let email = document.getElementById("email").value
        if (email != ''){
            changeEmail(email)
        }
    })
}

function getUserID(){
    let token = parseJwt(jwt)
    return token['sub']
}

function getPreferences(){
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/preferences`
    request('GET', url)
    .then( response => {
        if (response.status === 200){
            return response.json()
        }
        else {
            console.log(response)
        }
    })
    .then (response => {
        console.log(response)
        document.getElementById("images").value = response.preferred_api
        document.getElementById("card-color").value = response.color_closed
        document.getElementById("found-card").value = response.color_found
    })    
}


function changePreferences(api, closed, found){
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/preferences`
    let data = {
        'api' :api,
        'color_closed' :closed,
        'color_found' :found
    }

    request('POST', url, data)
    .then(response =>{
        if (response.status === 204){
            getPreferences()
        }
        else {
            console.log(response)
        }
    });
}

function getEmail() {
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/email`
    request('GET', url)
    .then( response => {
        if (response.status === 200){
            return response.json()
        }
        else {
            console.log(response)
        }
    })
    .then (response => {
        document.getElementById("current-email").innerHTML = response
    })
}

function changeEmail(email) {
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/email`
    let data = {'email': email}
    request('PUT', url, data)
    .then(response =>{
        if (response.status === 204){
            getEmail()
        }
        else {
            console.log(response)
        }
    });

}

function request(method, url, body) {

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
    else {
        setTimeout("checkJwtTime()",1000)
    }       
}

// from https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};