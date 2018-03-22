'use strict';

const tape = require('tape');

const graph = require('../lib/graph');

function testGraph(g, length, assert) {
  assert.equal(g.nodes.length, length, `g${length}: has expected length`);

  g.nodes.forEach((node, nodeId) => {
    assert.ok(node.edges.length > 0, `g${length}: node has edges`);
    assert.equal(node.edges.length, new Set(node.edges.map((e) => e.destination)).size, 'unique destinations');
    assert.ok(node.edges.length >= 1 && node.edges.length <= 3, `g${length}: number of edges within bounds`);

    node.edges.forEach((edge) => {
      assert.notEqual(nodeId, edge.destination, `g${length}: edge destination is not source node`);
      assert.ok(edge.destination <= length - 1, `g${length}: edge destination is within graph`);
      assert.deepEqual(Object.keys(edge).sort(), ['destination', 'weight'].sort(), `g${length}: edge has expected keys`);
    });
  });
}

tape('graph.generate random', (assert) => {
  [2, 5, 10].forEach((i) => {
    testGraph(graph.generate(i), i, assert);
  });

  assert.end();
});

tape('graph.generate seeded', (assert) => {
  const expected = {
    nodes: [
      {
        edges: [{
          weight: 26,
          destination: 1
        }]
      }, {
        edges: [{
          weight: 12,
          destination: 2
        }, {
          weight: 8,
          destination: 0
        }]
      }, {
        edges: [{
          weight: 38,
          destination: 3
        }]
      }, {
        edges: [{
          weight: 38,
          destination: 4
        }]
      }, {
        edges: [{
          weight: 22,
          destination: 0
        }, {
          weight: 32,
          destination: 1
        }]
      }]
  };
  const actual = graph.generate(5, 'myseed');
  assert.deepEqual(actual, expected, 'has expected seeded graph');
  testGraph(actual, 5, assert);

  assert.end();
});
