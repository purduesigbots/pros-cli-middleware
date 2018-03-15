import { CLIEmitter, cliHook } from './util.js'

export const applyTemplate = (query, options) => {
  // stub
}
export const fetchTemplate = (query, options) => {
  // stub
}

// usage: `try { code = await cli.listTemplates(...) } catch (e) { ... }`
export const listTemplates = async (query='', { offline=true, online=false, refresh=false, limit=20 }, notify, log, finalize) => {
  return cliHook(
    new CLIEmitter(
      'prosv5 c ls-templates', [
        query,
        `--${offline ? 'allow' : 'no'}-offline`,
        `--${online ? 'allow' : 'no'}-online`,
        `${refresh ? '--force-refresh' : ''}`,
        `${limit ? '--limit ' + limit : ''}`
      ].filter(e => e !== '')
    ),
    notify,
    log,
    finalize
  ) // return promise wrapped around spawned cli proc exiting
}
export const createTemplate = (path, name, version, options) => {
  // stub
}

export const getProjectInfo = (options) => {
  // stub
}
export const createNewProject = (path, options) => {
  // stub
}
