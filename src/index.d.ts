declare namespace pros {
  type Callbacks = {
    notify: (d: any) => void,
    log: (d: any) => void,
    prompt: (d: any, cb: (c: any) => boolean) => void,
    finalize: (d: any) => void
  }
  type UploadProjectOptions = Partial<{run: boolean, name: string, slot: number}>
  /** Conductor */
  namespace conductor {
    type ApplyTemplateOptions = Partial<{upgrade: boolean, install: boolean, download: boolean, user: boolean, system: boolean}>
    type ListTemplatesOptions = Partial<{offline: boolean, online: boolean, refresh: boolean, limit: number}>
    type PurgeTemplateOptions = Partial<{force: boolean}>
    type GetProjectInfoOptions = Partial<{upgrades: boolean}>
    type CreateNewProjectOptions = Partial<{user: boolean, system: boolean, refresh: boolean}>
    type UpgradeProjectOptions = Partial<{install: boolean, download: boolean, user: boolean, system: boolean}>

    export function applyTemplate(callbacks: Callbacks, path: string, { upgrade, install, download, user, system }: ApplyTemplateOptions): Promise<number>

    export function fetchTemplate(callbacks: Callbacks, query: string): Promise<number>

    export function listTemplates(callbacks: Callbacks, query: string, { offline, online, refresh, limit }: ListTemplatesOptions): Promise<number>

    export function purgeTemplate(callbacks: Callbacks, { force }: PurgeTemplateOptions): Promise<number>
  }
}
