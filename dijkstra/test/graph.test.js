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
