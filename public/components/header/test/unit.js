import chai from "chai";
import "steal-mocha";
import { ViewModel } from '../header';

const assert = chai.assert;

describe("header Component ViewModel", function () {
  it('exists', function() {
    var vm = new ViewModel();
    assert.isDefined(vm, 'The view model is defined');
  });
});
