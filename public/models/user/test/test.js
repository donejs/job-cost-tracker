import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import User from '../user';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/users': store });

describe('models/user', () => {

  context('getList()', () => {

    it('should get some user objects from the API', (done) => {

      User.getList()
        .then(function( items ) {
          assert.equal(items.length, 8);
          assert.equal(items.attr('0.email'), 'adam@bitovi.com');
          done();
        })
        .catch( done )

    });

  });

});
