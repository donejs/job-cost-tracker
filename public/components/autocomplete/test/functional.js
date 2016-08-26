import F from 'funcunit';
import mocha from "steal-mocha";

describe('check texts', function(){

	before(function () {
		F.attach(mocha);
	});

	after(function () {
		F.detach(mocha);
	});

  beforeEach(function(){
    F.open('../autocomplete.html');
  });

	it('should be on the page', function(done){
		this.timeout(3000);
		F('auto-complete').exists();
		F.add(done);
	});
});
