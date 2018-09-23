import { Component, ComponentArguments } from './Component';

export type ContainerArguments = ComponentArguments & {
  title?: string,
  description?: string,
  elements: ComponentArguments[]
};

export class Container extends Component {
  title?: string;
  description?: string;
  elements: Component[];

  constructor({title, description, elements, __componentFactory}: ContainerArguments) {
    super();
    this.title = title;
    this.description = description;
    this.elements = elements.map(e => __componentFactory.createInstance(e));
  }
}
