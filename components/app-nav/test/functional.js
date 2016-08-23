import F from 'funcunit';
import mocha from "steal-mocha";
import chai from "chai";

const assert = chai.assert;

F.attach(mocha);

describe('Array', function() {
    it('should do a thing', function() {
        assert.equal(1, 1);
    });
});