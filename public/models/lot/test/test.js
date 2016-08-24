import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import Lot from '../lot';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/lots': store });

describe('models/lot', () => {

  context('getList()', () => {

    it('should get some lot objects from the API', (done) => {

      Lot.getList()
        .then(function( items ) {
          assert.equal(items.length, 5);
          assert.equal(items.attr('0.name'), "The big one");
          done();
        })
        .catch( done )

    });

  });

});
