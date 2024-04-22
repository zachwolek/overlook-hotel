export function searchCalendarDate(bookings, date){
    bookings.filter(booking => booking.date === date)
}