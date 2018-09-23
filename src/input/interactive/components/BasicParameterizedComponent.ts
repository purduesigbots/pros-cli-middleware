import { ParameterizedComponent, ParameterizedComponentArguments } from './ParameterizedComponent';

export type BasicParameterizedComponentArguments = ParameterizedComponentArguments & {
  text: string
};

export class BasicParameterizedComponent extends ParameterizedComponent {
  text: string

  constructor(args: BasicParameterizedComponentArguments) {
    super(args);
    this.text = args.text;
  }
}
