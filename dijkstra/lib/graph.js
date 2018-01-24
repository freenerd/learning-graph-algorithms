function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeEdge(destination, weight) {
  weight = weight || getRandomInt(1, 50);
  return { destination: destination, weight: weight };
}

function generate(numNodes) {
  if (numNodes === 1) throw 'Thats not a cool graph. Lets have at least 2 nodes';

  var nodes = [];

  for (var i=0; i < numNodes; i++) {
    var node = [];

    // assure every node is connected to at least one other by making a circle
    node.push(makeEdge(i === numNodes - 1 ? 0 : i + 1));

    for (var e=0; e < getRandomInt(0, 4); e++) {
      var dest = getRandomInt(0, numNodes - 1);
      if (
        // avoid self-reference
        dest !== i
        &&
        // avoid duplicate edges
        node.find((e) => e.destination === dest) === undefined
      ) {
        node.push(makeEdge(dest));
      }
    }

    nodes.push(node);
  }

  return nodes;
}

module.exports.generate = generate;
