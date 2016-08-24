import chai from "chai";
import "steal-mocha";
import DataCleanup, { ViewModel } from '../data-cleanup';

const assert = chai.assert;

describe("ViewModel", function () {

});

describe("Component", function () {
	let componentsPrototype = DataCleanup.prototype;

	it("has a template renderer", function () {
		let template = componentsPrototype.template;
		let fragment = template();
		assert.instanceOf(fragment, DocumentFragment, "template converted to a DocumentFragment");
	});

	describe("Helpers", function () {

		it("check date format", function () {
			let formatDate = componentsPrototype.helpers.formatDate;
			let date = () => '2016-10-08';
			assert.equal(formatDate(date), '10/08/2016');

			date = () => '2016-01-18T00:00:00.000Z';
			assert.equal(formatDate(date), '01/18/2016');
		});
	});

});
