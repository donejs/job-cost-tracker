import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import Foreman from '../foreman';

const assert = chai.assert;
const store = fixture.store( fixtureData );

fixture({ '/foremen': store });

describe('models/foreman', () => {

  context('getList()', () => {

    it('should get some foreman objects from the API', (done) => {

      Foreman.getList()
        .then(function(items) {
          assert.equal(items.length, 2, 'Retrieved 2 items');
          assert.equal(items.attr('0.name'), 'Solomon Grundy');
          done();
        })
        .catch(done);

    });

  });

});
