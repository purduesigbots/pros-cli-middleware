import { BasicParameterizedComponent, BasicParameterizedComponentArguments } from './BasicParameterizedComponent';

/**
 * The object coming from the CLI, used in the constructor
 */
export type InputBoxArguments = BasicParameterizedComponentArguments & {
  placeholder?: string
};

export class InputBox extends BasicParameterizedComponent {
  placeholder?: string

  constructor(args: InputBoxArguments) {
    super(args);
    this.placeholder = args.placeholder;
  }
}
