'use strict';

const tape = require('tape');

const dot = require('../lib/dot');
const graph = require('../lib/graph');
const Graph = graph.Graph;
const Node = graph.Node;
const Edge = graph.Edge;

tape('dot - success', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1), new Edge(2, 2)]),
    new Node([new Edge(2, 3)]),
    new Node([new Edge(0, 4)])
  ]);

  const expected = 'digraph dijkstra {\n  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];\n  "0" [style="filled" color="grey79" fillcolor="grey79"];\n  "0" -> "1" [ label="1" ];\n  "0" -> "2" [ label="2" ];\n  "1" [style="filled" color="grey79" fillcolor="grey79"];\n  "1" -> "2" [ label="3" ];\n  "2" [style="filled" color="grey79" fillcolor="grey79"];\n  "2" -> "0" [ label="4" ];\n}';

  assert.equal(dot.graphToDot(g), expected);
  assert.end();
});
