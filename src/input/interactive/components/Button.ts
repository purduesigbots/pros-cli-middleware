import { Component, ComponentArguments } from './Component';

export type ButtonArguments = ComponentArguments & {
  text: string,
  uuid: string
};

export class Button extends Component {
  text: string;
  uuid: string;

  update_callback: (d: any) => void;

  constructor({text, uuid, _update}: ButtonArguments) {
    super();
    this.text = text;
    this.uuid = uuid;

    this.update_callback = _update;
  }

  onClick() {
    this.update_callback({
      event: 'clicked',
      uuid: this.uuid
    });
  }
}
