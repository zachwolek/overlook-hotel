//Get All Customers
export function fetchCustomers() {
    return fetch("http://localhost:3001/api/v1/customers")
        .then((response) => response.json())
        .then((data) => data.customers)
        .catch((error) => alert(`We apologize for error ${error}`))
}

//Get all rooms
export function fetchRooms(){
    return fetch("http://localhost:3001/api/v1/rooms")
        .then((response) => response.json())
        .then((data) => data.rooms)
        .catch((error) => alert(`We apologize for error ${error}`))
}


//Get all bookings
export function fetchBookings(){
    return fetch("http://localhost:3001/api/v1/bookings")
        .then((response) => response.json())
        .then((data) => data.bookings)
        .catch((error) => alert(`We apologize for error ${error}`))
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
.catch((error) => alert(`We apologize for error ${error}`))
}