'use strict';

function graphToDot(graph) {
  let output = [];

  output.push('digraph dijkstra {');
  output.push('  node [shape="record" style="filled" color="grey79" fillcolor="grey79"];');

  graph.forEach((node, i) => {
    var color = 'grey79';
    if(Math.random() < 0.5) color = 'red';
    output.push(`  "${i}" [style="filled" color="grey79" fillcolor="${color}"];`);
    node.forEach((edge) => {
      output.push(`  "${i}" -> "${edge.destination}" [ label="${edge.weight}" ];`);
    });
  });

  output.push('}');

  return output.join('\n');
}

module.exports.graphToDot = graphToDot;
