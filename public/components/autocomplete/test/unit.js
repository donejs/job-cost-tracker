import Mocha from 'steal-mocha';
import chai from "chai";
import { ViewModel } from '../autocomplete';
const assert = chai.assert;

// ViewModel unit tests
describe( 'job-tracker/components/autocomplete', () => {

  describe( 'ViewModel', () => {

    context( 'selectItem', () => {

      it( 'should update the `value` when passed a string', () => {
        var vm = new ViewModel();

        vm.selectItem( 'hello' );
        assert.equal( vm.value, 'hello', 'updates value' );
      } );
      it( 'should store the `value` as a DefineMap when it gets a second argument', () => {
        var vm = new ViewModel();

        vm.selectItem( 'goodbye', {
          message: 'goodbye'
        } );
        assert.equal( vm.value, 'goodbye', 'updates text value' );
        assert.deepEqual( vm.selected.serialize(), {
          message: 'goodbye'
        }, 'updates selected' );
      } );

    } );

  } );

  describe( 'Component', () => {

    xit( 'focus and dropdown display', () => {
      // TODO

      // display when getting focus if list has items

      // hide when focus leaves whole component

      // don't hide when tabbing to list item
    } );

    xit( 'select item', () => {
      // TODO

      // on select item, update field value

      // update viewmodel

      // event is fired
    } );

    xit( 'text-only content', () => {
      // TODO

      // on select, lastSelected is text
    } );

    xit( 'HTML Content', () => {
      // TODO

      // data-value without attr data

      // data-value with attr data
    } );
  } );
} );
