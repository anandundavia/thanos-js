const confirmation = require('./confirmation');
const snapFingers = require('./snap-fingers');

const main = async () => {
	if (!confirmation.hasConfirmedImplications()) {
		await confirmation.showAndConfirmImplications();
	}
	if (confirmation.hasConfirmedImplications()) {
		snapFingers();
	}
};

main();
