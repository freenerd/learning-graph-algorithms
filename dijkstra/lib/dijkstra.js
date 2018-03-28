'use strict';

const TinyQueue = require('tinyqueue');

function shortestPathFunc(graph, start, destination) {
  const run = shortestPath(graph, start, destination);
  let res;

  while (true) {
    res = run.next();
    if (res.done) break;
  }

  return {
    path: res.value.path,
    distance: res.value.distance
  };
}

function *shortestPath(graph, start, destination) {
  const queue = new TinyQueue([], (a, b) => a.distance - b.distance);
  const distances = {};
  const predecessor = {};

  // initialize
  distances[start] = 0;
  queue.push({index: start, distance: distances[start]});

  while (queue.length !== 0 && queue.peek().index !== destination) {
    yield {
      graph: graph,
      start: start,
      destination: destination,
      queue: queue
    };

    const node = queue.pop();

    for (const edge of graph.nodes[node.index].edges) {
      const tentativeWeight = distances[node.index] + edge.weight;
      const distance = distances[edge.destination];

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
    }
  }

  // no path found
  if (!distances[destination]) {
    return {path: null, distance: null};
  }

  // collect path
  const path = [destination];
  let backtrack = destination;
  while (predecessor[backtrack]) {
    backtrack = predecessor[backtrack].index;
    path.unshift(backtrack);
  }
  return {
    graph: graph,
    start: start,
    destination: destination,
    path: path,
    distance: distances[destination]
  };
}

exports.shortestPath = shortestPath;
exports.shortestPathFunc = shortestPathFunc;
