const REGISTER_URL = "http://localhost:8000/register";

window.onload = function() {


    document.getElementById("submit").addEventListener("click", function() {

        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        console.log(username);
        console.log(email);
        console.log(password);

        register(username, email, password);


    })

    function register(username, email, password) {

        let data = {
            "username": username,
            "email": email,
            "password": password
        };

        postRegister(data);

    }

    async function postRegister(data){
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        await fetch(
            REGISTER_URL,
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            },
        ).then(response =>{
            console.log(response);
        });
    }
}