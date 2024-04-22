// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls';
import { customers, rooms, bookings } from './data.js' 
import './DOMUpdates.js'
//<><><><>Event Listeners

export function initialize() {
    Promise.all([fetchCustomers(), fetchRooms(), fetchBookings()])
    .then(([fetchedCustomers, fetchedRooms, fetchedBookings]) => {
        customers.push(...fetchedCustomers);
        rooms.push(...fetchedRooms)
        bookings.push(...fetchedBookings)
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }