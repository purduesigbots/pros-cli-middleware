import { Component, ComponentArguments } from './Component';

/**
 * The object coming from the CLI, used in the constructor
 */
export type LabelArguments = ComponentArguments & {
  text: string
};

export class Label extends Component {
  text: string

  constructor(args: LabelArguments) {
    super(args);
    this.text = args.text;
  }
}
