import { ComponentFactory } from './components';

export type CommonElementArguments = {
  // Comes from the bound_args in the GenericFactory (see InteractiveInputHandler ctor)
  // Current use of note is by Container to construct its children
  __componentFactory: ComponentFactory,
  // Comes from the bound_args in the GenericFactory (see InteractiveInputHandler::handler)
  // Used by any component to update the CLI when the user interacts with it
  _update: (d: any) => void,
  // Comes from the bound_args in the GenericFactory (see InteractiveInputHandler::handler)
  // Current use of note is by Modal to kill the CLI when clicking cancel and will_abort is true
  _kill: () => void
}
