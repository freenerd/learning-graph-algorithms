'use strict';

function edgeOnPath(path, origin, destination) {
  if (!path) return false;
  if (!path.includes(origin)) return false;
  if (path[path.indexOf(origin) + 1] !== destination) return false;
  return true;
}

function graphToDot(params) {
  const graph = params.graph;
  if (!graph) throw new Error('dot needs at least a graph');
  const start = params.start;
  const destination = params.destination;
  const queue = params.queue;
  const path = params.path;

  const output = [];

  output.push('digraph dijkstra {');
  output.push('  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];');

  graph.nodes.forEach((node, i) => {
    // create node
    let color = 'grey79';

    let shape = 'box';
    if (!path && queue && queue.data.map((d) => d.index).indexOf(i) !== -1) {
      shape = 'circle';
      color = 'pink';
    }

    if (path && path.indexOf(i) !== -1) {
      color = 'yellow';
    }

    if (i === start) color = 'green';
    if (i === destination) color = 'red';

    output.push(`  "${i}" [style="filled" shape="${shape}" color="grey79" fillcolor="${color}"];`);

    // create edges
    node.edges.forEach((edge) => {
      let color = 'black';
      if (edgeOnPath(path, i, edge.destination)) {
        color = 'yellow3';
      }
      output.push(`  "${i}" -> "${edge.destination}" [ label="${edge.weight}" fillcolor="${color}" color="${color}" ];`);
    });
  });

  output.push('}');

  return output.join('\n');
}

exports.graphToDot = graphToDot;
