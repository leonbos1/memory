const LOGIN_URL = "http://localhost:8000/api/login_check";

window.onload = function() {

    document.getElementById("submit").addEventListener("click", function() {

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        login(username,password)
    })

    document.getElementById("back").addEventListener("click", function() {
        window.location.href="index.html";
    })
}

function login(username, password) {

    let data = {
        "username": username,
        "password": password
    };
    postLogin(data);
}

function postLogin(data){
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    fetch(
        LOGIN_URL,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        },
    ).then((response) => response.json()) 
    .then((result) => {
        if (result.token) {
        localStorage.setItem('token', result.token)
        window.location.href="index.html";
        }
    })
    .catch(function (err) {
        console.log(err.message)
    });
}