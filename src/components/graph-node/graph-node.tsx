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

  onMouseDown(input: NodeInput) {
    console.log(input);
  }

  onClick(input: NodeInput) {
    console.log(input);
  }

  handleChange(input: NodeInput, event) {
    input.defaultValue = event.value;
  }

  getInput(input: NodeInput) {
    const { allowInput, title, value } = input;

    const onMouseDown = () => this.onMouseDown(input);
    const onClick = () => this.onClick(input);
    const onInput = (event) => this.handleChange(input, event);

    const socketArgs = { class: 'socket', title, allowInput, onMouseDown, onClick };
    const inputArgs = { value, onInput };

    return (
      <div>
        <div {...socketArgs}></div>
        {input.allowInput ? <input {...inputArgs} /> : null}
        <span class="input-title">{input.title}</span>
      </div>
    );
  }

  render() {
    return (
      <div class="node">
        <div class="header">{this.graphnode.title}</div>
        <div class="body">
          <div class="interface inputs">
            {this.graphnode.inputs.map(this.getInput)}
          </div>
          <div class="interface output">
            <div>
              <div class="socket" title={this.graphnode.output}></div>
              <span class="output-title">{this.graphnode.output}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
