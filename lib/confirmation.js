const path = require('path');
const fs = require('fs');

const constants = require('../constants');
const logger = require('./utils/logger');

const cwd = process.cwd();
const pathToConfirmationFile = path.resolve(__dirname, '..', constants.confirmation.fileName);

const confirmImplications = () => {
	fs.closeSync(fs.openSync(pathToConfirmationFile, 'w'));
};

module.exports.hasConfirmedImplications = () => {
	return fs.existsSync(pathToConfirmationFile);
};

module.exports.showAndConfirmImplications = () =>
	new Promise((resolve, reject) => {
		logger.log(
			`\n\n⚠️ Do you understand that when the Thanos snaps fingers, half of the files inside '${cwd}' directory will be deleted?\n`
		);
		logger.log('⚠️ Do you still want Thanos to snap fingers?');
		logger.warn(
			'--This is a one time confirmation. Thanos would not be pleased to take the confirmation again, if you allow him once --'
		);
		try {
			process.stdout.write('[y/N]: ');
			process.stdin.resume();
			process.stdin.setEncoding('utf-8');
			process.stdin.on('data', (input) => {
				process.stdin.end();
				input = input.toLowerCase().trim();
				const hasConfirmed = input === 'y';
				if (hasConfirmed) {
					confirmImplications();
					logger.log('-- Confirmation Recorded. Thanos has arrived --\n\n');
				} else {
					logger.log('\nYou have successfully stopped Thanos for now 👿 ');
				}
				resolve(hasConfirmed);
			});
		} catch (e) {
			reject(e);
		}
	});
