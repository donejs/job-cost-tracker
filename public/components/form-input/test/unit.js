import chai from "chai";
import "steal-mocha";
import { ViewModel } from '../form-input';

const assert = chai.assert;

describe("form-input Component ViewModel", function () {
  it('has a type', function() {
    var vm = new ViewModel();
    assert.equal(vm.type, 'text', 'it is "text"');
  });

	it("has a random id", function() {
		var vm = new ViewModel();
		assert.typeOf(vm.randomId, 'number', 'it is a number');

    var vmAlt = new ViewModel();
    assert.notEqual(vm.randomId, vmAlt.randomId, 'it is unique to a vm');
	});

  it("has a unique id", function() {
    var vm = new ViewModel();
    var rand = vm.randomId;

    assert.equal(vm.uniqueId, `text-input-${rand}`, 'it is a string combination of randomId and type');
  });
});
