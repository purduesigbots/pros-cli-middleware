import { CLIEmitter, cliHook } from './util';
import { Callbacks } from './types';

export const createNewProjectInteractive = (callbacks: Callbacks): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'interactive', 'new_project'
      ].filter(e => e !== '')
    ), callbacks
  );
};
