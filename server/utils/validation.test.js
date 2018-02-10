const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',() => {
  it('It should allow string with non spaces chars.', () => {
    var checkName = isRealString('Sebastian');
    expect(checkName).toBe(true);
  });
    it('It should reject non-string value', () => {
        var checkName = isRealString(4545);
        expect(checkName).toBe(false);
    });
    it('It should reject string with only spaces', () => {
        var checkName = isRealString('    ');
        expect(checkName).toBe(false);
    });

});
