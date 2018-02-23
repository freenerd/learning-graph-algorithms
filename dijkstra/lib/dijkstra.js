'use strict';

const TinyQueue = require('tinyqueue');

function shortestPath(graph, start, destination) {
  const queue = new TinyQueue([], (a, b) => { return a.distance > b.distance; });
  const distances = {};
  const predecessor = {};

  // initialize
  distances[start] = 0;
  queue.push({index: start, distance: distances[start]});

  while (queue.length !== 0 && queue.peek().index !== destination) {
    let node = queue.pop();

    graph.nodes[node.index].edges.forEach((edge) => {
      let tentativeWeight = distances[node.index] + edge.weight;
      let distance = distances[edge.destination];

      if (distance === undefined || tentativeWeight < distance) {
        // set destinations new weight since it's shorter
        distances[edge.destination] = tentativeWeight;
        predecessor[edge.destination] = node;

        // add destination for future investigation
        queue.push({
          index: edge.destination,
          distance: distances[edge.distance]
        });
      }
    });
  }

  // no path found
  if (!distances[destination]) {
    return {path: null, distance: null};
  }

  // collect path
  let path = [destination];
  let backtrack = destination;
  while (predecessor[backtrack]) {
    path.unshift(predecessor[backtrack].index);
    backtrack = predecessor[backtrack].index;
  }
  return {path: path, distance: distances[destination]};
}

module.exports.shortestPath = shortestPath;
