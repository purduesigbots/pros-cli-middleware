import { Callbacks, UploadProjectOptions, BuildCompileCommandsOptions } from './types';
import { CLIEmitter, cliHook, argSwitch, getVersion } from './util';
import { gte } from 'semver';

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

export const buildCompileCommands = async (callbacks: Callbacks, path: string, build_args: string[], {suppressOutput, compileCommandsFile, sandbox}: BuildCompileCommandsOptions={}): Promise<number> => {
  const cliVersion = await getVersion();
  let suppressOutputStr: string = '';
  let compileCommandsFileStr: string = '';
  let sandboxStr: string = '';
  if (gte(cliVersion, '3.0.8')) {
    suppressOutputStr = argSwitch('output', 'suppress', 'show', suppressOutput);
    compileCommandsFileStr = compileCommandsFile === undefined ? '' : `--compile-commands ${compileCommandsFile}`;
    sandboxStr = sandbox ? '--sandbox': '';
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'build-compile-commands',
        suppressOutputStr,
        compileCommandsFileStr,
        sandboxStr,
        ...build_args
      ].filter(e => e !== ''), path
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
