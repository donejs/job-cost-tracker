import chai from "chai";
import "steal-mocha";
import clone from 'steal-clone'
import sinon from 'sinon';
import _ from "lodash";

import canMap from "can-define/map/";

const assert = chai.assert;


describe("<new-lot>", function () {
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

			assert.equal(viewModel.constructor.name, "DefineMap");
			// test init of columns
			assert.ok(_.isArrayLike(viewModel.get("columns")));
			assert.equal(viewModel.columns.length, 4);

			assert.includeMembers(Object.keys(viewModel.serialize()), ['clipBoard', 'columns', 'job', 'jobName', 'lotNumber']);
		});

		it("map converters", function () {
			viewModel.lotNumber = 3;
			assert.strictEqual(viewModel.get("lotNumber"), "3");

			viewModel.job = 10;
			assert.strictEqual(viewModel.get("job"), "10");

		});

		it("importData", function () {
			// clipboard string
			let clipboard = `	CY	Hours	Ton
	Wall	39.21	96.45	18.36
	Garage	7.14	11.53	17.34`;

			viewModel.clipBoard = clipboard;

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
			assert.deepEqual(viewModel.tasks.serialize(), result);

			assert.ok(constructorTaskStub.calledTwice);
		});

		it("save new lot", function () {

			/**
			 * set all needed Data
			 */
			viewModel.job = '___new___';
			viewModel.lotNumber = 2;
			viewModel.tasks = 3;

			viewModel.saveLot();

			assert.ok(saveJobSpy.calledOnce);

			// reset successful?
			assert.equal(viewModel.get('job'), '');
			assert.equal(viewModel.get('lotNumber'), '');
			assert.equal(viewModel.get('clipBoard'), '');

		})
	});

	describe.skip("Component", function () {
	})
});