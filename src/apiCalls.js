//Get All Customers
export function fetchCustomers() {
    return fetch("http://localhost:3001/api/v1/customers")
        .then((response) => response.json())
        .then((data) => data.customers)
}

// //Get a specific customer
// export function fetchUser(){
//     return fetch(`${fetchCustomersURL}/${userID}`)
//         .then((response) => response.json())
// } 

//Get all rooms
export function fetchRooms(){
    return fetch("http://localhost:3001/api/v1/rooms")
        .then((response) => response.json())
        .then((data) => data.rooms)
}


//Get all bookings
export function fetchBookings(){
    return fetch("http://localhost:3001/api/v1/bookings")
        .then((response) => response.json())
        .then((data) => data.bookings)
}




//POST Booking
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const raw = JSON.stringify({
//   "userID": 48,
//   "date": "2019/09/23",
//   "roomNumber": 4
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("http://localhost:3001/api/v1/bookings", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));