import {
  Event,
  EventEmitter,
  State,
  Listen,
  Component,
  Prop,
  h
} from "@stencil/core";

import { NodeInput, GraphNode as GraphNodeInternal } from "@virtuaw/graphnodes";

@Component({
  tag: 'vaw-graph-node',
  styleUrl: 'graph-node.scss',
  shadow: true
})
export class GraphNode {
  /**
   * The GraphNode instance.
   */
  @Prop() graphnode: GraphNodeInternal = new GraphNodeInternal();

  @State() connectingSocket: NodeInput = null;
  @State() connectingFromInput: boolean = null;
  @State() connectingElement: HTMLElement = null;

  @Listen('document:mouseup')
  stopConnection() {
    this.connectingSocket = null;
    this.connectingFromInput = null;
    this.connectingElement = null;
  }

  @Event() addConnection: EventEmitter;

  @Prop() onAddConnection: Function = (...args) => console.log(args);

  startConnection(event, input?: NodeInput, output?: GraphNodeInternal) {
    const connector = input || output;
    this.connectingSocket = connector;

    this.connectingFromInput = !!input;
    this.connectingElement = event.target;

    if (this.connectingFromInput) {
      connector.active = 'true';
    }
    event.preventDefault();
    event.stopPropagation();
  }

  finishConnection(event, input?: NodeInput, output?: GraphNodeInternal) {
    console.log(input, output, event);
    if (!input && !!this.connectingFromInput || !!input && !this.connectingFromInput) {
      this.stopConnection();
      input ? input.active = 'false' : this.connectingSocket.active = 'false';
      return;
    }

    input = input || this.connectingSocket;
    output = NodeInput || this.connectingSocket;

    const inputElement = !!input ? event.target : this.connectingElement;
    const outputElement = !input ? event.target : this.connectingElement;

    input.connect(output);

    this.addConnection.emit();
    this.onAddConnection(input, output, inputElement, outputElement, event);
  }

  disconnect(input: NodeInput) {
    input.graph = null;
  }

  handleChange(input: NodeInput, event) {
    input.defaultValue = event.value;
  }

  private getInput(input: NodeInput) {
    const { active, title, value, allowInput, allowConnection } = input;
    const onConnectionStart = event => this.startConnection(event, input, null);
    const onConnectionFinish = event => this.finishConnection(event, input, null);
    const args = {
      isInput: true,
      active,
      title,
      value,
      allowInput,
      allowConnection,
      onConnectionStart,
      onConnectionFinish
    };

    return <vaw-graph-node-socket {...args}></vaw-graph-node-socket>;
  }

  private getOutput() {
    const title = this.graphnode.output;
    const isInput = false;
    const onConnectionStart = event => this.startConnection(event, this, null);
    const onConnectionFinish = event => this.finishConnection(event, this, null);
    const args = { title, isInput, onConnectionStart, onConnectionFinish };

    return <vaw-graph-node-socket {...args}></vaw-graph-node-socket>;
  }

  render() {
    return (
      <div class="node">
        <div class="header">{this.graphnode.title}</div>
        <div class="body">
          <div class="interface inputs">
            {this.graphnode.inputs.map((input) => this.getInput(input))}
          </div>
          <div class="interface output">
            {this.getOutput()}
          </div>
        </div>
      </div>
    );
  }
}
