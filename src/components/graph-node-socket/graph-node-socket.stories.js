import { storiesOf } from '@storybook/polymer';
import { NodeInput, GraphNodeSocket, math, input } from '@virtuaw/graphnodes';

const stories = storiesOf('Graph Node Socket', module);

stories.add('input', () => {
  const graphNodeElement = document.createElement('vaw-graph-node-socket');

  return graphNodeElement;
});

stories.add('output', () => {
  const graphNodeElement = document.createElement('vaw-graph-node-socket');
  graphNodeElement.graphnode = node;
  return graphNodeElement;
});
