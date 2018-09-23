import { ComponentFactory, ComponentConstructor } from './components';
import { ApplicationFactory, ApplicationConstructor, Application } from './applications';

export function createInteractiveInputHandler(components: ComponentConstructor[], applications: ApplicationConstructor[]) {
  const cf: ComponentFactory = new ComponentFactory(components);
  const af: ApplicationFactory = new ApplicationFactory(applications, { __componentFactory: cf });

  let apps: Map<string, Application> = new Map<string, Application>();

  return (d: any, cb: (d: any) => void): void => {
    if (d.type === 'input/interactive') {
      cf.bound_args._update = cb
      af.bound_args._update = cb
      if (apps.has(d.uuid)) {
        apps.get(d.uuid).refresh(af.resolveArgs(d));
      } else {
        apps.set(d.uuid, af.createInstance(d));
      }
    }
  }
}
