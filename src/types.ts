export type Callbacks = {
  notify: (d: any) => void,
  log: (d: any) => void,
  prompt: (d: any, cb: (c: any) => boolean) => void,
  finalize: (d: any) => void
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
