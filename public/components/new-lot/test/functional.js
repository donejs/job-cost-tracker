import chai from 'chai';
import F from 'funcunit';
import mocha from "steal-mocha";

const assert = chai.assert;

F.attach(mocha);

describe('Functional Test', function(){
	beforeEach(function(){
		F.open('/public/components/new-lot/new-lot.html');
		// F('new-lot').exists();
	});

	it('silly test', function(done){
		assert.ok(true);
		F.add(done);
	});
});
