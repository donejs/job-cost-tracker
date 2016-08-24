import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import Report from '../report';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/reports': store });

describe('models/report', () => {

  context('getList()', () => {

    it('should get some report objects from the API', (done) => {

      Report.getList()
        .then(function( items ) {
          assert.equal(items.length, 2);
          assert.equal(items.attr('0.description'), 'First item');
          done();
        })
        .catch( done )

    });

  });

});
