'use strict';

const tape = require('tape');

const graph = require('../lib/graph');

tape('graph.generate', (assert) => {
  function testGraph(g, length) {
    assert.equal(g.length, length, `g${length}: has expected length`);

    g.forEach((node, nodeId) => {
      assert.ok(node.length > 0, `g${length}: node has edges`);
      assert.equal(node.length, new Set(node.map((e) => e.destination)).size, 'unique destinations');
      assert.ok(node.length >= 1 && node.length <= 3, `g${length}: number of edges within bounds`);

      node.forEach((edge) => {
        assert.notEqual(nodeId, edge.destination, `g${length}: edge destination is not source node`);
        assert.ok(edge.destination <= length - 1, `g${length}: edge destination is within graph`);
        assert.deepEqual(Object.keys(edge).sort(), ['destination', 'weight'].sort(), `g${length}: edge has expected keys`);
      });
    });
  }

  [2, 5, 10].forEach((i) => {
    testGraph(graph.generate(i), i);
  });

  assert.end();
});

tape('graph.toD3', (assert) => {
  const g = [
    [{destination: 1, weight: 9}],
    [{destination: 2, weight: 14}],
    [{destination: 0, weight: 13}, {destination: 1, weight: 37}]
  ];

  const expected = {
    nodes: [
      {name: 0},
      {name: 1},
      {name: 2}
    ],
    links: [
      {source: 0, target: 1},
      {source: 1, target: 2},
      {source: 2, target: 0},
      {source: 2, target: 1}
    ]
  };

  assert.deepEqual(graph.toD3(g), expected, 'has d3 graph structure');
  assert.end();
});
