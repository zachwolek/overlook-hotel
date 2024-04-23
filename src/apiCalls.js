//Get All Customers
export function fetchCustomers() {
    return fetch("http://localhost:3001/api/v1/customers")
        .then((response) => response.json())
        .then((data) => data.customers)
}

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

export function postBooking(id, date, roomNumber) {
    return fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({
        "userID": id,
        "date": date,
        "roomNumber": roomNumber
	}),
	headers: {
		'Content-Type': 'application/json'
	}
})
.then(resp => resp.json())
.then(data => data.newBooking)
}

// POST Booking
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "userID": 48,
  "date": "2019/09/23",
  "roomNumber": 4
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
