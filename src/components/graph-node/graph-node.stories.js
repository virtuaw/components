import { storiesOf } from '@storybook/polymer';
import { NodeInput, GraphNode, math, input } from '@virtuaw/graphnodes';

const stories = storiesOf('Graph Node', module);

const node = new GraphNode(
  [
    new NodeInput('a', 5, true, true),
    new NodeInput('b', 10, true, true)
  ],
  (a, b) => a + b
);

stories.add('default', () => {
  const graphNodeElement = document.createElement('vaw-graph-node');

  return graphNodeElement;
});

stories.add('custom node', () => {
  const graphNodeElement = document.createElement('vaw-graph-node');
  graphNodeElement.graphnode = node;
  return graphNodeElement;
});
storis
