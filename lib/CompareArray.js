module.exports = function (first, second) {
	if (first.length == second.length && first.every (function (elem, pos) {
		return (elem === second [pos]);
	})) {
			return (true);
	}
	return (false);
};