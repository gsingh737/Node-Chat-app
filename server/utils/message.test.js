var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
      var message = generateMessage('Gurpreet','This is test');
      expect(message.from).toBe('Gurpreet');
      expect(message.text).toBe('This is test');
      expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', ()=>{
  it('should generete correct location object', ()=> {
    var from = 'Admin';
    var message = generateLocationMessage(from, 1, 1);
    var url = 'https://www.google.com/maps?q=1,1';
    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
})
