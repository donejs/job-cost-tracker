import Mocha from 'steal-mocha';
import chai from "chai";
import fixture from 'can-fixture';
import fixtureData from './fixture.json';
import TaskDay from '../task-day';

const assert = chai.assert;
const store = fixture.store(fixtureData);

fixture({ '/api/task-days': store });

describe('models/task-day', () => {

  context('getList()', () => {

    it('should get some task-day objects from the API', (done) => {

      TaskDay.getList()
        .then(function( items ) {
          assert.equal(items.length, 3, 'There are 3 items retrieved');
          assert.equal(items[0].notes, 'Some notes for the NEW day', 'The first item is for Jan 18 2016');
          done();
        })
        .catch( done )

    });

  });

});
