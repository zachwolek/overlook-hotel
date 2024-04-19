import chai from 'chai';
const expect = chai.expect;
import { verifyID } from "/..src/userFunctions"

describe('See if the tests are running', function() {
  it('should return true', function() {
    expect(true).to.equal(true);
  });
});

describe("Verify ID", () => {
  it.skip("Should allow access to the correct username and password", () => {

     expect(recipe[0]).to.deep.equal(constants.wingSauce);
   });

   it.skip("Should notify if the password is incorrect", () => {

    expect(recipe).to.deep.equal(constants.saladArray);
  });
   
  it.skip("Should notify if the information is incomplete", () => {
  
    expect(recipe).to.deep.equal(constants.saladArray);
  });
   

  });