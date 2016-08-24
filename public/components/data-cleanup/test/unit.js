import chai from "chai";
import "steal-mocha";
import DataCleanup, { ViewModel } from '../data-cleanup';
import moment from 'moment';

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
			assert.equal(formatDate(date), moment('2016-10-08').format('MM/DD/YYYY', moment()._locale._abbr));

			date = () => '2016-01-18T00:00:00.000Z';
			assert.equal(formatDate(date), moment('2016-01-18T00:00:00.000Z').format('MM/DD/YYYY', moment()._locale._abbr));
		});
	});

});
