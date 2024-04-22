export function getUserBookings(bookings, userID){
    return bookings.filter(booking => booking.userID === userID)
}

export function getRoomInfo(rooms, roomNum){
    return rooms.find(room => room.number === roomNum)
}