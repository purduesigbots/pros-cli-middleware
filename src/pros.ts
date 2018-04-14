import { Callbacks, UploadProjectOptions } from './types';
import { CLIEmitter, cliHook, argSwitch } from './util';

export const listDevices = (callbacks: Callbacks, target: 'v5'|'cortex'|void|undefined): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'lsusb', `${target ? '--target'+target : ''}`
      ].filter(e => e !== '')
    ), callbacks
  );
};

export const uploadProject = (callbacks: Callbacks, path: string, {run, name, slot}: UploadProjectOptions={}): Promise<number> => {
  let runStr: string = argSwitch('run-after', '', 'no', run);
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'u', runStr, `${name ? '--name '+name : ''}`, `${slot ? '--slot '+slot : ''}`
      ].filter(e => e !== ''),
      path
    ), callbacks
  );
};

export const testUi = (callbacks: Callbacks) => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'test'
      ]
    ), callbacks
  );
};
