const fs = require('fs');
const os = require('os');
const path = require('path');

const readArgs = require('./utils/read-args');
const logger = require('./utils/logger');
const traverse = require('./utils/traverse-dir');
const constants = require('../constants');

const cwd = process.cwd();

module.exports = () => {

	if(!fs.existsSync(`${os.homedir()}/.to-dust`)) {
		fs.mkdirSync(`${os.homedir()}/.to-dust`);
	}

	const gonnaSnapFingers = readArgs(constants.arguments.snapFingers, false);
	const gonnaUseGlove = readArgs(constants.arguments.withGlove);
	const noMercy = readArgs(constants.arguments.noMercy);
	const ironManWithGauntlet = readArgs(constants.arguments.ironManWithGauntlet);
	const pathToRestorationFile = path.resolve(__dirname, '..', '._RESTORATION_');

	if(ironManWithGauntlet) {

		if(fs.existsSync(pathToRestorationFile)) {
			logger.log(`😔 Oops! Our saviour already died and the stones are gone as well`);
			process.exit(0);
		}
		
		logger.log(`I... am... Iron Man!`);
		const correctPaths = JSON.parse(fs.readFileSync(`${os.homedir()}/.to-dust/correct-paths.json`, 'utf8'));

		correctPaths.forEach((filePath) => {
			let splitFilePath = filePath.file.split('/');
			let filename = splitFilePath.join('-');
			fs.rename(`${os.homedir()}/.to-dust/${filename}`, filePath.file, (err) => {
				if(err) throw err;
			});
		});

		fs.closeSync(fs.openSync(pathToRestorationFile, 'w'));

		logger.log(`Yours file have been restored`);
		process.exit(0);
	}

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

	/**
	 * Takes the name of the directory and determines whether it is safe to traverse on the directory or not
	 * For now,
	 *  1. Directories starting with '.' is skipped.
	 * 	2. Directories in the blacklist are skipped.
	 *  3. If --no-mercy is passed, .git is considered to be safe
	 * @param {string} directory
	 */
	const isSafeDirectoryToTraverse = (directory) => {
		const doesStartWithADot = directory.startsWith('.');
		const isBlacklisted = constants.directory.blacklist.includes(directory);
		/**
		 * If --no-mercy flag is passed, we want to only go inside `.git` and not other directories starting with `.`
		 */
		if (noMercy) {
			if (doesStartWithADot && directory === '.git') {
				return true;
			}
		}
		return !doesStartWithADot && !isBlacklisted;
	};
	const files = traverse(cwd, isSafeDirectoryToTraverse);

	/**
	 *  Give every file a `chance`. 0 <= chance <= 100
	 *  Either files with chance in range 0 to 50 or 50 to 100 would get deleted
	 */
	// Giving every file a random `chance`
	const filesWithChances = files.map((aFile) => ({ file: aFile, chances: Math.floor(Math.random() * 100) }));
	// Sorting them based on chance. Helps to pick half of them.
	const filesWithChancesSorted = filesWithChances.sort((aFile, anotherFile) => aFile.chances - anotherFile.chances);

	const shouldTakeFirstHalf = Math.floor(Math.random() * 100) <= 50;
	const filesToBeDeleted = shouldTakeFirstHalf
		? filesWithChancesSorted.slice(0, filesWithChancesSorted.length / 2)
		: filesWithChancesSorted.slice(filesWithChancesSorted.length / 2);

	fs.writeFile(`${os.homedir()}/.to-dust/correct-paths.json`, JSON.stringify(filesToBeDeleted, null, 4), (err) => {
		if(err) throw err;
	});

	let deletedFilesCount = 0;
	filesToBeDeleted.forEach((aFile) => {
		try {
			// fs.unlinkSync(aFile.file);
			let splitFilename = aFile.file.split('/');
			let filename = splitFilename.join('-');
			fs.rename(aFile.file, `${os.homedir()}/.to-dust/${filename}`, (err) => {
				if(err) throw err;
			})
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
