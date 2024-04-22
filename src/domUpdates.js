import { verifyEntries } from './loginFunctions'
import { getUserBookings, getRoomInfo } from './bookings'
import { initialize, customers, rooms, bookings } from './scripts'

const unameInput = document.querySelector('.uname');
const pwordInput = document.querySelector('.pword');
const loginStatusBox = document.querySelector('.login-status');
const loginBox = document.querySelector('.login-box');
const subheader = document.querySelector('.subheader');
const userDash = document.querySelector('.user-dashboard');
const previousStaysSection = document.querySelector('.previous-stays-section')
const totalSpentSection = document.querySelector('total-spent-section')
const userSidebar = document.querySelector('.user-sidebar');
const calendarInput = document.querySelector('.calendar');
const searchButton = document.querySelector('.search-date');
const loginButton = document.querySelector('.login-button')
const errorMessage = document.querySelector('.error-message')


searchButton.addEventListener('click', function() {
  const selectedDate = calendarInput.value.split('-').join('/')
  console.log("SELECTED DATE", selectedDate)
    // searchCalendarDate(selectedDate)
});

loginButton.addEventListener("click", logIntoWebsite)

addEventListener("load", function (){
  setTimeout(() => {initialize()}, 500);
});

export function logIntoWebsite(e){
    e.preventDefault();
    console.log("LOG INTO WEBSITE INITIATED")
    const uname = unameInput.value
    const pword = pwordInput.value
    const userId = parseInt(uname.match(/\d+/))
    const logInStatus = verifyEntries(uname, pword, userId)
    if (logInStatus === true){
        console.log("USER ID: ", userId) 
        const userBookings = getUserBookings(bookings, userId)
        const availableRooms = viewUserDashBoard(bookings, userBookings)
        console.log("AVAILABLE ROOMS: ", availableRooms)
    } else {
    //   loginStatusBox.innerText=`${logInStatus}`
    }
    loginStatusBox.innerText=`${logInStatus}`
}

function viewUserDashBoard(bookings, userBookings){
    loginBox.classList.add('hidden')
    userDash.classList.remove('hidden')
    userSidebar.classList.remove('hidden')
    userBookings.forEach((booking) => {
    const roomInfo = getRoomInfo(rooms, booking.roomNumber)
        const cardHTML = `
          <div class="user-booking" id="${booking.id}">
            <p class="booking-date">Date: ${booking.date}</p>
            <p class="room-type">ROOM TYPE: ${roomInfo.roomType.toUpperCase()}</p>
            <p class="bed-number">NUMBER OF BEDS: ${roomInfo.numBeds}</p>
            <p class="cost-per-night">COST PER NIGHT $${roomInfo.costPerNight}</p>
          </div>
        `;
        previousStaysSection.innerHTML += cardHTML;
      });
}


//if (unameInput.value === "customer50" && pwordInput.value == "overlook2021")