import { ComponentArguments, Component, ComponentFactory } from '../components';
import { GenericFactory } from '../factory';

export type ApplicationArguments = {
  elements: ComponentArguments[],
  uuid: string,
  should_exit: boolean,
  etype: string[],
  __componentFactory: ComponentFactory,
  _update: (d: any) => void
}

export type ApplicationConstructor = { new(ApplicationArguments): Application }

export abstract class Application {
  elements: Component[];
  uuid: string;
  _update: (d: any) => void;

  destroy(): void { }

  constructor({
    elements,
    uuid,
    __componentFactory,
    _update
  }: ApplicationArguments) {
    this.elements = elements.map(c => __componentFactory.createInstance(c));
    this.uuid = uuid;
    this._update = _update;
  }

  refresh({ should_exit, elements, __componentFactory }: ApplicationArguments) {
    if (should_exit) {
      this.destroy();
    } else {
      this.elements = elements.map(c => __componentFactory.createInstance(c));
    }
  }
}

export class ApplicationFactory extends GenericFactory<Application, ApplicationConstructor, ApplicationArguments> { }
