Implementation of Dijkstras Algorithm for finding the shortest path between two nodes in a graph

### References

- [Paper](http://www-m3.ma.tum.de/foswiki/pub/MN0506/WebHome/dijkstra.pdf)
- [Wikipedia](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)

### Graph construction

The graph is represented as an array of nodes. Each node is an array of edges. Each edge has a destination and a weight.

Examples:

```js
// two nodes with one edge
[
  [ { destination: 1, weight: 1 } ],
  []
]

// three nodes with edges in a circle with increasing weight
[
  [ { destination: 1, weight: 1 } ],
  [ { destination: 2, weight: 2 } ],
  [ { destination: 0, weight: 3 } ]
]

// three nodes all connected to each other with different weight
[
  [ { destination: 1, weight: 9 }, { destination: 2, weight: 6 }],
  [ { destination: 0, weight: 1 }, { destination: 2, weight: 6 }],
  [ { destination: 0, weight: 5 }, { destination: 1, weight: 3 }]
]
```

The automatically generated graphs have the following guarantees:

- Every node has between 1 and 3 outgoing edges
- Every node has at least one incoming edge
- EVery two nodes may at most have one edge connecting them
- One node may not have an edge to itself

### Graph visualization

`node index.js | dot -T png -o graph.png`

### Algorithm
