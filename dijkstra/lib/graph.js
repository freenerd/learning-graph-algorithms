'use strict';

const MAX_RANDOM_EDGES = 3;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeEdge(destination, weight) {
  weight = weight || getRandomInt(1, 50);
  return {destination: destination, weight: weight};
}

function isValidEdge(node, dest, index) {
  // avoid self-reference
  if (dest === index) return false;

  // avoid duplicate edges
  for (const edge of node) {
    if (edge.destination === dest) return false;
  }

  return true;
}

function generate(numNodes) {
  if (numNodes === 1) throw new Error('Thats not a cool graph. Lets have at least 2 nodes');

  let graph = [];

  for (let i = 0; i < numNodes; i++) {
    let node = [];

    // make circular edges
    //  - assures every node is reachable from every other node
    //  - assures every node has at least one incoming and one outgoing edge
    node.push(makeEdge(i === numNodes - 1 ? 0 : i + 1));

    // make random edges
    const numEdges = getRandomInt(0, MAX_RANDOM_EDGES);
    for (let e = 0; e < numEdges; e++) {
      const dest = getRandomInt(0, numNodes - 1);
      if (isValidEdge(node, dest, i)) {
        node.push(makeEdge(dest));
      }
    }

    graph.push(node);
  }

  return graph;
}

module.exports.generate = generate;
