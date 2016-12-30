var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
      var message = generateMessage('Gurpreet','This is test');
      expect(message.from).toBe('Gurpreet');
      expect(message.text).toBe('This is test');
      expect(message.createdAt).toBeA('number');
  });
});
