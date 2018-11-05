export type CallbackFunctionArguments = {
  d: any,
  output: (c: any) => boolean,
  kill: () => void
}

export interface CallbackFunction {
  (CallbackFunctionArguments): void
}

export type Callbacks = {
  notify: CallbackFunction,
  log: CallbackFunction,
  prompt: CallbackFunction,
  finalize: CallbackFunction,
  input: CallbackFunction
};

export type ApplyTemplateOptions = Partial<{upgrade: boolean, install: boolean, download: boolean, user: boolean, system: boolean}>;
export type ListTemplatesOptions = Partial<{offline: boolean, online: boolean, refresh: boolean, limit: number, target: string}>;
export type PurgeTemplateOptions = Partial<{force: boolean}>;
export type GetProjectInfoOptions = Partial<{upgrades: boolean}>;
export type CreateNewProjectOptions = Partial<{user: boolean, system: boolean, refresh: boolean, compile: boolean, cache: boolean}>;
export type UpgradeProjectOptions = Partial<{install: boolean, download: boolean, user: boolean, system: boolean}>;
export type BuildCompileCommandsOptions = Partial<{suppressOutput: boolean, compileCommandsFile: string, sandbox: boolean}>;

export type UploadProjectOptions = Partial<{run: boolean, name: string, slot: number}>;

export type V5RemoveFileOptions = Partial<{all: boolean}>;

export class UnsupportedVersionException extends Error {}

export * from './input/interactive';
