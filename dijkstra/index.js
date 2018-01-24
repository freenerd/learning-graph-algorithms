const graph = require('./lib/graph');
const dot = require('./lib/dot');

console.log(dot.graphToDot(graph.generate(10)));
