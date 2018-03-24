/** @flow */

export type Callbacks = {|
  notify: (d: any) => void,
  log: (d: any) => void,
  prompt: (d: any, cb: (c: any) => boolean) => void,
  finalize: (d: any) => void
|}

export type ListTemplatesOptions = {offline?: boolean, online?: boolean, refresh?: boolean, limit?: number}
export type GetProjectInfoOptions = {upgrades?: boolean}
export type CreateNewProjectOptions = {user?: boolean, system?: boolean, refresh?: boolean}
export type UpgradeProjectOptions = {install?: boolean, download?: boolean, user?: boolean, system?: boolean}

export type UploadProjectOptions = {run?: boolean, name?: string, slot?: number}
