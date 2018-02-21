'use strict';

/*eslint no-undef: "off"*/

const dijkstra = require('../index.js');
const viz = require('viz.js');

const graph = dijkstra.graph.generate(10);
const dot = dijkstra.dot.graphToDot(graph);

function displayGraph() {
  const image = viz(dot, {format: 'png-image-element'});
  const div = document.getElementById('image');
  if (div.firstElementChild) {
    div.firstElementChild.replaceWith(image);
  } else {
    document.getElementById('image').appendChild(image);
  }

  setTimeout(displayGraph, 1000);
}
displayGraph();
