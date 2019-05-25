import { State, Prop, Listen, Component, h } from '@stencil/core';

import { BaseNode } from '@virtuaw/graphnodes';

interface GraphNodeElement extends HTMLElement {
  node: BaseNode;
}

@Component({
  tag: 'vaw-graph',
  styleUrl: 'graph.scss',
  shadow: false
})

export class Graph {
  @Prop() nodes: BaseNode[] = [];

  public addNode(node) {
    this.nodes = [ ...this.nodes, node ];
  }

  @State() dragSocket = undefined;

  @Listen('dragSocket')
  startConnectionHandler(event: CustomEvent) {
    this.dragSocket = event.detail;
  }

  @Listen('dropSocket')
  finishConnectionHandler(event: CustomEvent) {
    this.dragSocket.connect(event.detail);
    this.dragSocket = undefined;
  }

  componentDidLoad() {
    document
      .querySelectorAll('.graph > vaw-graph-node')
      .forEach((el: GraphNodeElement, idx) => el.node = this.nodes[idx]);
  }

  render() {
    const graphNodes = this.nodes.map((_) => (
      <vaw-graph-node></vaw-graph-node>
    ));

    return (
      <div class="graph">
        {graphNodes}
      </div>
    );
  }
}
