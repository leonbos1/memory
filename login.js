const LOGIN_URL = "http://localhost:8000/api/login_check";

window.onload = function() {

    document.getElementById("submit").addEventListener("click", function() {

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        login(username,password)
    })

    function login(username, password) {

        let data = {
            "username": username,
            "password": password
        };
        postLogin(data);
    }

    async function postLogin(data){
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        await fetch(
            LOGIN_URL,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            },
        ).then((response) => response.json()) 
        .then((result) => {
            let token = result.token;
            console.log(token)
            localStorage.setItem('token', token)
        })
        .catch(function (err) {
            console.log(err.message)
        });
    }
}