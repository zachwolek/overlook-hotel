// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { logIntoWebsite } from './DOMUpdates';
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls';
//<><><><>Query Selectors
const loginButton = document.querySelector('.login-button')
const errorMessage = document.querySelector('.error-message')
//<><><><>Event Listeners
loginButton.addEventListener("click", logIntoWebsite)

export let customers = [];
export let rooms = [];
export let bookings = [];

function initialize() {
    Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
    .then((value) => {
        [customers, rooms, bookings] = [...value]
      })
      .catch(error => {
        errorMessage.classList.remove('hidden')
        errorMessage.innerHTML=`${error}`
        console.error("Error fetching data:", error);
      });
  }

addEventListener("load", function (){
  setTimeout(() => {initialize()}, 500);
});