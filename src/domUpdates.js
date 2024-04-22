import { verifyEntries } from './loginFunctions'
import { getUserBookings } from './bookings'
import { customers, rooms, bookings } from './scripts'

const unameInput = document.querySelector('.uname')
const pwordInput = document.querySelector('.pword')
const loginStatusBox = document.querySelector('.login-status')
const loginBox = document.querySelector('.login-box')
const subheader = document.querySelector('.subheader')
const userDash = document.querySelector('.user-dashboard')

export function logIntoWebsite(){
    const uname = unameInput.value
    const pword = pwordInput.value
    const userId = parseInt(uname.slice(-2))
    const logInStatus = verifyEntries(uname, pword, userId)
    loginStatusBox.innerText=`${logInStatus}`
    if (logInStatus === true){
        console.log("USER ID: ", userId)
        const userBookings = getUserBookings(bookings, userId)
        viewUserDashBoard(userBookings)
    }
}



function viewUserDashBoard(userBookings){
    loginBox.classList.add('hidden')
    userDash.classList.remove('hidden')
    subheader.innerText=`WELCOME BACK VALUED GUEST`
    console.log("USER BOOKINGS: ", userBookings)
    // filter through bookings using userID
    // array of 19 bookings belonging to user 50
    //generate cards of 19 past bookings
}

//if (unameInput.value === "customer50" && pwordInput.value == "overlook2021")