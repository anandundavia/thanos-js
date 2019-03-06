const fs = require('fs');
const path = require('path');

const constants = require('../../constants');

/**
 * Takes the name of the directory and determines whether it is safe to traverse on the directory or not
 * For now,
 *  1. Directories starting with '.' is skipped.
 * 	2. Directories in the blacklist are skipped.
 * @param {string} directory
 */
const isSafeDirectoryToTraverse = (directory) => {
    return !directory.startsWith('.') && !constants.directory.blacklist.includes(directory);
};

const traverse = (dir, listOfFilesSoFar = []) => {
    const child = fs.readdirSync(dir);
    for (let i = 0; i < child.length; i++) {
        const currentChild = child[i];
        const currentPath = path.resolve(dir, currentChild);
        listOfFilesSoFar.push(currentPath);
        if (isSafeDirectoryToTraverse(currentChild)) {
            const isDirectory = fs.lstatSync(currentPath).isDirectory();
            if (isDirectory) {
                traverse(currentPath, listOfFilesSoFar);
            }
        }
	}
	return listOfFilesSoFar;
};

module.exports = traverse;
