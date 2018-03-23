'use strict';

const seedrandom = require('seedrandom');

const MAX_RANDOM_EDGES = 3;

class Edge {
  constructor(destination, weight) {
    this.weight = weight;
    this.destination = destination;
  }
}

class Node {
  constructor(edges) {
    this.edges = edges || [];
  }

  push(element) {
    this.edges.push(element);
  }
}

class Graph {
  constructor(nodes) {
    this.nodes = nodes || [];
  }

  push(element) {
    this.nodes.push(element);
  }
}

function isValidEdge(node, dest, index) {
  // avoid self-reference
  if (dest === index) return false;

  // avoid duplicate edges
  for (const edge of node.edges) {
    if (edge.destination === dest) return false;
  }

  return true;
}

function generate(numNodes, seed) {
  const random = seedrandom(seed);
  console.log(`Generating random graph from seed ${random.int32()}`);

  function getRandomInt(min, max) {
    return Math.floor(random() * (max - min)) + min;
  }

  if (numNodes === 1) throw new Error('Thats not a cool graph. Lets have at least 2 nodes');

  const graph = new Graph();

  for (let i = 0; i < numNodes; i++) {
    const node = new Node();

    // make circular edges
    //  - assures every node is reachable from every other node
    //  - assures every node has at least one incoming and one outgoing edge
    const dest = (i === numNodes - 1 ? 0 : i + 1);
    node.push(new Edge(dest, getRandomInt(1, 50)));

    // make random edges
    const numEdges = getRandomInt(0, MAX_RANDOM_EDGES);
    for (let e = 0; e < numEdges; e++) {
      const dest = getRandomInt(0, numNodes - 1);
      if (isValidEdge(node, dest, i)) {
        node.push(new Edge(dest, getRandomInt(1, 50)));
      }
    }

    graph.push(node);
  }

  return graph;
}

exports.generate = generate;
exports.Graph = Graph;
exports.Node = Node;
exports.Edge = Edge;
