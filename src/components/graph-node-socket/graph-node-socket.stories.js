import { storiesOf } from '@storybook/polymer';
import { NodeInput, NodeOutput, math, input } from '@virtuaw/graphnodes';

const stories = storiesOf('Graph Node Socket', module);

stories.add('input', () => {
  const inputElement = document.createElement('vaw-graph-node-socket');

  return inputElement;
});

stories.add('output', () => {
  const outputElement = document.createElement('vaw-graph-node-socket');
  return outputElement;
});
