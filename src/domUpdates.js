import { verifyEntries } from './loginFunctions'
import { getUserBookings, getRoomInfo } from './bookings'
import { initialize } from './scripts'
import { customers, rooms, bookings } from './data.js'
import { searchAvailableRooms } from './calendarFunctions.js'
import { postBooking } from './apiCalls.js'

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

addEventListener("load", function (){
  setTimeout(() => {initialize()}, 500);
});

const checkboxes = [resSuiteBox, suiteBox, singleRoomBox, jrSuiteBox]
let currentUserId
let currentUserBookings

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
  if (selectedRooms.length === 0 || selectedDate.length === 0){
    searchStatusBox.innerText="Please enter a valid room date and room type"
  } else {
    searchStatusBox.innerText=""
  const availableRooms = searchAvailableRooms(selectedDate, selectedRooms, bookings, rooms)
    if (availableRooms.length === 0){
      alertNoRooms()
    } else {
  populateRequestedRooms(availableRooms, selectedDate)
    }
  }
});

availRoomsSection.addEventListener('click', function(e) {
  if (e.target.classList.contains('book-room')) {
      const bookingId = e.target.closest('.available-room').id;
      const roomNumDate = bookingId.split('-')
      const currentRoom = parseInt(roomNumDate[0])
      const currentDate = roomNumDate[1]
      postBooking(currentUserId, currentDate, currentRoom)
      .then(newBooking => {
        currentUserBookings.push(newBooking);
        bookings.push(newBooking);
        viewUserDashBoard(currentUserBookings)
      })
  }
});

export function logIntoWebsite(){
    const uname = unameInput.value;
    const pword = pwordInput.value;
    const userId = parseInt(uname.match(/\d+/));
    const userInfo = customers.find(customer => customer["id"] === userId)
    const logInStatus = verifyEntries(uname, pword, userId);
    if (logInStatus === true){
        dashboardHeader.innerText=`Welcome ${userInfo['name']}!`;
        currentUserBookings = getUserBookings(bookings, userId);
        viewUserDashBoard(currentUserBookings);
        currentUserId = userId
    } 
    loginStatusBox.innerText=`${logInStatus}`
}

function viewUserDashBoard(userBookings){
  let totalSpent = 0
    loginBox.classList.add('hidden')
    userDash.classList.remove('hidden')
    userSidebar.classList.remove('hidden')
    availRoomsDashboard.classList.add('hidden')
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
}

function populateRequestedRooms(availableRooms, selectedDate){
    userDash.classList.add("hidden")
    availRoomsDashboard.classList.remove("hidden")
    availRoomsSection.innerHTML=""
    availRoomsHeader.innerText = `Available Rooms for ${selectedDate}`;
    availableRooms.forEach((room) => {
      let bidetStatus;
      if(room['bidet'] === true){
        bidetStatus = "Yes"
      } else {
          bidetStatus = "No"
      }
      const roomHTML = `
        <div class="available-room" id="${room['number']}-${selectedDate}">
          <p class="room-type">Room Type: ${room['roomType'].toUpperCase()}</p>
          <span class="amenities">Bidet: ${bidetStatus}, Beds: ${room['numBeds']}, Bed Size: ${room['bedSize']}
          </span>
          <span class="room-number">Room Number: ${room['number']}</span>
          <span class="cost-per-night">Cost Per Night: ${room['costPerNight']}</span>
          <button class="book-room">Book Room!</button>
        </div>
      `;
      availRoomsSection.innerHTML += roomHTML;
    });
}

function alertNoRooms(){
  userDash.classList.add("hidden")
  availRoomsDashboard.classList.remove("hidden")
  availRoomsSection.innerHTML="We apologize no rooms available"
}