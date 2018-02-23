'use strict';

/*eslint no-undef: "off"*/

const dijkstra = require('../index.js');
const viz = require('viz.js');

const graph = dijkstra.graph.generate(10);

function displayGraph() {
  let dot = dijkstra.dot.graphToDot(graph);
  let image = viz(dot, {format: 'png-image-element'});
  let div = document.getElementById('image');
  if (div.firstElementChild) {
    div.firstElementChild.replaceWith(image);
  } else {
    document.getElementById('image').appendChild(image);
  }

  setTimeout(displayGraph, 1000);
}
displayGraph();
