import chai from "chai";
import "steal-mocha";
import DateRangePicker, { ViewModel } from '../date-range-picker';

const assert = chai.assert;

describe("ViewModel", function () {

	it('define default properties', function () {
		let viewModel = new ViewModel();
		let serialized = viewModel.serialize();

		assert.isObject(serialized);
		assert.property(serialized, 'startDate');
		assert.property(serialized, 'endDate');
	});
});

describe("Component", function () {
	let componentsPrototype = DateRangePicker.prototype;

	it("has a template renderer", function () {
		let template = componentsPrototype.template;
		let fragment = template();
	 	assert.instanceOf(fragment, DocumentFragment, "template converted to a DocumentFragment");
	});
	describe("Helper", function () {
	});


});
