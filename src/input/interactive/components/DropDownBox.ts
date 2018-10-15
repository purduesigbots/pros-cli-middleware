import { BasicParameterizedComponent, BasicParameterizedComponentArguments } from './BasicParameterizedComponent';

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
