const fs = require('fs');

const readArgs = require('./utils/read-args');
const logger = require('./utils/logger');
const traverse = require('./utils/traverse-dir');
const constants = require('../constants');

const cwd = process.cwd();

module.exports = () => {
	const gonnaSnapFingers = readArgs(constants.arguments.snapFingers, false);
	const gonnaUseGlove = readArgs(constants.arguments.withGlove);

	if (!gonnaSnapFingers) {
		logger.log(`👿 To have me snap my finger, pass '${constants.arguments.snapFingers}' as command line argument`);
		process.exit(0);
	}

	if (gonnaUseGlove) {
		logger.log(`😈 Snapping fingers inside '${cwd}' with full power...`);
	} else {
		logger.log(`😈 Snapping fingers inside '${cwd}' with limited power...`);
	}

	const files = traverse(cwd);
	const deletedFiles = [];
	files.forEach((aFile) => {
		const random = Math.floor(Math.random() * 100);
		const shouldDelete = gonnaUseGlove ? random < 50 : random < 25;
		if (shouldDelete) {
			try {
				fs.unlinkSync(aFile);
				deletedFiles.push(aFile);
			} catch (e) {
				// DO some logging
			}
		}
	});

	logger.log(`👽 : 'Did you do it?'`);
	logger.log(`😈 : 'Yes'`);
	logger.log(`👽 : 'What did it cost?'`);
	logger.log(`😈 : 'Everything...'`);
	logger.log(`[ ${deletedFiles.length} file(s) have died ]`);
};
