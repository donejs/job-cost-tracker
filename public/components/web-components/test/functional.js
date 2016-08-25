import F from 'funcunit';
import mocha from "steal-mocha";
import loader from "@loader";
import chai from "chai";

const assert = chai.assert;

import canStache from "can/view/stache/";

describe('<welcome-message>', function(){
	let testPage;
	let testArea = document.getElementById('test-area');
	let renderer;

	before(function(done){
		F.attach(mocha);

		loader.import("job-tracker/components/web-components/welcome-message.component").then(function (module) {
			done();
		});
	});

	after(function () {
		F.detach(mocha);
	});

	beforeEach(() => {
		testPage = F(window.document);
		// create a  stache template
		renderer = canStache("<welcome-message {current-user}='mockUser'></welcome-message>");
	});

	afterEach(function () {
		// reset the test-area
		testArea.innerHTML = '';
	});

	it('default display', function(done){
		testArea.appendChild(renderer({}));

		// wait until the component is rendered
		testPage.find('welcome-message').exists(10000, () => {
				let text = testPage.find('welcome-message p').text();
				assert.match(text, /^Hello there!/, 'matches');
			}
		);
		F.add(done);
	});

	it('user logged in with given name', function(done){
		testArea.appendChild(renderer({
			mockUser: {
				given_name: 'Foo',
			}
		}));

		// wait until the component is rendered
		testPage.find('welcome-message').exists(10000, () => {
				let text = testPage.find('welcome-message p').text();
				assert.match(text, /^Hello Foo,/, 'matches');
		});

		F.add(done);
	});

	it('user logged in with name', function(done){
		testArea.appendChild(renderer({
			mockUser: {
				name: 'Bar',
			}
		}));

		// wait until the component is rendered
		testPage.find('welcome-message').exists(10000, () => {
			let text = testPage.find('welcome-message p').text();
			assert.match(text, /^Hello Bar,/, 'matches');
		});

		F.add(done);
	});


});
