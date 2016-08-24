import chai from "chai";
import "steal-mocha";
import clone from 'steal-clone'
import sinon from 'sinon';
import _ from "lodash";

import canMap from "can/map/";

const assert = chai.assert;


describe("ViewModel", function () {
	let NewLot, ViewModel, viewModel,
		constructorTaskStub,
		saveJobSpy;

	beforeEach(function (done) {

		/**
		 * ## Task Stub
		 */
		// create a new sinon stub
		constructorTaskStub = sinon.stub();
		/**
		 * use sinon for returning the first argument
		 * that was passed though the function, like:
		 * function (hashMap) {return hashMap;};
		 */
		constructorTaskStub.returnsArg(0);

		/**
		 * ## Job Stub
		 */
		// create a spy on Job.save()
		saveJobSpy = sinon.spy();


		/**
		 * use steal-clone for mock up `Lot`, `Job` and `Task`
		 */
		clone({
			'job-tracker/models/lot/': {
				default: function (args) {
					return new canMap(args);
				}
			},
			'job-tracker/models/job/': {
				default: function () {
					return {
						save: saveJobSpy
					}
				}
			},
			'job-tracker/models/task/': {
				default: constructorTaskStub
			}
		})
		.import('../new-lot')
		.then((module) => {
			// module is the newLot Module
			NewLot = module.default;
			ViewModel = module.ViewModel;
			viewModel = new ViewModel();
			done();
		});
	});

	it('init', function () {
		assert.instanceOf(viewModel, Object, 'at the end of the proto it is a object');

		assert.equal(viewModel.constructor.name, "Map");

		// test init of columns
		assert.ok(_.isArrayLike(viewModel.attr("columns")));
		assert.equal(viewModel.attr("columns.length"), 4);

		assert.includeMembers(Object.keys(viewModel.serialize()), ['clipBoard' ,'columns', 'job', 'jobName', 'lotNumber']);
	});

	it("map converters", function () {
		viewModel.attr("lotNumber", 3);
		assert.strictEqual(viewModel.attr("lotNumber"), "3");

		viewModel.attr("job", 10);
		assert.strictEqual(viewModel.attr("job"), "10");

	});

	it("importData", function () {
		// clipboard string
		let clipboard = `	CY	Hours	Ton
Wall	39.21	96.45	18.36
Garage	7.14	11.53	17.34`;

		viewModel.attr('clipBoard', clipboard);

		viewModel.importData();

		let result = [
			{
				"cubicYards": "39.21",
				"hours": "96.45",
				"name": "Wall",
				"tons": "18.36"
			},
			{
				"cubicYards": "7.14",
				"hours": "11.53",
				"name": "Garage",
				"tons": "17.34"
			}
		];
		assert.deepEqual(viewModel.attr('tasks').serialize(), result);

		assert.ok(constructorTaskStub.calledTwice);
	});

	it("save new lot", function () {

		/**
		 * set all needed Data
		 */
		viewModel.attr('job', '___new___');
		viewModel.attr('lotNumber', 2);
		viewModel.attr('tasks', 3);

		viewModel.saveLot();

		assert.ok(saveJobSpy.calledOnce);

		// reset successful?
		assert.equal(viewModel.attr('job'), '');
		assert.equal(viewModel.attr('lotNumber'), '');
		assert.equal(viewModel.attr('clipBoard'), '');

	})
});

describe.skip("Component", function () {
});
