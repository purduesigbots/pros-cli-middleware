// TODO: this has made me rethink how we should be exporting functions, as these
//       functions don't make much sense as package-level functions (rather it
//       might be more idiomatically correct to call something like
//       v5.listFiles()). alternatively, index.ts could be removed, and users of
//       this package would have to
//       import { listFiles } from '@purduesigbots/pros-cli-middleware/v5'

import { Callbacks, V5RemoveFileOptions } from './types';
import { CLIEmitter, cliHook, argSwitch } from './util';

export const listFiles = (callbacks: Callbacks, port?: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'ls-files', port || ''
      ]
    ), callbacks
  );
};
export const removeAll = (callbacks: Callbacks, port?: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'rm-all', port || ''
      ]
    ), callbacks
  );
};
export const removeFile = (callbacks: Callbacks, file: string, { all }: V5RemoveFileOptions = {}, port?: string): Promise<number> => {
  let allStr: string;
  if (all === undefined) {
    allStr = '';
  } else {
    allStr = `${all ? '--erase-all' : '--erase-only'}`;
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'rm-file', allStr, port || ''
      ].filter(e => e !== '')
    ), callbacks
  );
};
// TODO: this function can also take a CWD, in which case file can be omitted as the CLI attempts to find the proper
//       filename from the CWD's PROS project. determine how this should be handled
export const runProgram = (callbacks: Callbacks, file?: string, port?: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'run', file || '', port || ''
      ].filter(e => e !== '')
    ), callbacks
  );
};
export const systemStatus = (callbacks: Callbacks, port?: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'status', port || ''
      ].filter(e => e !== '')
    ), callbacks
  );
};
// TODO: same as above
export const stopProgram = (callbacks: Callbacks, file?: string, port?: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'v5', 'stop', file || '', port || ''
      ].filter(e => e !== '')
    ), callbacks
  );
};
