import { Component, ComponentArguments } from './component';

type ParameterizedComponentArguments = ComponentArguments & {
  uuid: string,
  value: any,
  valid?: boolean
};

export class ParameterizedComponent extends Component {
  uuid: string;
  value: any;
  valid?: boolean;

  update_callback: (d: any) => void;

  constructor({ uuid, value, valid, _update }: ParameterizedComponentArguments) {
    super();
    this.uuid = uuid;
    this.value = value;
    this.valid = valid;
    this.update_callback = _update;
  }

  update(value: any): void {
    this.update_callback(JSON.stringify({
      event: 'update',
      uuid: this.uuid,
      args: [value]
    }));

    this.value = value;
  }
}
