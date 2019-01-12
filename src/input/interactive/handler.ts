import { CallbackFunctionArguments } from '../../types';
import { ComponentFactory, ComponentConstructor } from './components';
import { ApplicationFactory, ApplicationConstructor, Application } from './applications';
import { CommonElementArguments } from './Common'

/**
 * Directly handles the input/interactive message from the CLI and kicks off
 * deserializing the Application that was broadcast
 */
export class InteractiveInputHandler {
  cf: ComponentFactory;
  af: ApplicationFactory;
  apps: Map<string, Application> = new Map<string, Application>();

  constructor(components: ComponentConstructor[], applications: ApplicationConstructor[]) {
    this.cf = new ComponentFactory(components);
    this.af = new ApplicationFactory(applications);
  }

  handler({ d, output, kill }: CallbackFunctionArguments): void {
    if (d.type === 'input/interactive') {
      const commonArgs: CommonElementArguments = {
        _update:  (d: any): void => {
          output(JSON.stringify(d));
        },
        _kill: ((): void => {
          kill();
          this.destroyAll();
        }).bind(this),
        __componentFactory: this.cf
      }

      this.cf.bound_args = commonArgs;
      this.af.bound_args = commonArgs;

      if (this.apps.has(d.uuid)) {
        this.apps.get(d.uuid).refresh(this.af.resolveArgs(d));
      } else if(d.hasOwnProperty('etype')) {
        // d has etype attribute, so there should be enough information to
        // construct object. There is the posibility that we only see an exit
        // notification from the CLI
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
