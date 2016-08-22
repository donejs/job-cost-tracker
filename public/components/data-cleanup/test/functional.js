import F from 'funcunit';

F.attach(window.mocha);

describe(' functional smoke test', function(){
	beforeEach(function(){
		F.open('../data-cleanup.html');
	});

	it('main page shows up', function(){
		F('h2').text('Data Cleanup', 'Title is set');
	});
});
