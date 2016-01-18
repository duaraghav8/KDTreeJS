var KDTree = require ('./lib/KDTree')
var myTree = new KDTree (4);
var dimension = 2;

myTree.insert ([10, 3, -2, 8], 'alpha');
myTree.insert ([4, 8, 190, 1], 'bravo');
myTree.insert ([50, -1, 18, -2], 'charlie');
myTree.insert ([45, 19, 10, 8], 'delta');

console.log (myTree.minimum (dimension));

myTree.delete ([4, 8, 190, 1]);
myTree.describe ();

console.log (myTree.maximum (dimension));
console.log (myTree.find ([45, 19, 10, 8]));