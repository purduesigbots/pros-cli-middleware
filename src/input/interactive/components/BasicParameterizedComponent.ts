import { ParameterizedComponent, ParameterizedComponentArguments } from './ParameterizedComponent';

/**
 * The object coming from the CLI, used in the constructor
 */
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
