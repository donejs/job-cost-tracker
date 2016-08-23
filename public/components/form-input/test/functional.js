import F from 'funcunit';
import mocha from "steal-mocha";

F.attach(mocha);

describe('form-input Component', function(){
	beforeEach(function(){
		F.open('/public/components/data-cleanup/form-input.html');
	});

  it('has an input element with a unique id', function(done) {
    done();
  });
});
