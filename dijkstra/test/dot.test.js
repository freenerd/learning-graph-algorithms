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

  const expected = 'digraph dijkstra {\n  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];\n  "0" [style="filled" shape="box" color="grey79" fillcolor="grey79"];\n  "0" -> "1" [ label="1" fillcolor="black" color="black" ];\n  "0" -> "2" [ label="2" fillcolor="black" color="black" ];\n  "1" [style="filled" shape="box" color="grey79" fillcolor="grey79"];\n  "1" -> "2" [ label="3" fillcolor="black" color="black" ];\n  "2" [style="filled" shape="box" color="grey79" fillcolor="grey79"];\n  "2" -> "0" [ label="4" fillcolor="black" color="black" ];\n}';

  assert.equal(dot.graphToDot({graph: g}), expected);
  assert.end();
});

tape('dot - success with start and destination', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1), new Edge(2, 2)]),
    new Node([new Edge(2, 3)]),
    new Node([new Edge(0, 4)])
  ]);

  const expected = 'digraph dijkstra {\n  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];\n  "0" [style="filled" shape="box" color="grey79" fillcolor="green"];\n  "0" -> "1" [ label="1" fillcolor="black" color="black" ];\n  "0" -> "2" [ label="2" fillcolor="black" color="black" ];\n  "1" [style="filled" shape="box" color="grey79" fillcolor="grey79"];\n  "1" -> "2" [ label="3" fillcolor="black" color="black" ];\n  "2" [style="filled" shape="box" color="grey79" fillcolor="red"];\n  "2" -> "0" [ label="4" fillcolor="black" color="black" ];\n}';

  assert.equal(dot.graphToDot({graph: g, start: 0, destination: 2}), expected);
  assert.end();
});

tape('dot - success with start, destination and path', (assert) => {
  let g = new Graph([
    new Node([new Edge(1, 1), new Edge(2, 2)]),
    new Node([new Edge(2, 3)]),
    new Node([new Edge(0, 4)])
  ]);

  const expected = 'digraph dijkstra {\n  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];\n  "0" [style="filled" shape="box" color="grey79" fillcolor="green"];\n  "0" -> "1" [ label="1" fillcolor="yellow3" color="yellow3" ];\n  "0" -> "2" [ label="2" fillcolor="black" color="black" ];\n  "1" [style="filled" shape="box" color="grey79" fillcolor="yellow"];\n  "1" -> "2" [ label="3" fillcolor="yellow3" color="yellow3" ];\n  "2" [style="filled" shape="box" color="grey79" fillcolor="red"];\n  "2" -> "0" [ label="4" fillcolor="black" color="black" ];\n}';

  assert.equal(dot.graphToDot({graph: g, start: 0, destination: 2, path: [0, 1, 2]}), expected);
  assert.end();
});
