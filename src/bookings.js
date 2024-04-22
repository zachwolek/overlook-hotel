export function getUserBookings(bookings, userID){
    return bookings.filter(booking => booking.userID === userID)
}