'use strict';

const exec = require('child_process').exec;

let clean = 'git branch -D deploy-docs docs-build; git checkout -b deploy-docs';
let predeploy = 'npm run document && git add ./docs -f && git commit -m \"Updating docs\"';
let subtree = 'git subtree split --prefix docs -b docs-build';
let postdeploy = 'git checkout -';

if (process.platform === 'win32') {
	console.log('HERE');
	clean = clean.replace(';', ' &');
}

exec(`${clean} && ${predeploy}`, (err, stdout, stderr) => {
	if (err || stderr) {
		// do nothing, we don't care about errors on the first part
		// error will just tell us branch exists or not
	}

	exec(subtree, (err, stdout, stderr) => {
		if (err || stderr) {
			console.log(err || stderr);
			exec(postdeploy);
			return;
		}

		console.log('Got result', stdout);
		exec(`git push origin ${stdout}:gh-pages --force`, (err, stdout, stderr) => {
			if (err || stderr) {
				console.log(err || stderr);
				exec(postdeploy);
			}
		});
	})
});
