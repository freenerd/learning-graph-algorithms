'use strict';

/*eslint no-undef: "off"*/

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
