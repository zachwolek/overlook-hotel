import chai from 'chai';
const expect = chai.expect;
import { mockBookings } from './mock-data'
import { getUserBookings } from '../src/bookings.js'
import { verifyId, verifyLogIn } from '../src/loginFunctions.js';


describe("LogIn", () => {
    describe("Verify the ", () => {
        it.skip("Should communicate if Username and Password fields are empty", () => {   
            const entry = verifyId(uname, pword, 51)
            expect(entry).to.equal("Your username is not in our records") 
        })
        it.skip("Should communicate to a guest if the username and password are incorrect")
            const entry = (verifyLogIn("asdf50", "asdf"))
            expect(entry).to.equal('Password Incorrect')
    })
})

describe("Booking", () => {
    describe("Get bookings for userID", () => {
        it("Should grab all the bookings given an ID", () => {
            const bookings = getUserBookings(mockBookings, 9)

            expect(bookings).to.deep.equal([
                {
                    "id": "5fwrgu4i7k55hl6sz",
                    "userID": 9,
                    "date": "2022/04/22",
                    "roomNumber": 15
                },
                {
                    "id": "5fwrgu4i7k55hl6t5",
                    "userID": 9,
                    "date": "2022/01/24",
                    "roomNumber": 24
                }])
        })
        it("Should grab all the bookings for a different ID", () => {
            const bookings = getUserBookings(mockBookings, 13)

            expect(bookings).to.deep.equal([{
                "id": "5fwrgu4i7k55hl6t6",
                "userID": 13,
                "date": "2022/01/10",
                "roomNumber": 12
            },
            {
                "id": "5fwrgu4i7k55hl6t7",
                "userID": 13,
                "date": "2022/02/16",
                "roomNumber": 7
            }])
        })
    })
})