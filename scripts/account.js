window.onload = function() {

    document.getElementById("back").addEventListener("click", function() {
        window.location.href="index.html"
    })
    getEmail()

    // get/change favorites

    // change email
    document.getElementById("save").addEventListener("click", function() {
        let email = document.getElementById("email").value
        changeEmail(email)
    })
}

function getUserID(){
    
    //json web token
    //get sub number
}

function getEmail() {
    let url = `http://localhost:8000/api/player/1/email`
    let token = localStorage.getItem('token')
    let headers = {
        'Authorization': `Bearer ${token}`
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
    // let id = getUserID()
    let url = `http://localhost:8000/api/player/1/email`
    let data = {'email': email}
    let token = localStorage.getItem('token')
    let headers = {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    fetch(
        url,
        {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        },
    ).then(response =>{
        console.log(response)
        if (response.status === 204){
            getEmail()
        }
        else {
            console.log(response)
        }
    });

}
