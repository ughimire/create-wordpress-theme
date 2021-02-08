const expect = require('chai').expect;
const myapp = require(".");

describe('Testing printMsg function, should return "Hello Umesh!" ', () => {
	it('Should Return Hello Umesh!', () => {
         	expect(myapp.printMsg()).to.equal("Hello Umesh!");
	});
});