import { CLIEmitter, cliHook } from './util.js'
import {
  Callbacks,
  ListTemplatesOptions,
  GetProjectInfoOptions,
  CreateNewProjectOptions,
  UpgradeProjectOptions
} from './types.js'

// export const applyTemplate = (query, options) => {
//   // stub
// }
// export const fetchTemplate = (query, options) => {
//   // stub
// }

// usage: `try { code = await cli.listTemplates(...) } catch (e) { ... }`
// or (for non-blocking): `cli.listTemplates(...).then(...).catch(...)`

export const listTemplates = (callbacks: Callbacks, query: string, { offline, online, refresh, limit }: ListTemplatesOptions={}): Promise<number> => {
  // NOTE: need to do the following shenanigans because there's three-state logic
  // here (undefined, true, false)
  let offlineStr: string
  if (offline === undefined) {
    offlineStr = ''
  } else {
    offlineStr = `--${offline ? 'allow' : 'no'}-offline`
  }

  let onlineStr: string
  if (online === undefined) {
    onlineStr = ''
  } else {
    onlineStr = `--${online ? 'allow' : 'no'}-online`
  }

  let refreshStr: string
  if (refresh === undefined) {
    refreshStr = ''
  } else {
    refreshStr = `${refresh ? '--force-refresh' : ''}`
  }

  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'ls-templates',
        `${query || ''}`,
        offlineStr, onlineStr, refreshStr,
        `${limit ? '--limit ' + limit : ''}`
      ].filter(e => e !== '')
    ), callbacks
  ) // return promise wrapped around spawned cli proc exiting
}
// export const createTemplate = (path, name, version, options) => {
//   // stub
// }

export const getProjectInfo = (callbacks: Callbacks, path: string, { upgrades }: GetProjectInfoOptions={}): Promise<number> => {
  let upgradeStr: string
  if (upgrades === undefined) {
    upgradeStr = ''
  } else {
    upgradeStr = `--${upgrades ? '' : 'no-'}ls-upgrades`
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'info-project', upgradeStr
      ].filter(e => e !== ''), path
    ), callbacks
  )
}

export const createNewProject = (callbacks: Callbacks, path: string, version: string, platform: string='v5', { user, system, refresh }: CreateNewProjectOptions={}): Promise<number> => {
  let userStr: string
  if (user === undefined) {
    userStr = ''
  } else {
    userStr = `${user ? '--force-user' : ''}`
  }
  let systemStr: string
  if (system === undefined) {
    systemStr = ''
  } else {
    systemStr = `${system ? '--force-system' : ''}`
  }
  let refreshStr: string
  if (refresh === undefined) {
    refreshStr = ''
  } else {
    refreshStr = `${refresh ? '--force-refresh' : ''}`
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'n',
        userStr, systemStr, refreshStr,
        path, platform, version
      ].filter(e => e !== '')
    ), callbacks
  )
}

export const upgradeProject = (callbacks: Callbacks, path: string, version: string, { install, download, user, system }: UpgradeProjectOptions={}): Promise<number> => {
  let installStr: string
  if (install === undefined) {
    installStr = ''
  } else {
    installStr = `--${install ? '' : 'no-'}install`
  }
  let downloadStr: string
  if (download === undefined) {
    downloadStr = ''
  } else {
    downloadStr = `--${download ? '' : 'no-'}download`
  }
  let userStr: string
  if (user === undefined) {
    userStr = ''
  } else {
    userStr = `${user ? '--force-user' : ''}`
  }
  let systemStr: string
  if (system === undefined) {
    systemStr = ''
  } else {
    systemStr = `${system ? '--force-system' : ''}`
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'u',
        version,
        installStr, downloadStr,
        userStr, systemStr
      ].filter(e => e !== ''), path
    ), callbacks
  )
}
