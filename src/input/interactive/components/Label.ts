import { Component, ComponentArguments } from './Component';

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
