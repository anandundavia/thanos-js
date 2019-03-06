const startsWithDoubleHyphen = (str) => str && str[0] === str[1] && str[0] === '-';

const read = (arg = '', requireHyphen = true) => {
	if (!arg) return null;
	if (requireHyphen && !startsWithDoubleHyphen(arg)) {
		arg = `--${arg}`;
	}
	const index = process.argv.findIndex((x) => x === arg);
	/** Does the argument exists? */
	if (index !== -1) {
		/** Do we have the next value in the args array? */
		if (index + 1 < process.argv.length) {
			/**
			 * Yes we do
			 * Let's check if the next value is another argument or possible value
			 */
			if (startsWithDoubleHyphen(process.argv[index + 1])) {
				/** The next value is another argument. Thus, specified argument is flag */
				return true;
			}
			return process.argv[index + 1];
		}
		/** No we don't have next value in args array. the argument passed was as a flag */
		return true;
	}
	/** Nope, argument not passed */
	return null;
};

module.exports = read;
