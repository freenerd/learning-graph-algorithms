'use strict';

function graphToDot(graph) {
  var output = [];

  output.push('digraph dijkstra {');
  output.push('  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];');

  graph.forEach((node, i) => {
    output.push(`  "${i}" [style="filled" color="grey79" fillcolor="grey79"];`);
    node.forEach((edge) => {
      output.push(`  "${i}" -> "${edge.destination}" [ label="${edge.weight}" ];`);
    });
  });

  output.push('}');

  return output.join('\n');
}

module.exports.graphToDot = graphToDot;
