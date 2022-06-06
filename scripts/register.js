const REGISTER_URL = "http://localhost:8000/register";

window.onload = function() {


    document.getElementById("submit").addEventListener("click", function() {

        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password").value;

        if (password !== password2) {return false;}

        register(username, email, password);
    })

    document.getElementById("back").addEventListener("click", function() {
        window.location.href="index.html";
    })
}

function register(username, email, password,confirm_password) {

    let data = {
        "username": username,
        "email": email,
        "password": password
    };

    postRegister(data);

}

function postRegister(data){
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    fetch(
        REGISTER_URL,
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        },
    ).then(response =>{
        if (response.status === 201) {
            window.location.href="login.html";
        }
    });
}