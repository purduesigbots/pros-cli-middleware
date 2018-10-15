import { CallbackFunctionArguments } from '../../types';
import { ComponentFactory, ComponentConstructor } from './components';
import { ApplicationFactory, ApplicationConstructor, Application } from './applications';

export class InteractiveInputHandler {
  cf: ComponentFactory;
  af: ApplicationFactory;
  apps: Map<string, Application> = new Map<string, Application>();

  constructor(components: ComponentConstructor[], applications: ApplicationConstructor[]) {
    this.cf = new ComponentFactory(components);
    this.af = new ApplicationFactory(applications, { __componentFactory: this.cf });
  }

  handler({ d, output, kill }: CallbackFunctionArguments): void {
    if (d.type === 'input/interactive') {
      const killFn = (): void => {
        kill();
        this.destroyAll();
      };
      this.cf.bound_args._update = (d: any): void => {
        output(JSON.stringify(d));
      };
      this.af.bound_args._update = (d: any): void => {
        output(JSON.stringify(d));
      };
      this.cf.bound_args._kill = killFn.bind(this);
      this.af.bound_args._kill = killFn.bind(this);

      if (this.apps.has(d.uuid)) {
        this.apps.get(d.uuid).refresh(this.af.resolveArgs(d));
      } else {
        this.apps.set(d.uuid, this.af.createInstance(d));
      }
    }
  }

  destroyAll(): void {
    console.log('destroying');
    this.apps.forEach((value, key) => {
      value.destroy();
    })
  }
}
