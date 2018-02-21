'use strict';

function graphToDot(graph) {
  let output = [];

  output.push('digraph dijkstra {');
  output.push('  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];');

  graph.nodes.forEach((node, i) => {
    let color = 'grey79';
    output.push(`  "${i}" [style="filled" color="grey79" fillcolor="${color}"];`);
    node.edges.forEach((edge) => {
      output.push(`  "${i}" -> "${edge.destination}" [ label="${edge.weight}" ];`);
    });
  });

  output.push('}');

  return output.join('\n');
}

module.exports.graphToDot = graphToDot;
