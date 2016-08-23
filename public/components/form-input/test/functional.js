import F from 'funcunit';
import mocha from "steal-mocha";

F.attach(mocha);

describe('form-input Component', function(){
	beforeEach(function(){
		F.open('/public/components/form-input/form-input.html');
	});

  it('has an input element with a value', function(done) {
    F('.input-one input').type("foo");
    F('.input-two input').type('bar');
    F('.input-two input').val('foobar', 'has a value of "foobar"');
    done();
  });
});
