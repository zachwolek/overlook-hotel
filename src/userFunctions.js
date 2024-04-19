const unameInput = document.querySelector('.uname')
const pwordInput = document.querySelector('.pword')
const loginStatusBox = document.querySelector('.login-status')

export function verifyID(){
    console.log("VERIFY ID INITIATED")
    console.log("username: ", unameInput.value)
    console.log("password: ", pwordInput.value)

    if (unameInput.value === "asdf" && pwordInput.value == "asdf"){
        loginStatusBox.innerText="Welcome to our hotel";
        const userID = unameInput.value.slice(-2)
        console.log("http://localhost:3001/api/v1/customers", userID)
    } else if (
        unameInput.value.length === 0){
        loginStatusBox.innerText=`Please enter a username`
    } else if (
        pwordInput.value.length === 0){
        loginStatusBox.innerText=`Please enter a password`
    } else {
        const invalidEntry = 'Username or Password Incorrect'
        loginStatusBox.innerText=`${invalidEntry}`
    } 
}

//if (unameInput.value === "customer50" && pwordInput.value == "overlook2021")∆