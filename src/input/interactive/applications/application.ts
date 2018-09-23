import { ComponentArguments, Component, ComponentFactory } from '../components';
import { GenericFactory } from '../factory';

export type ApplicationArguments = {
  elements: ComponentArguments[],
  uuid: string,
  etype: string[],
  __componentFactory: ComponentFactory,
  _update: (d: any) => void
}

export type ApplicationConstructor = { new(ApplicationArguments): Application }

export abstract class Application {
  elements: Component[];
  uuid: string;

  constructor({ elements, uuid, __componentFactory }: ApplicationArguments) {
    this.elements = elements.map(c => __componentFactory.createInstance(c));
    this.uuid = uuid;
  }

  refresh({ elements, __componentFactory }: ApplicationArguments) {
    this.elements = elements.map(c => __componentFactory.createInstance(c));
  }
}

export class ApplicationFactory extends GenericFactory<Application, ApplicationConstructor, ApplicationArguments> { }
