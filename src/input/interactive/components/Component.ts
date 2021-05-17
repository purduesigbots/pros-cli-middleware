import { GenericFactory } from '../GenericFactory';
import { CommonElementArguments } from '../Common';

/**
 * The object coming from the CLI, used in the constructor
 */
export type ComponentArguments = CommonElementArguments & {
  etype: string[]
}

export class Component {
  constructor(_args?: ComponentArguments) {}
}

export type ComponentConstructor = { new(ComponentArguments: ComponentArguments): Component }

export class ComponentFactory extends GenericFactory<Component, ComponentConstructor, ComponentArguments> {
  constructor(classes: ComponentConstructor[], bound_args?: Partial<ComponentArguments>) {
    super(classes, bound_args);
    if (!this.bound_args.__componentFactory) {
      this.bound_args.__componentFactory = this;
    }
  }
}
