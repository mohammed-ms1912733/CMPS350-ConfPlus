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
    const users = await getUsers()
    if (users.find(user => user.email === email.value && user.password === password.value)) {
        window.location.href = "../organizerPanel.html"
    }
    else {
        alert("Invalid email or password")
    }
});