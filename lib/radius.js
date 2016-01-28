module.exports = function (key1, key2) {
	var dist = 0, i;
	for (i = 0; i < key1.length; i++) {
		dist += Math.pow (key1 [i] - key2 [i], 2);
	}
	return (dist);
};