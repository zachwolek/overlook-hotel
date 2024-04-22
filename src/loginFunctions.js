import { customers, rooms, bookings } from './data'


export function verifyEntries(uname, pword, userId){
    if (uname.length === 0 && pword.length === 0){
        return `Please enter both fields`
    } else if (pword.length === 0){
        return `Please enter a password`
    } else if (uname.length === 0){
        return `Please enter a username`
    } else 
    return verifyId(uname, pword, userId)
}

export function verifyId(uname, pword, userId){
    console.log("VERIFY ID INITIATED")
    const isValid = customers.some(customer => customer.id === userId)
    if (isValid === true){
        return verifyLogIn(uname, pword)
    } else {
        return "Your username is not in our records"
    }
}

export function verifyLogIn(uname, pword){
    console.log("VERIFY LOG IN INITIATED")
    if (uname === "asdf50" && pword == "asdf"){
        return true
    } else {
        return 'Password Incorrect'
    } 
}