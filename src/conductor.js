import { CLIEmitter, cliHook } from './util.js'

export const applyTemplate = (query, options) => {
  // stub
}
export const fetchTemplate = (query, options) => {
  // stub
}

// usage: `try { code = await cli.listTemplates(...) } catch (e) { ... }`
export const listTemplates = (notify, log, finalize, query, { offline, online, refresh, limit }={}) => {
  // NOTE: need to do the following shenanigans because there's three-state logic
  // here (undefined, true, false)
  let offlineStr;
  if (offline === undefined) {
    offlineStr = ''
  } else {
    offlineStr = `--${offline ? 'allow' : 'no'}-offline`
  }

  let onlineStr;
  if (online === undefined) {
    onlineStr = ''
  } else {
    onlineStr = `--${online ? 'allow' : 'no'}-online`
  }

  let refreshStr;
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
    ), notify, log, finalize
  ) // return promise wrapped around spawned cli proc exiting
}
export const createTemplate = (path, name, version, options) => {
  // stub
}

export const getProjectInfo = (options) => {
  // stub
}
export const createNewProject = (notify, log, finalize, path, version, platform='v5', { user, system, refresh }={}) => {
  let userStr;
  if (user === undefined) {
    userStr = ''
  } else {
    userStr = `${user ? '--force-user' : ''}`
  }
  let systemStr
  if (system === undefined) {
    systemStr = ''
  } else {
    systemStr = `${system ? '--force-system' : ''}`
  }
  let refreshStr;
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
    ), notify, log, finalize
  )
}
