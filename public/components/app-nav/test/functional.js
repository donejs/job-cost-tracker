var assert = chai.assert;

var foo = 'hello';
assert.typeOf(foo, 'string');

describe('Array', function() {
    it('should do a thing', function() {
        assert.typeOf(foo, 'string');
    });
});
