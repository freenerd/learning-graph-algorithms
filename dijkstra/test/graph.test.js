'use strict';

const tape = require('tape');

const graph = require('../lib/graph');

tape('graph.generate', (assert) => {
  function testGraph(g, length) {
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

  [2, 5, 10].forEach((i) => {
    testGraph(graph.generate(i), i);
  });

  assert.end();
});
