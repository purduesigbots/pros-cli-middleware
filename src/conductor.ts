import { gte } from 'semver';
import { CLIEmitter, cliHook, argSwitch, getVersion } from './util';
import { Callbacks, UpgradeProjectOptions, ApplyTemplateOptions, ListTemplatesOptions, PurgeTemplateOptions, GetProjectInfoOptions, CreateNewProjectOptions, BuildCompileCommandsOptions } from './types';

export const applyTemplate = (callbacks: Callbacks, path: string, query: string, { upgrade, install, download, user, system }: ApplyTemplateOptions={}): Promise<number> => {
  let upgradeStr: string = argSwitch('upgrade', '', 'no', upgrade);
  let installStr: string = argSwitch('install', '', 'no', install);
  let downloadStr: string = argSwitch('download', '', 'no', download);
  let userStr: string = argSwitch('upgrade-user-files', '', 'no', user);
  let systemStr: string = system === undefined ? '' : '--force';
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'apply',
        upgradeStr, installStr, downloadStr, userStr, systemStr,
        query
      ].filter(e => e !== ''), path
    ), callbacks
  );
};
export const fetchTemplate = (callbacks: Callbacks, query: string): Promise<number> => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'fetch', query
      ]
    ), callbacks
  );
};
export const listTemplates = (callbacks: Callbacks, query: string, { offline, online, refresh, limit }: ListTemplatesOptions={}): Promise<number> => {
  let offlineStr: string = argSwitch('offline', 'allow', 'no', offline);
  let onlineStr: string = argSwitch('online', 'allow', 'no', online);
  let refreshStr: string = refresh === undefined ? '' : `${refresh ? '--force-refresh' : ''}`;
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'ls-templates',
        `${query || ''}`,
        offlineStr, onlineStr, refreshStr,
        `${limit ? '--limit ' + limit : ''}`
      ].filter(e => e !== '')
    ), callbacks
  );
};
export const purgeTemplate = (callbacks: Callbacks, query: string, { force }: PurgeTemplateOptions={}): Promise<number> => {
  let forceStr = force === undefined ? '' : `${force ? '--force' : ''}`;
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'p', forceStr
      ].filter(e => e !== '')
    ), callbacks
  );
};

export const getProjectInfo = (callbacks: Callbacks, path: string, { upgrades }: GetProjectInfoOptions={}): Promise<number> => {
  let upgradeStr: string = argSwitch('ls-upgrades', '', 'no', upgrades);
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'info-project', upgradeStr
      ].filter(e => e !== ''), path
    ), callbacks
  );
};

export const createNewProject = async (callbacks: Callbacks, path: string, version: string, platform: string='v5', { user, system, refresh, compile, cache }: CreateNewProjectOptions={}): Promise<number> => {
  let userStr: string = user === undefined ? '' : `${user ? '--force-user' : ''}`;
  let systemStr: string = system === undefined ? '' : `${system ? '--force-system' : ''}`;
  let refreshStr: string = refresh === undefined ? '' : `${refresh ? '--force-refresh' : ''}`;
  const cliVersion = await getVersion();
  let compileStr: string = '';
  let cacheStr: string = '';
  if (gte(cliVersion, '3.0.8')) {
     compileStr = compile === undefined ? '' : `${compile ? '--compile-after' : ''}`;
     cacheStr = cache === undefined ? '' : `${cache ? '--build-cache' : ''}`;
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'n',
        userStr, systemStr, refreshStr, compileStr, cacheStr,
        path, platform, version
      ].filter(e => e !== '')
    ), callbacks
  );
};

export const upgradeProject = (callbacks: Callbacks, path: string, version: string, { install, download, user, system }: UpgradeProjectOptions={}): Promise<number> => {
  let installStr: string = argSwitch('install', '', 'no', install);
  let downloadStr: string = argSwitch('download', '', 'no', download);
  let userStr: string = user === undefined ? '' : `${user ? '--force-user' : ''}`;
  let systemStr: string = system === undefined ? '' : `${system ? '--force-system' : ''}`;
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'c', 'u',
        version,
        installStr, downloadStr,
        userStr, systemStr
      ].filter(e => e !== ''), path
    ), callbacks
  );
};
