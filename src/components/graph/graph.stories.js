import { storiesOf } from '@storybook/polymer';
import { NodeInput, BaseNode, math, input } from '@virtuaw/graphnodes';

const stories = storiesOf('Graph', module);

const getNode = () => {
  return new BaseNode(
    [
      new NodeInput('a', 5, true, true),
      new NodeInput('b', 10, true, true)
    ],
    (a, b) => a + b
  );
}

stories.add('default', () => {
  const graphElement = document.createElement('vaw-graph');
  graphElement.nodes = [ getNode(), getNode() ];

  return graphElement;
});
