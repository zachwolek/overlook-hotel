

const fetchCustomers = "http://localhost:3001/api/v1/customers"

//Get All Customers
fetch("http://localhost:3001/api/v1/customers")
  .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

//Get a specific customer
fetch(`${fetchCustomers}/${userID}`)
  .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

//Get all rooms
fetch("http://localhost:3001/api/v1/rooms")
  .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
http://localhost:3001/api/v1/rooms

//Get all bookings
fetch("http://localhost:3001/api/v1/bookings")
  .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));



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