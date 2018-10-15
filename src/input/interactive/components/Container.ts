import { Component, ComponentArguments } from './Component';

export type ContainerArguments = ComponentArguments & {
  title?: string,
  description?: string,
  uuid: string,
  collapsed: boolean,
  elements: ComponentArguments[]
};

export class Container extends Component {
  title?: string;
  description?: string;
  uuid: string;
  collapsed: boolean;
  elements: Component[];

  update_callback: (d: any) => void;

  constructor({title, description, uuid, collapsed, elements, _update, __componentFactory}: ContainerArguments) {
    super();
    this.title = title;
    this.description = description;
    this.uuid = uuid;
    this.collapsed = collapsed;

    this.elements = elements.map(e => __componentFactory.createInstance(e));

    this.update_callback = _update;
  }

  updateCollapsed(collapsed: boolean) {
    this.update_callback({
      event: 'update',
      uuid: this.uuid,
      args: [collapsed]
    });

    this.collapsed = collapsed;
  }
}
