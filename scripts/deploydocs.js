'use strict';

const runTask = require('./task-runner');

const REG_SHA1 = /^[0-9a-f]{5,40}$/;
let clean = 'git branch -D deploy-docs docs-build; git checkout -b deploy-docs';
let predeploy = 'npm run document && git add ./docs -f && git commit -m \"Updating docs\"';
let subtree = 'git subtree split --prefix docs -b docs-build';
let postdeploy = 'git checkout -';

if (process.platform === 'win32') {
	clean = clean.replace(';', ' &');
}

runTask(`${clean} && ${predeploy}`, (err, result) => {
	runTask(subtree, function (err, result) {
		const sha = result.split('\n').filter(Boolean).pop();

		if (REG_SHA1.test(sha)) {
			console.log('Pushing docs to github. This may take a few seconds...');
			runTask(`git push origin ${sha}:gh-pages --force`, (err, result) => {
				if (err) {
					console.log(err || stderr);
				}
				runTask(postdeploy, () => {
					console.log('ALL DONE');
				});
			});
			return;
		}
		runTask(postdeploy, () => {
			console.log('ALL DONE');
		});
	});
});
