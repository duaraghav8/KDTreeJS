var KDTree = require ('./lib/KDTree');

var treeDimension = 4;
var myTree = new KDTree (treeDimension);

console.log ('Constructing KD TREE');
console.log ('------------------------------------------------------');

myTree.construct ([
	{key: [10, 3, -2, 8], value: 'alpha'},
	{key: [4, 8, 190, 1], value: 'bravo'},
	{key: [50, -1, 18, -10], value: 'charlie'},
	{key: [45, 19, 10, 8], value: 'delta'}
]);

/*
//alternatively, construct tree like:

myTree.insert (myTree.root, [10, 3, -2, 8], 'alpha');
myTree.insert (myTree.root, [4, 8, 190, 1], 'bravo');
myTree.insert (myTree.root, [50, -1, 18, -10], 'charlie');
myTree.insert (myTree.root, [45, 19, 10, 8], 'delta');
*/

console.log ('Finding Minimum');
console.log ('------------------------------------------------------');

console.log (myTree.minimum (myTree.root, 0));		//find Node with minimum value in Dimension 0
console.log (myTree.minimum (myTree.root, 1));		//find Node with minimum value in Dimension 1
console.log (myTree.minimum (myTree.root, 2));		//and so on...
console.log (myTree.minimum (myTree.root, 3));

console.log ('Finding Maximum');
console.log ('------------------------------------------------------');

console.log (myTree.maximum (myTree.root, 0));		//find Node with maximum value in Dimension 0
console.log (myTree.maximum (myTree.root, 1));
console.log (myTree.maximum (myTree.root, 2));
console.log (myTree.maximum (myTree.root, 3));

console.log ('Finding by Key');
console.log ('------------------------------------------------------');

console.log (myTree.find (myTree.root, [45, 19, 10, 8]));		//find Node with the key given as argument
console.log (myTree.find (myTree.root, [50, -1, 18, -10]));
console.log (myTree.find (myTree.root, [4, 8, 190, 1]));
console.log (myTree.find (myTree.root, [10, 3, -2, 8]));