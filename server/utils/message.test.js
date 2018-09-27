const expect = require('expect');

var messageGenerator = require('./message');

describe('messageGenerator',()=>{
it('should generate correct message object',()=>{
  var res = messageGenerator.messageGenerator("ruchika","hi watsup");
  expect(res).toInclude({
    from: "ruchika",
    text: "hi watsup"
  })
  expect(res.createdAt).toBeA('number');
})
})
