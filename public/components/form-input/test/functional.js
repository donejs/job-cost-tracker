import F from 'funcunit';
import mocha from "steal-mocha";

describe('form-input Component', function(){

	before(function () {
		F.attach(mocha);
	});

	after(function () {
		F.detach(mocha);
	});

	beforeEach(function(done){
		F.open('/public/components/form-input/form-input.html');
		F.add(done)
	});

  it('has an input element with a value', function(done) {
    F('.input-one input').type("foo");
    F('.input-two input').type('bar');
    F('.input-two input').val('foobar', 'has a value of "foobar"');
		F.add(done)
  });
});
