import { verifyEntries } from './loginFunctions'
import { getUserBookings, getRoomInfo } from './bookings'
import { initialize } from './scripts'
import { customers, rooms, bookings } from './data.js'

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
const loginButton = document.querySelector('.login-button');
const resSuiteBox = document.querySelector('#residential-suit-box')
const suiteBox = document.querySelector('#suite-box')
const singleRoomBox = document.querySelector('#single-room-box')
const jrSuiteBox = document.querySelector('#junior-suite-box')

const checkboxes = [resSuiteBox, suiteBox, singleRoomBox, jrSuiteBox]

addEventListener("load", function (){
  setTimeout(() => {initialize()}, 500);
});

loginButton.addEventListener("click", logIntoWebsite)
searchButton.addEventListener('click', function() {
  const selectedDate = calendarInput.value.split('-').join('/')
  let selectedRooms = []
  checkboxes.forEach(checkbox => {
    if(checkbox.checked){
      selectedRooms.push(checkbox.value)
    }
    return selectedRooms
  })
  console.log("SELECTED ROOMS:", selectedRooms)
  console.log("SELECTED DATE", selectedDate)
    // searchCalendarDate(selectedDate)
});



export function logIntoWebsite(){
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

let totalSpent = 0
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
        totalSpent += roomInfo.costPerNight
        previousStaysSection.innerHTML += cardHTML;
      });
}


//if (unameInput.value === "customer50" && pwordInput.value == "overlook2021")