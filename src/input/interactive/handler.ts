import { CallbackFunctionArguments } from '../../types';
import { ComponentFactory, ComponentConstructor } from './components';
import { ApplicationFactory, ApplicationConstructor, Application } from './applications';

export function createInteractiveInputHandler(components: ComponentConstructor[], applications: ApplicationConstructor[]) {
  const cf: ComponentFactory = new ComponentFactory(components);
  const af: ApplicationFactory = new ApplicationFactory(applications, { __componentFactory: cf });

  let apps: Map<string, Application> = new Map<string, Application>();

  return ({ d, output }: CallbackFunctionArguments): void => {
    if (d.type === 'input/interactive') {
      cf.bound_args._update = (d: any): void => {
        output(JSON.stringify(d));
      };
      af.bound_args._update = (d: any): void => {
        output(JSON.stringify(d));
      };

      if (apps.has(d.uuid)) {
        apps.get(d.uuid).refresh(af.resolveArgs(d));
      } else {
        apps.set(d.uuid, af.createInstance(d));
      }
    }
  }
}
