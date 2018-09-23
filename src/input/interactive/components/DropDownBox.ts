import { BasicParameterizedComponent, BasicParameterizedComponentArguments } from './BasicParameterizedComponent';

export type DropDownBoxArguments = BasicParameterizedComponentArguments & {
  options: string[]
};

export class DropDownBox extends BasicParameterizedComponent {
  options: string[]

  constructor(args: DropDownBoxArguments) {
    super(args);
    this.options = args.options;
  }
}
