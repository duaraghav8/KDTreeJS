"use strict";

var CompareArray = require ('./CompareArray'),
	radius = require ('./radius'),
	util = require ('util');

var Node = (function (level, keyArray, value) {
	this.level = level;
	this.keyArray = keyArray;
	this.value = value;
	this.left = null, this.right = null;
});

var KDTree = (function (dimension) {
	this.dimension = dimension;
	this.root = null;
});

KDTree.prototype.insert = function (root, keyArray, value) {
	if (this.root == null) {
		this.root = new Node (0, keyArray, value);
		return;
	}

	var alignment = root.level % this.dimension;
	if (keyArray [alignment] < root.keyArray [alignment]) {
		if (root.left == null) {
			root.left = new Node (root.level + 1, keyArray, value);
		}
		else {
			this.insert (root.left, keyArray, value);
		}
	}
	else {
		if (root.right == null) {
			root.right = new Node (root.level + 1, keyArray, value);
		}
		else {
			this.insert (root.right, keyArray, value);
		}
	}
};

KDTree.prototype.minimum = function (root, dimension) {
	var alignment = root.level % this.dimension,
		l = Infinity, r = Infinity;

	if (this.root == null) {
		return (null);
	}

	if (dimension == alignment) {
		if (root.left == null) {
			return (root.keyArray [dimension]);
		}
		else {
			return (this.minimum (root.left, dimension));
		}
	}
	else {
		if (root.left != null) { l = this.minimum (root.left, dimension); }
		if (root.right != null) {r = this.minimum (root.right, dimension); }

		return (Math.min (root.keyArray [dimension], l, r));
	}
};

KDTree.prototype.maximum = function (root, dimension) {
	var alignment = root.level % this.dimension,
	l = -Infinity, r = -Infinity;

	if (this.root == null) {
		return (null);
	}

	if (dimension == alignment) {
		if (root.right == null) {
			return (root.keyArray [dimension]);
		}
		else {
			return (this.maximum (root.right, dimension));
		}
	}
	else {
		if (root.left != null) { l = this.maximum (root.left, dimension); }
		if (root.right != null) {r = this.maximum (root.right, dimension); }

		return (Math.max (root.keyArray [dimension], l, r));
	}
};

KDTree.prototype.find = function (root, keyArray) {
	var alignment = root.level % this.dimension;

	if (this.root == null) {
		return (null);
	}
	if (CompareArray (root.keyArray, keyArray)) {
		return (root.value);
	}

	if (keyArray [alignment] < root.keyArray [alignment]) {
		if (root.left == null) {
			return (null);
		}
		else {
			return (this.find (root.left, keyArray));
		}
	}
	else {
		if (root.right == null) {
			return (null);
		}
		else {
			return (this.find (root.right, keyArray));
		}
	}
};

KDTree.prototype.findNN = function (root, searchKeyArray) {
	var alignment = root.level % this.dimension,
		rootObject = {
			key : root.keyArray,
			value : root.value,
			dist : radius (root.keyArray, searchKeyArray)
		},
		opposite = null, leftNN, rightNN, finalNN;

	if (this.root == null) {
		return (null);
	}
	if (root.left == null && root.right == null) {
		return (rootObject);
	}

	if (searchKeyArray [alignment] >= root.keyArray [alignment]) {
		finalNN = this.findNN (root.right, searchKeyArray);
		opposite = 'l';
	}
	else {
		finalNN = this.findNN (root.left, searchKeyArray);
		opposite = 'r';
	}

	if (rootObject.dist < finalNN.dist) {
		finalNN = rootObject;
	}

	if (opposite == 'l' && root.left != null) {
		if (radius ([finalNN.key [alignment]], [searchKeyArray [alignment]]) < finalNN.dist) {
			leftNN = this.findNN (root.left, searchKeyArray);
			if (leftNN.dist < finalNN.dist) {
				finalNN = leftNN;
			}
		}
	}
	else if (opposite == 'r' && root.right != null) {
		if (radius ([finalNN.key [alignment]], [searchKeyArray [alignment]]) < finalNN.dist) {
			rightNN = this.findNN (root.right, searchKeyArray);
			if (rightNN.dist < finalNN.dist) {
				finalNN = rightNN;
			}
		}
	}

	return (finalNN);
};

KDTree.prototype.construct = function (kvPairs) {
	var thisObject = this;
	
	if (!util.isArray (kvPairs)) {
		throw (new Error ('Argument is not an Array'));
	}

	kvPairs.forEach (function (item) {
		thisObject.insert (thisObject.root, item.key, item.value);
	});
}

KDTree.prototype.destroy = function (root) {
	if (this.root == null) {
		throw (new Error ('Tree is already empty'));
	}

	//logic for detroy()
}

module.exports = KDTree;