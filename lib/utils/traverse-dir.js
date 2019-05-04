const fs = require('fs');
const path = require('path');

const traverse = (dir, listOfFilesSoFar = [], isSafeDirectoryToTraverse) => {
	if (typeof listOfFilesSoFar === 'function') {
		isSafeDirectoryToTraverse = listOfFilesSoFar;
		listOfFilesSoFar = [];
	}
	const child = fs.readdirSync(dir);
	for (let i = 0; i < child.length; i++) {
		const currentChild = child[i];
		const currentPath = path.resolve(dir, currentChild);
		const isDirectory = fs.lstatSync(currentPath).isDirectory();
		if (isDirectory) {
			if (isSafeDirectoryToTraverse(currentChild)) {
				traverse(currentPath, listOfFilesSoFar, isSafeDirectoryToTraverse);
			}
		} else {
			listOfFilesSoFar.push(currentPath);
		}
	}
	return listOfFilesSoFar;
};

module.exports = traverse;
