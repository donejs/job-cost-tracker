import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import Job from '../job';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/jobs': store });

describe('models/job', () => {

  context('getList()', () => {

    it('should get some job objects from the API', (done) => {

      Job.getList()
        .then(function( items ) {
          assert.equal(items.length, 2);
          assert.equal(items.attr('0.name'), "Silverwood Heights");
          done();
        })
        .catch( done )

    });

  });

});
