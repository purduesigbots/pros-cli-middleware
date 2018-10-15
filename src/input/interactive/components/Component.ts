import { GenericFactory } from '../GenericFactory';

export type ComponentArguments = {
  etype: string[],
  __componentFactory: ComponentFactory,
  _update: (d: any) => void,
  _kill: () => void
}

export type ComponentConstructor = { new(ComponentArguments): Component }

export class Component {}

export class ComponentFactory extends GenericFactory<Component, ComponentConstructor, ComponentArguments> {
  constructor(classes: ComponentConstructor[], bound_args?: Partial<ComponentArguments>) {
    super(classes, bound_args);
    if (!this.bound_args.__componentFactory) {
      this.bound_args.__componentFactory = this;
    }
  }
}
