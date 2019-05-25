import { Component, Prop, h } from '@stencil/core';

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

  startConnection(input: NodeInput, event) {
    input.active = true;
    console.log(input);
    event.preventDefault();
    event.stopPropagation();
  }

  disconnect(input: NodeInput) {
    input.graph = null;
  }

  handleChange(input: NodeInput, event) {
    input.defaultValue = event.value;
  }

  private getInput(input: NodeInput) {
    const { active, title, value, allowInput, allowConnection } = input;
    const args = { isInput: true, active, title, value, allowInput, allowConnection };

    // const classNames = 'socket' + (input.active && ' active');

    // const onMouseDown = (event) => this.startConnection(input, event);
    // const onClick = () => this.disconnect(input);
    // const onInput = (event) => this.handleChange(input, event);

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
            <vaw-graph-node-socket title={this.graphnode.output} isInput="false">
            </vaw-graph-node-socket>
          </div>
        </div>
      </div>
    );
  }
}
