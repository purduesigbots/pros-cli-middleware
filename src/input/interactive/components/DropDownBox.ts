import { BasicParameterizedComponent, BasicParameterizedComponentArguments } from './BasicParameterizedComponent';

/**
 * The object coming from the CLI, used in the constructor
 */
export type DropDownBoxArguments = BasicParameterizedComponentArguments & {
  options: any[]
};

export class DropDownBox extends BasicParameterizedComponent {
  options: string[]

  constructor(args: DropDownBoxArguments) {
    super(args);
    this.options = args.options.map(e => e.toString());
  }
}
