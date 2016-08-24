// import 'job-tracker/components/data-cleanup/test/functional';
// import 'job-tracker/components/form-input/test/functional';
// import 'job-tracker/components/new-lot/test/functional';


import F from 'funcunit';
import mocha from "steal-mocha";

F.attach(mocha);

describe('check texts', function(){
	beforeEach(function(){
		F.open('/public/components/data-cleanup/data-cleanup.html');
	});

	it('for headlines', function(done){
		F('h2').text('Data Cleanup', 'set title right');
		F('h3:eq(0)').text("Jobs with no Lots", "set first h3 tag right");
		F('h3:eq(1)').text("Lots with no Tasks", "set first h3 tag right");
		F('h3:eq(2)').text("Task Days with no Tasks", "set first h3 tag right");
		F('h3:eq(3)').text("Foremen with no task days", "set first h3 tag right");
		F.add(done);
	});
});
