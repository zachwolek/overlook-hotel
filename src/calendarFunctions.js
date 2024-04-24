

export function searchAvailableRooms(date, selectedRoomsTypes, allBookings, allRooms){
    let reservedRooms = filterReservedRooms(date, allBookings);
    let reservedRoomNumbers = mapRoomNumbers(reservedRooms);
    let availableRooms = filterAvailableRooms(reservedRoomNumbers, allRooms);
    let filteredRooms = filterRoomByType(selectedRoomsTypes, availableRooms);
    return filteredRooms
}

export function filterReservedRooms(date, allBookings){
    return allBookings.filter(booking => booking["date"] === date)
}

export function mapRoomNumbers(rooms){
    return rooms.map(room => room['roomNumber'])
}

export function filterAvailableRooms(reservedRoomNumbers, allRooms){
    return allRooms.filter(room => !reservedRoomNumbers.includes(room["number"]));
}

export function filterRoomByType(selectedRoomsTypes, availableRooms){
    return availableRooms.filter(room => selectedRoomsTypes.includes(room["roomType"]));
}