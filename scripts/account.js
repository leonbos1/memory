var jwt = localStorage.getItem('token')

window.onload = function() {

    document.getElementById("back").addEventListener("click", function() {
        window.location.href="index.html"
    })
    getEmail()

    // get/change favorites

    // change email
    document.getElementById("save").addEventListener("click", function() {
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

function getEmail() {
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/email`
    let headers = {
        'Authorization': `Bearer ${jwt}`
    };
    fetch(
        url,
        {
            method: "GET",
            headers: headers,
        },
    ).then( response => {
        if (response.status === 200){
            return response
        }
        else {
            console.log(response)
        }
    }).then ( response => response.json())
    .then (response => {
        document.getElementById("current-email").innerHTML = response
    })
}

function changeEmail(email) {
    let id = getUserID(jwt)
    let url = `http://localhost:8000/api/player/${id}/email`
    let data = {'email': email}
    let headers = {
        'Authorization': `Bearer ${jwt}`
    };
    fetch(
        url,
        {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        },
    ).then(response =>{
        if (response.status === 204){
            getEmail()
        }
        else {
            console.log(response)
        }
    });

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