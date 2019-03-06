const readArgs = require('./utils/read-args');
const logger = require('./utils/logger');
const traverse = require('./utils/traverse-dir');
const constants = require('../constants');

const cwd = process.cwd();

module.exports = () => {
	const gonnaSnapFingers = readArgs(constants.arguments.snapFingers, false);
	const gonnaUseGlove = readArgs(constants.arguments.withGlove);

	if (!gonnaSnapFingers) {
		logger.log(`to have me snap my finger, pass '${constants.arguments.snapFingers}' as command line argument`);
		process.exit(0);
	}

	if (gonnaUseGlove) {
		logger.log(`snapping fingers inside '${cwd}' with full power...`);
	} else {
		logger.log(`snapping fingers inside '${cwd}' with limited power...`);
	}

	const files = traverse(cwd);
};
