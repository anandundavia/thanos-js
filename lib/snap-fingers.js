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
		logger.log(`👿 To have me snap my finger, pass '${constants.arguments.snapFingers}' as command`);
		process.exit(0);
	}

	if (!gonnaUseGlove) {
		// prettier-ignore
		logger.log(`👿 There is not point snapping fingers without the Infinity Gauntlet Glove, pass '--${constants.arguments.withGlove}' and then have me snap fingers`);
		process.exit(0);
	} else {
		logger.log(`😈 Snapping fingers inside '${cwd}' with full power...`);
	}

	const files = traverse(cwd);

	/**
	 *  Give every file a `chance`. 0 <= chance <= 100
	 *  Either files with chance in range 0 to 50 or 50 to 100 would get deleted
	 */
	// Giving every file a random `chance`
	const filesWithChances = files.map((aFile) => ({ file: aFile, chances: Math.floor(Math.random() * 100) }));
	// Sorting them based on chance. Helps to pick half of them.
	const filesWithChancesSorted = filesWithChances.sort((aFile, anotherFile) => aFile.chances - anotherFile.chances);
	// Let's calculate which half to take
	const shouldTakeFirstHalf = Math.floor(Math.random() * 100) <= 50;
	let filesToBeDeleted;
	if (shouldTakeFirstHalf) {
		filesToBeDeleted = filesWithChancesSorted.slice(0, filesWithChancesSorted.length / 2);
	} else {
		filesToBeDeleted = filesWithChancesSorted.slice(filesWithChancesSorted.length / 2);
	}
	let deletedFilesCount = 0;
	filesToBeDeleted.forEach((aFile) => {
		try {
			fs.unlinkSync(aFile.file);
			// In case `unlinkSync` throws an Exception, deletedFilesCount won't be incremented
			// This way, we would have the precise deletion count.
			deletedFilesCount++;
		} catch (e) {
			// DO some logging
		}
	});

	logger.log(`👽 : 'Did you do it?'`);
	logger.log(`😈 : 'Yes'`);
	logger.log(`👽 : 'What did it cost?'`);
	logger.log(`😈 : 'Everything...'`);
	logger.log(`[ ${deletedFilesCount} (out of ${files.length}) file(s) have died ]`);
};
