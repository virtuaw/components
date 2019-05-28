import { storiesOf } from '@storybook/polymer';

const stories = storiesOf('Template', module);

stories.add('default', () => {
  const element = document.createElement('vaw-template');

  return element;
});
