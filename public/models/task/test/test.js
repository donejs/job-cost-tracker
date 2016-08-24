import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import Task from '../task';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/tasks': store });

describe('models/task', () => {

  context('getList()', () => {

    it('should get some task objects from the API', (done) => {

      Task.getList()
        .then(function( items ) {
          assert.equal(items.length, 9);
          assert.equal(items[0].name, 'Driveway');
          done();
        })
        .catch( done )

    });

  });

});
