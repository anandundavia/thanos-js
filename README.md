# thanos-js

Thanos has now arrived on your PC and he will bring havoc to your files.

He will wipe out about one quarter of your files if he snaps fingers without gauntlet.
And If he has the gauntlet, he will crush about half of them.

You are lucky though, he can only carry out destruction in the directory in which the command is executed.

## Install

`npm install -g thanos-js`

## Usage

-   Limited Power: `thanos-js snap-fingers`
-   Full Power: `thanos-js snap-fingers --with-infinity-gauntlet-glove`

## Technical Details

-   Yes, It deletes the files. [ for those who are confused about what this package does ]

-   It uses `fs.unlinkSync` to delete the files.

-   It traverses the whole directory structure down from where the command is executed. So files inside child directories might be deleted.

-   It does not traverse every directory. `node_modules`, `.git` and other directories starting with '`.`' are not traversed. [ Deleting random files from `.git` would be absolutely evil and Thanos would LOVE to do it 😈 ]
-   It is not fixed that the number of files deleted would exactly be half or one third. The piece of code that decides whether the file should be deleted or not is this:

```js
const random = Math.floor(Math.random() * 100);
const shouldDelete = gonnaUseGlove ? random < 50 : random < 25;
if (shouldDelete) {
	// logic to delete the file
}
```
