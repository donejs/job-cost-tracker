'use strict';

const spawn = require('child_process').spawn;

function showData(data) {
	console.log(data.toString());
}

function showError(err) {
	console.log(err.toString());
}

function execute(cmd, callback) {
	let isInQuote = false;
	// merge items which are in between quotes
	const task = cmd.split(' ').filter(Boolean).reduce((arr, item) => {
		if (item.indexOf('"') !== -1) {
			if (isInQuote) {
				item = arr.pop() + item;
			}
			isInQuote = !isInQuote;
		}
		arr.push(item);
		return arr;
	}, []);

	let result = '';
	const _task = spawn(task[0], task.slice(1));
	_task.stdout.on('data', data => { result += data; showData(data) });
	_task.stderr.on('data', data => { result += data; showError(data) });
	_task.on('error', err => {
		showError(err);
		callback(err);
	});
	_task.on('close', code => {
	  callback(code, result);
	});
}

function runRegardless(tasks, callback) {
	let completed = 0;
	runTask(tasks[0], err => {
		if (err) {
			// do nothing
		}
		if (tasks.length > 1) {
			runRegardless(tasks.slice(1), callback);
			return;
		}
		callback();
	});
}

function runSuccessful(tasks, callback) {
	runTask(tasks[0], err => {
		if (err) {
			callback(err);
			return;
		}
		if (tasks.length > 1) {
			runSuccessful(tasks.slice(1), callback);
			return;
		}
		callback();
	});
}

function runTask(cmd, callback) {
	let tasks = cmd.split(/;| & /);
	if (tasks.length > 1) {
		runRegardless(tasks, (err, result) => {
			if (err) {
				callback('There was a ";" error: ' + err.toString());
				return;
			}
			callback(null, result);
		});
		return;
	}

	tasks = cmd.split('&&');
	if (tasks.length > 1) {
		runSuccessful(tasks, (err, result) => {
			if (err) {
				callback('There was an "&&" error: ' + err.toString());
				return;
			}
			callback(null, result);
		});
		return;
	}

	execute(cmd, callback);
}

module.exports = runTask;
