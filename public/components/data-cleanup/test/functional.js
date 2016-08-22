import F from 'funcunit';
import mocha from "steal-mocha";

F.attach(mocha);

describe(' functional smoke test', function(){
	beforeEach(function(){
		F.open('../data-cleanup.html');
	});

	it('main page shows up', function(done){
		// F('h2').text('foo', 'Title is set');
		// F('h2').text('foo', 'Title is set');
		F('h2').text('Data Cleanup', 'Title is set');
		F.add(done);
	});
});
