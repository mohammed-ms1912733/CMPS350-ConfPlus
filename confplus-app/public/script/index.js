//getting Data
const USERS_URL = 'api/accounts' 


//async methods
async function getUsers() {
    const response = await fetch(USERS_URL)
    const users = await response.json()
    return users
}

//login information
const email = document.querySelector("#loginEmail");
const password = document.querySelector("#password");

//login button
const loginBtn = document.querySelector("#loginButton");


// login validation and redirecting the user to the panel
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loadPanel()
    // const users = await getUsers()
    // if (users.find(user => user.email === email.value && user.password === password.value)) {
    //     window.location.href = "./panel.html"
    // }
    // else {
    //     alert("Invalid email or password")
    // }
    
});

// userLogo.innerHTML = `<img src="./images/organizerFemaleLogo.png" alt="user">`

async function loadPanel() {
    const users = await getUsers()
    const user = users.find(user => user.email === email.value && user.password === password.value)
    if (user) {
        window.location.href = "./panel.html"
        const userName = document.querySelector(".userName");
        userName.innerHTML = `${user.firstName} ${user.lastName}`
        console.log(user)
    }
    else {
        alert("Invalid email or password")
    }

    // const userLogo = document.querySelector(".userPicContainer");
    // const userLogo = document.querySelector("#userPicContainer");
    // userLogo.innerHTML = `hello`

    // const userName = document.querySelector(".userName");
    // alert(userName)
}

