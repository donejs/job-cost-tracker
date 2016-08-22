import chai from "chai";
import { ViewModel } from '../data-cleanup';
const assert = chai.assert;

describe("Test", function () {
	it("bar", function () {
		var vm = new ViewModel();
		assert(vm.attr('message') === "This is the data-cleanup component", "message there");
	});
});