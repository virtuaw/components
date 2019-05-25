import { Event, EventEmitter, Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'vaw-graph-node-socket',
  styleUrl: 'graph-node-socket.scss',
  shadow: false
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

  /**
   * Event that's emitted when starting to create a connection between two sockets
   */
  @Event() connectionStart: EventEmitter;

  /**
   * Callback for connection start event
   */
  // @Prop() onConnectionStart: (event: CustomEvent<any>) => void;

  /**
   * Event that's emitted when attempting to finish a connection
   */
  @Event() connectionFinish: EventEmitter;

  /**
   * Callback for connection finish event
   */
  // @Prop() onConnectionFinish: (event: CustomEvent<any>) => void;

  /**
   * Input default value change emitter
   */
  @Event() change: EventEmitter;

  /**
   * Callback for connection finish event
   */
  // @Prop() onChange: Function = () => null;

  render() {
    const { active, title, value, allowInput, allowConnection, isInput } = this;

    const classNames = `socket ${active && 'active'} ${isInput ? 'input' : 'output'}`;

    const onInput = () => {
      this.change.emit();
    };

    const onMouseDown = (event) => {
      event.preventDefault();
      this.connectionStart.emit();
    }

    const onMouseUp = () => {
      this.connectionFinish.emit();
    }

    const socketArgs = { class: classNames, title, allowInput, onMouseDown, onMouseUp };
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
