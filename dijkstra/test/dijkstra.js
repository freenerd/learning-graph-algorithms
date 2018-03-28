'use strict';

const tape = require('tape');

const dijkstra = require('../lib/dijkstra');
const graph = require('../lib/graph');
const Graph = graph.Graph;
const Node = graph.Node;
const Edge = graph.Edge;

tape('has shortest path on known small graph', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1)]),
    new Node([new Edge(2, 3), new Edge(0, 1)]),
    new Node([new Edge(0, 4)])
  ]);

  assert.deepEqual(
    dijkstra.shortestPathFunc(g, 0, 2),
    {
      path: [0, 1, 2],
      distance: 4
    }
  );
  assert.end();
});

tape('has shortest path on known bigger graph', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1)]),
    new Node([new Edge(2, 3), new Edge(3, 2)]),
    new Node([new Edge(3, 1)]),
    new Node([new Edge(4, 4)]),
    new Node([new Edge(0, 4)])
  ]);

  assert.deepEqual(
    dijkstra.shortestPathFunc(g, 0, 4),
    {
      path: [0, 1, 3, 4],
      distance: 7
    }
  );
  assert.end();
});

tape('has shortest path on big graph', (assert) => {
  let g = graph.generate(100000, 'myseed');

  console.time('djikstra');
  let result = dijkstra.shortestPathFunc(g, 0, 9000);
  console.timeEnd('djikstra');

  assert.ok(result.path, 'has path');
  assert.ok(result.distance, 'has distance');
  assert.end();
});

tape('no path can be found', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1)]),
    new Node([new Edge(0, 1)]),
    new Node([new Edge(0, 4)])
  ]);

  assert.deepEqual(
    dijkstra.shortestPathFunc(g, 0, 2),
    {
      path: null,
      distance: null
    }
  );
  assert.end();
});
