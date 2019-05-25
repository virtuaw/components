import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'vaw-graph-node-socket',
  styleUrl: 'graph-node-socket.scss',
  shadow: true
})
export class GraphNodeSocket {
  /**
   * Whether the socket is connected / currently connecting
   */
  @Prop() active: boolean = false;

  /**
   * The Socket's title
   */
  @Prop() title: string = '';

  /**
   * The Socket's current value
   */
  @Prop() value: any = null;

  /**
   * Whether to show the input field if this is an input socket
   */
  @Prop() allowInput: boolean = true;

  /**
   * Whether to show the socket connector if this is an input socket
   */
  @Prop() allowConnection: boolean = false;

  /**
   * Whether this is an input or output socket
   */
  @Prop() isInput: boolean = true;

  handleChange(event) {
    console.log(event);
  }

  render() {
    const { active, title, value, allowInput, allowConnection, isInput } = this;

    const classNames = `socket ${active && 'active'} ${isInput ? 'input' : 'output'}`;

    const onInput = (event) => this.handleChange(event);

    const socketArgs = { class: classNames, title, allowInput };
    const inputArgs = { value, onInput };
    const showInput = allowInput && isInput;
    const showConnection = allowConnection || !isInput;

    return (
      <div class="connector">
        {showConnection ? <div {...socketArgs}></div> : null}
        {showInput ? <input {...inputArgs} /> : null}
        <span class="title">{title}</span>
      </div>
    );
  }
}
