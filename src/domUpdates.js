import { verifyEntries } from './loginFunctions'
import { getUserBookings, getRoomInfo } from './bookings'
import { initialize } from './scripts'
import { customers, rooms, bookings } from './data.js'
import { searchAvailableRooms } from './calendarFunctions.js'

const unameInput = document.querySelector('.uname');
const pwordInput = document.querySelector('.pword');
const loginStatusBox = document.querySelector('.login-status');
const loginBox = document.querySelector('.login-box');
const userDash = document.querySelector('.user-dashboard');
const previousStaysSection = document.querySelector('.previous-stays-section')
const totalSpentSection = document.querySelector('.total-spent-section')
const userSidebar = document.querySelector('.user-sidebar');
const calendarInput = document.querySelector('.calendar');
const searchButton = document.querySelector('.search-date');
const loginButton = document.querySelector('.login-button');
const resSuiteBox = document.querySelector('#residential-suit-box');
const suiteBox = document.querySelector('#suite-box');
const singleRoomBox = document.querySelector('#single-room-box');
const jrSuiteBox = document.querySelector('#junior-suite-box');
const searchStatusBox = document.querySelector(".search-status-box");
const dashboardHeader = document.querySelector(".dashboard-header");
const availRoomsSection = document.querySelector(".avail-rooms-section");
const availRoomsDashboard = document.querySelector(".avail-rooms-dashboard");
const availRoomsHeader = document.querySelector('.avail-rooms-header');

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
  if (selectedRooms.length === 0 || selectedDate.length === 0){
    searchStatusBox.innerText="Please enter a valid room date and room type"
  } else {
    searchStatusBox.innerText=""
  const availableRooms = searchAvailableRooms(selectedDate, selectedRooms, bookings, rooms)
  console.log(availableRooms)
  populateRequestedRooms(availableRooms, selectedDate)
  }
});

export function logIntoWebsite(){
    console.log("LOG INTO WEBSITE INITIATED")
    const uname = unameInput.value;
    const pword = pwordInput.value;
    const userId = parseInt(uname.match(/\d+/));
    const userInfo = customers.find(customer => customer["id"] === userId)
    const logInStatus = verifyEntries(uname, pword, userId);
    if (logInStatus === true){
        dashboardHeader.innerText=`Welcome Guest ${userInfo['name']}! We love you ${userInfo['name']}`
        console.log("USER ID: ", userId) 
        const userBookings = getUserBookings(bookings, userId)
        const availableRooms = viewUserDashBoard(bookings, userBookings)
        console.log("AVAILABLE ROOMS: ", availableRooms)
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
      totalSpentSection.innerText=`Total Rewards Points: ${(totalSpent / 100).toFixed(2)}`
      console.log("TOTAL SPENT: ", totalSpent)
}

function populateRequestedRooms(availableRooms, selectedDate){
    userDash.classList.add("hidden")
    availRoomsDashboard.classList.remove("hidden")
    availRoomsSection.innerHTML=""
    availRoomsHeader.innerText = `Available Rooms for ${selectedDate}`;
    availableRooms.forEach((room) => {
      const roomHTML = `
        <div class="available-room" id="${room['number']}-${selectedDate}}">
          <p class="room-type">Room Type: ${room['roomType'].toUpperCase()}</p>
          <p class="amenities">Bidet: ${room['bidet']}, Beds: ${room['numBeds']}, Bed Size: ${room['bedSize']}
          </p>
          <p class="room-number">Room Number: ${room['number']}</p>
          <p class="cost-per-night">Cost Per Night: ${room['costPerNight']}</p>
        </div>
        <button class="book-room">Book Room!</button>
      `;
      availRoomsSection.innerHTML += roomHTML;
    });
}

//if (unameInput.value === "customer50" && pwordInput.value == "overlook2021")