var expect = require('expect');

var {generateMessage} = require('./message');

describe('genmerateMessage', () => {
  it('Should generate the correct message object', () => {
    var from = 'Sebastian';
    var text = 'Some Text';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
  });
});
