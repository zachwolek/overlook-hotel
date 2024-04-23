import chai from 'chai';
const expect = chai.expect;
import { mockBookings, mockRooms, mockBookedRooms, roomSample  } from './mock-data'
import { getUserBookings, getRoomInfo } from '../src/bookings.js'
import { verifyId, verifyLogIn } from '../src/loginFunctions.js';
import { filterReservedRooms, mapRoomNumbers, filterAvailableRooms, filterRoomByType} from '../src/calendarFunctions.js';

describe("Room Info", () => {
    describe("Room info from a booking", () => {
         it("should show the room info from the room on the booking", () => {
            const roomInfo = getRoomInfo(mockRooms, 9)
            expect(roomInfo).to.deep.equal({
                "number": 9,
                "roomType": "single room",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 200.39
            })
        })
        it("Should show the room info for a different booking", () => {
            const roomInfo = getRoomInfo(mockRooms, 3)
            expect(roomInfo).to.deep.equal({
                "number": 3,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "king",
                "numBeds": 1,
                "costPerNight": 491.14
            })
        })
    })
})



describe("Booking", () => {
    describe("Get bookings for userID", () => {
        it("Should grab all the bookings given an ID", () => {
            const bookings = getUserBookings(mockBookings, 1)

            expect(bookings).to.deep.equal([
                {
                    "id": "5fwrgu4i7k55hl6sz",
                    "userID": 1,
                    "date": "2022/04/22",
                    "roomNumber": 15
                },
                {
                    "id": "5fwrgu4i7k55hl6t5",
                    "userID": 1,
                    "date": "2022/01/24",
                    "roomNumber": 24
                }])
        })
        it("Should grab all the bookings for a different ID", () => {
            const bookings = getUserBookings(mockBookings, 2)

            expect(bookings).to.deep.equal([{
                "id": "5fwrgu4i7k55hl6t6",
                "userID": 2,
                "date": "2022/01/10",
                "roomNumber": 12
            },
            {
                "id": "5fwrgu4i7k55hl6t7",
                "userID": 2,
                "date": "2022/02/16",
                "roomNumber": 7
            }])
        })
    })
})


describe("LogIn", () => {
    describe("Should log a user in with a successful username and password and communicate if incorrect", () => {
        it("Should communicate if Username and Password fields are empty", () => {   
            const entry = verifyId(undefined, undefined, 51)
            expect(entry).to.equal("Your username is not in our records") 
        })
        
        it("Should communicate to a guest if the username and password are incorrect", () => {
            const entry = verifyLogIn("asdf50", "asdfasdf")
            expect(entry).to.equal('Password Incorrect')
        })

        it("Should allow access if the username and password are correct", () => {
            const entry = verifyLogIn("asdf50", "asdf")
            expect(entry).to.equal(true)
        })
    })
})

describe("Future Booking Filter", () => {
    describe("Should return an array of rooms filtered by date and preference of room type", () => {
        it("Should start by returning an array of rooms aleady reserved", () => {   
            const reservedRooms = filterReservedRooms("2022/02/05", mockBookedRooms)
            expect(reservedRooms).to.deep.equal([
                {
                "id": "5fwrgu4i7k55hl6t8",
                "userID": 5,
                "date": "2022/02/05",
                "roomNumber": 1
            },
            {
                "id": "5fwrgu4i7k55hl6t9",
                "userID": 38,
                "date": "2022/02/05",
                "roomNumber": 2
            },
            {
                "id": "5fwrgu4i7k55hl6ta",
                "userID": 25,
                "date": "2022/02/05",
                "roomNumber": 3
            }]) 
        })

        it("Should return a different an array of rooms aleady reserved", () => {   
            const reservedRooms = filterReservedRooms("2023/11/30", mockBookedRooms)
            expect(reservedRooms).to.deep.equal([{
                "id": "5fwrgu4i7k55hl6tb",
                "userID": 49,
                "date": "2023/11/30",
                "roomNumber": 4
            },
            {
                "id": "5fwrgu4i7k55hl6tc",
                "userID": 22,
                "date": "2023/11/30",
                "roomNumber": 5
            },
            {
                "id": "5fwrgu4i7k55hl78g",
                "userID": 42,
                "date": "2023/11/30",
                "roomNumber": 6
            }]) 
        })
        
        it("Should then create an array of the room numbers reserved", () => {   
            const reservedRooms = mapRoomNumbers([
                {
                "id": "5fwrgu4i7k55hl6t8",
                "userID": 5,
                "date": "2022/02/05",
                "roomNumber": 1
            },
            {
                "id": "5fwrgu4i7k55hl6t9",
                "userID": 38,
                "date": "2022/02/05",
                "roomNumber": 2
            },
            {
                "id": "5fwrgu4i7k55hl6ta",
                "userID": 25,
                "date": "2022/02/05",
                "roomNumber": 3
            }])

            expect(reservedRooms).to.deep.equal([ 1, 2, 3 ]) 
        })

        it("Should create an array of a different set of rooms numbers", () => {   
            const reservedRooms = mapRoomNumbers([{
                "id": "5fwrgu4i7k55hl6tb",
                "userID": 49,
                "date": "2023/11/30",
                "roomNumber": 4
            },
            {
                "id": "5fwrgu4i7k55hl6tc",
                "userID": 22,
                "date": "2023/11/30",
                "roomNumber": 5
            },
            {
                "id": "5fwrgu4i7k55hl78g",
                "userID": 42,
                "date": "2023/11/30",
                "roomNumber": 6
            }])

            expect(reservedRooms).to.deep.equal([ 4, 5, 6 ]) 
        })

        it("Should filter out reserved rooms from the room number", () => {   
            const availableRooms = filterAvailableRooms([ 1, 2, 3 ], roomSample)

            expect(availableRooms).to.deep.equal([{
                "number": 4,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 429.44
            },
            {
                "number": 5,
                "roomType": "single room",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 2,
                "costPerNight": 340.17
            },
            {
                "number": 6,
                "roomType": "junior suite",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 397.02
            }]) 
        })

        it("Should filter out reserved rooms on the date for a different set of room numbers", () => {   
            const availableRooms = filterAvailableRooms([ 4, 5, 6 ], roomSample)

            expect(availableRooms).to.deep.equal([{
                "number": 1,
                "roomType": "residential suite",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 358.4
            },
            {
                "number": 2,
                "roomType": "suite",
                "bidet": false,
                "bedSize": "full",
                "numBeds": 2,
                "costPerNight": 477.38
            },
            {
                "number": 3,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "king",
                "numBeds": 1,
                "costPerNight": 491.14
            }]) 
        })

        it("Should filter available rooms based on checked preferences", () => {
            const roomPreferences =  ['suite', 'junior suite']  
            const availableRooms = filterRoomByType(roomPreferences, roomSample)

            expect(availableRooms).to.deep.equal([{
                number: 2,
                roomType: 'suite',
                bidet: false,
                bedSize: 'full',
                numBeds: 2,
                costPerNight: 477.38
              },
              {
                number: 6,
                roomType: 'junior suite',
                bidet: true,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 397.02
              }]) 
        })

        it("Should filter another set of available rooms based on checked preferences", () => {
            const roomPreferences =  ["residential suite", 'junior suite']  
            const availableRooms = filterRoomByType(roomPreferences, roomSample)

            expect(availableRooms).to.deep.equal([{
                "number": 1,
                "roomType": "residential suite",
                "bidet": true,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 358.4
            },
              {
                number: 6,
                roomType: 'junior suite',
                bidet: true,
                bedSize: 'queen',
                numBeds: 1,
                costPerNight: 397.02
              }]) 
        })
    })
})
