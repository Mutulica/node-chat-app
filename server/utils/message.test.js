var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('genmerateMessage', () => {
  it('Should generate the correct message object', () => {
    var from = 'Sebastian';
    var text = 'Some Text';
    var res = generateMessage(from, text);
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');
    expect(res).toInclude({from, text});
  });
});

describe('GenerateLocationMessage', () => {
  it('Should generate the location URL', () => {
    var from = 'Sebastian';
    var lat = 1;
    var lng = 2;
    var location = generateLocationMessage(from, lat, lng);
    expect(location.from).toBe('Sebastian');
    expect(location.createdAt).toBeA('number');
    expect(lat).toBeA('number');
    expect(lng).toBeA('number');
    expect(location.url).toBe('https://www.google.com/maps?q=1,2');
  });
});
