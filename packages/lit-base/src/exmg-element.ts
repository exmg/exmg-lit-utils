import {LitElement} from 'lit';

/**
 * Base Element for Exmg Lit Components
 *
 */
export class ExmgElement extends LitElement {
  protected bubbles = false;

  /**
   * Helper function for throwing custom events
   * @param eventName Name of the event
   * @param detail Payload
   * @param bubbles Bubbling event or not, default to false.
   */
  protected fire<T>(eventName: string, detail?: T, bubbles?: boolean) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: bubbles || this.bubbles,
        composed: true,
        detail,
      }),
    );
  }
}
