import { Component, ComponentArguments } from './Component';

/**
 * The object coming from the CLI, used in the constructor
 */
export type ParameterizedComponentArguments = ComponentArguments & {
  uuid: string,
  value: any,
  valid?: boolean,
  valid_reason?: string
};

export class ParameterizedComponent extends Component {
  uuid: string;
  value: any;
  valid?: boolean;
  valid_reason? : string;

  update_callback: (d: any) => void;

  constructor({ uuid, value, valid, valid_reason, _update }: ParameterizedComponentArguments) {
    super();
    this.uuid = uuid;
    this.value = value;
    this.valid = valid;
    this.valid_reason = valid_reason;
    this.update_callback = _update;
  }

  update(value: any): void {
    this.update_callback({
      event: 'update',
      uuid: this.uuid,
      args: [value]
    });

    this.value = value;
  }
}
