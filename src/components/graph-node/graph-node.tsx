import {
  Event,
  EventEmitter,
  Component,
  Prop,
  h
} from "@stencil/core";

import { NodeInput, BaseNode } from "@virtuaw/graphnodes";

@Component({
  tag: 'vaw-graph-node',
  styleUrl: 'graph-node.scss',
  shadow: false
})
export class GraphNode {
  @Prop() node: BaseNode = new BaseNode();

  @Event() dragSocket: EventEmitter;
  @Event() dropSocket: EventEmitter;

  emitDragSocket(socket) {
    this.dragSocket.emit(socket);
  }

  emitDropSocket(socket) {
    this.dropSocket.emit(socket);
  }

  private getInput(input: NodeInput) {
    const { active, title, value, allowInput, allowConnection } = input;
    const onConnectionStart = () => this.emitDragSocket(input)
    const onConnectionFinish = () => this.emitDropSocket(input);
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
    const output = this.node.output;
    const onConnectionStart = () => this.emitDragSocket(output)
    const onConnectionFinish = () => this.emitDropSocket(output);

    const args = {
      isInput: false,
      title: output.title,
      onConnectionStart,
      onConnectionFinish
    };

    return <vaw-graph-node-socket {...args}></vaw-graph-node-socket>;
  }

  render() {
    return (
      <div class="node">
        <div class="header">{this.node.title}</div>
        <div class="body">
          <div class="interface inputs">
            {this.node.inputs.map((input) => this.getInput(input))}
          </div>
          <div class="interface output">
            {this.getOutput()}
          </div>
        </div>
      </div>
    );
  }
}
