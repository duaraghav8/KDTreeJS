var KDTree = require ('./lib/KDTree');

var treeDimension = 2;
var myTree = new KDTree (treeDimension);

console.log ('Constructing KD Tree');
console.log ('------------------------------------------------------');

myTree.construct ([
	{key: [5,4], value: 'alpha'},
	{key: [2,3], value: 'bravo'},
	{key: [7,2], value: 'charlie'},
	{key: [4,7], value: 'delta'},
	{key: [8,1], value: 'echo'},
	{key: [9,6], value: 'oscar'}
]);

console.log ('Finding Nearest Neighbour');
console.log ('------------------------------------------------------');

console.log (myTree.findNN (myTree.root, [8, 1]));		//find Node having Key closest to Argument (8, 1)