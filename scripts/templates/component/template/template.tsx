import { Component, h } from '@stencil/core';

@Component({
  tag: 'vaw-template',
  styleUrl: 'template.scss',
  shadow: false
})
export class Template {
  render() {
    return <p>template</p>;
  }
}
