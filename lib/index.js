const readArgs = require('./utils/read-args');
const logger = require('./utils/logger');
const traverse = require('./utils/traverse-dir');

const cwd = process.cwd();

const snapFingerArg = 'snap-fingers';
const withGloveArg = 'with-glove';

const gonnaSnapFingers = readArgs(snapFingerArg, false);
const gonnaUseGlove = readArgs(withGloveArg);

if (!gonnaSnapFingers) {
    logger.log(`to have me snap my finger, pass '${snapFingerArg}' as command line argument`);
    process.exit(0);
}

if (gonnaUseGlove) {
    logger.log(`snapping fingers inside '${cwd}' with full power...`);
} else {
    logger.log(`snapping fingers inside '${cwd}' with limited power...`);
}

const files = traverse(cwd);

