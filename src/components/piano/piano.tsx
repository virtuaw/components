import { State, Listen, Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'vaw-piano',
  styleUrl: 'piano.scss',
  shadow: true
})
export class Piano {
  /**
   * The first key's note (as midi value)
   */
  @Prop() startNote: number = 24;

  /**
   * The last key's note (as midi value)
   */
  @Prop() endNote: number = 122;

  /**
   * Currently active keys
   */
  @State() activeKeys = [];

  /**
   * Key Event Emitter
   */

  @Listen('document:mouseup')
  handleMouseup() {
    this.activeKeys = [];
  }

  /**
   * Key Mousedown handler
   */
  // trigger(note: number, event?: Event) {
  //   this.activeKeys.add(note);
  // }

  /**
   * Note activation
   */
  noteOn(note: number) {
    this.activeKeys = [
      ...this.activeKeys,
      note
    ]
  }

  /**
   * Note deactivation
   */
  noteOff(note: number) {
    this.activeKeys = this.activeKeys.filter((n) => n !== note)
  }

  /**
   * The range of notes as array of midi values
   */
  private get notes(): number[] {
    const { startNote, endNote } = this;
    const range = endNote - startNote;
    return Array.from(Array(range)).map((_, note) => note + startNote);
  }

  private getKeys() {
    const blackNotes = [1, 3, 6, 8, 10];

    return this.notes.map((note) => {
      const color = blackNotes.includes(note % 12) ? 'black' : 'key white';
      const active = this.activeKeys.some((n) => n === note) ? 'active' : '';
      const cssClass = `key ${color} ${active}`;
      const onMouseDown = () => this.noteOn(note);
      const onMouseEnter = (e) => e.buttons === 1 && this.noteOn(note);
      const onMouseLeave = () => this.noteOff(note);

      const attrs = { onMouseDown, onMouseEnter, onMouseLeave, class: cssClass };
      return (<div {...attrs}></div>);
    });
  }

  render() {
    return <div class="keys">{this.getKeys()}</div>;
  }
}
