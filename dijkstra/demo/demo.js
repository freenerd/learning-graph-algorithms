'use strict';

/*eslint no-undef: "off"*/

const dijkstra = require('../index.js');
const viz = require('viz.js');

const graph = dijkstra.graph.generate(15);

function displayGraph(params) {
  let dot = dijkstra.dot.graphToDot(params);
  let image = viz(dot, {format: 'png-image-element'});
  let div = document.getElementById('image');
  if (div.firstElementChild) {
    div.firstElementChild.replaceWith(image);
  } else {
    document.getElementById('image').appendChild(image);
  }
}

const run = dijkstra.dijkstra.shortestPath(graph, 0, 12);

function next() {
  const res = run.next();
  displayGraph(res.value);
  if (!res.done) setTimeout(next, 1000);
}
next();
