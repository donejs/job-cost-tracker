import chai from 'chai';
import F from 'funcunit';
import mocha from "steal-mocha";

const assert = chai.assert;

describe('<new-lot>', function () {

	describe('Functional Test', function () {

		before(function () {
			F.attach(mocha);
		});

		after(function () {
			F.detach(mocha);
		});

		beforeEach(function (done) {
			F.open('/public/components/new-lot/new-lot.html');
			F.add(done);
		});

		it('silly test', function (done) {
			F('new-lot').exists(10000, function () {
				assert.ok(true);
			});
			F.add(done);
		});
	})
});
