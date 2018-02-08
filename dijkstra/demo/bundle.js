(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

const dijkstra = require('../index.js');

const graph = dijkstra.graph.generate(10);
const data = dijkstra.graph.toD3(graph);

const canvas = document.querySelector('canvas');
const width = canvas.width;
const height = canvas.height;
const context = canvas.getContext('2d');

console.log(width, height);

const simulation = d3.forceSimulation()
  .force('link', d3.forceLink())
  .force('charge', d3.forceManyBody().strength(-1000))
  .force('center', d3.forceCenter(width / 2, height / 2));

simulation
  .nodes(data.nodes)
  .on('tick', ticked);

simulation.force('link').links(data.links);

function ticked() {
  context.clearRect(0, 0, width, height);

  context.beginPath();
  data.links.forEach(drawLink);
  context.strokeStyle = '#aaa';
  context.stroke();

  context.beginPath();
  data.nodes.forEach(drawNode);
  context.fill();
  context.strokeStyle = '#fff';
  context.stroke();
}

function drawLink(d) {
  context.moveTo(d.source.x, d.source.y);
  context.lineTo(d.target.x, d.target.y);
}

function drawNode(d) {
  context.moveTo(d.x + 3, d.y);
  context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
}

},{"../index.js":2}],2:[function(require,module,exports){
'use strict';

module.exports.graph = require('./lib/graph');
module.exports.dot = require('./lib/dot');

},{"./lib/dot":3,"./lib/graph":4}],3:[function(require,module,exports){
'use strict';

function graphToDot(graph) {
  let output = [];

  output.push('digraph dijkstra {');
  output.push('  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];');

  graph.forEach((node, i) => {
    output.push(`  "${i}" [style="filled" color="grey79" fillcolor="grey79"];`);
    node.forEach((edge) => {
      output.push(`  "${i}" -> "${edge.destination}" [ label="${edge.weight}" ];`);
    });
  });

  output.push('}');

  return output.join('\n');
}

module.exports.graphToDot = graphToDot;

},{}],4:[function(require,module,exports){
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

function toD3(graph) {
  let o = {
    nodes: [],
    links: []
  };

  for (const node in graph) {
    o.nodes.push({name: parseInt(node)});
    for (const edge in graph[node]) {
      o.links.push({
        source: parseInt(node),
        target: graph[node][edge].destination
      });
    }
  }

  return o;
}

module.exports.generate = generate;
module.exports.toD3 = toD3;

},{}]},{},[1]);
