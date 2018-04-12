/// <reference path="index.d.ts" />

import { CLIEmitter, cliHook, argSwitch } from './util.js'

export const applyTemplate = (callbacks: pros.Callbacks, path: string, query: string, { upgrade, install, download, user, system }: pros.conductor.ApplyTemplateOptions={}): Promise<number> => {
  let upgradeStr: string = argSwitch('upgrade', '', 'no', upgrade)
  let installStr: string = argSwitch('install', '', 'no', install)
  let downloadStr: string = argSwitch('download', '', 'no', download)
  let userStr: string = argSwitch('upgrade-user-files', '', 'no', user)
  let systemStr: string = system === undefined ? '' : '--force'
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'apply',
        upgradeStr, installStr, downloadStr, userStr, systemStr,
        query
      ].filter(e => e !== ''), path
    ), callbacks
  )
}
export const fetchTemplate = (callbacks: pros.Callbacks, query: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'fetch', query
      ]
    ), callbacks
  )
}
export const listTemplates = (callbacks: pros.Callbacks, query: string, { offline, online, refresh, limit }: pros.conductor.ListTemplatesOptions={}): Promise<number> => {
  let offlineStr: string = argSwitch('offline', 'allow', 'no', offline)
  let onlineStr: string = argSwitch('online', 'allow', 'no', online)
  let refreshStr: string = refresh === undefined ? '' : `${refresh ? '--force-refresh' : ''}`
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'ls-templates',
        `${query || ''}`,
        offlineStr, onlineStr, refreshStr,
        `${limit ? '--limit ' + limit : ''}`
      ].filter(e => e !== '')
    ), callbacks
  )
}
export const purgeTemplate = (callbacks: pros.Callbacks, query: string, { force }: pros.conductor.PurgeTemplateOptions={}): Promise<number> => {
  let forceStr = force === undefined ? '' : `${force ? '--force' : ''}`
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'p', forceStr
      ].filter(e => e !== '')
    ), callbacks
  )
}

export const getProjectInfo = (callbacks: pros.Callbacks, path: string, { upgrades }: pros.conductor.GetProjectInfoOptions={}): Promise<number> => {
  let upgradeStr: string = argSwitch('ls-upgrades', '', 'no', upgrades)
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'info-project', upgradeStr
      ].filter(e => e !== ''), path
    ), callbacks
  )
}

export const createNewProject = (callbacks: pros.Callbacks, path: string, version: string, platform: string='v5', { user, system, refresh }: pros.conductor.CreateNewProjectOptions={}): Promise<number> => {
  let userStr: string = user === undefined ? '' : `${user ? '--force-user' : ''}`
  let systemStr: string = system === undefined ? '' : `${system ? '--force-system' : ''}`
  let refreshStr: string = refresh === undefined ? '' : `${refresh ? '--force-refresh' : ''}`
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

export const upgradeProject = (callbacks: pros.Callbacks, path: string, version: string, { install, download, user, system }: pros.conductor.UpgradeProjectOptions={}): Promise<number> => {
  let installStr: string = argSwitch('install', '', 'no', install)
  let downloadStr: string = argSwitch('download', '', 'no', download)
  let userStr: string = user === undefined ? '' : `${user ? '--force-user' : ''}`
  let systemStr: string = system === undefined ? '' : `${system ? '--force-system' : ''}`
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
