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

KDTree.prototype.delete = function (keyArray, value) {
	//del
};

KDTree.prototype.minimum = function (root, dimension) {
	if (this.root == null) {
		return (null);
	}

	var alignment = root.level % this.dimension;
	if (dimension == alignment) {
		if (root.left == null) {
			return (root.keyArray [dimension]);
		}
		else {
			return (this.minimum (root.left, dimension));
		}
	}
	else {
		var l = Infinity, r = Infinity;

		if (root.left != null) { l = this.minimum (root.left, dimension); }
		if (root.right != null) {r = this.minimum (root.right, dimension); }

		return (Math.min (root.keyArray [dimension], l, r));
	}
};

KDTree.prototype.maximum = function (dimension) {
	//max
};

KDTree.prototype.find = function (keyArray) {
	//max
};

KDTree.prototype.describe = function () {
	//desc
};

module.exports = KDTree;


var myTree = new KDTree (4);
var dimension = 2;

myTree.insert (myTree.root, [10, 3, -2, 8], 'alpha');
myTree.insert (myTree.root, [4, 8, 190, 1], 'bravo');
myTree.insert (myTree.root, [50, -1, 18, -10], 'charlie');
myTree.insert (myTree.root, [45, 19, 10, 8], 'delta');

console.log (myTree.minimum (myTree.root, 0));
console.log (myTree.minimum (myTree.root, 1));
console.log (myTree.minimum (myTree.root, 2));
console.log (myTree.minimum (myTree.root, 3));