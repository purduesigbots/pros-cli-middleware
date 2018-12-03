import { CLIEmitter, cliHook, getVersion } from './util';
import { Callbacks, UnsupportedVersionException, UpdateProjectInteractiveOptions, UploadInteractiveOptions } from './types';
import { gt } from 'semver';

export const createNewProjectInteractive = async (callbacks: Callbacks): Promise<number> => {
  const cliVersion = await getVersion();
  if (gt(cliVersion, '3.1.2')) { // TODO: Make this the right version comparison
    return cliHook(
      new CLIEmitter(
        'prosv5', [
          'interactive', 'new_project'
        ].filter(e => e !== '')
      ), callbacks
    );
  } else {
    return Promise.reject(new UnsupportedVersionException(`prosv5 interactive new_project requires version >= 3.1.3. You have ${cliVersion}. Update CLI or downgrade plugin`));
  }
};

export const updateProjectInteractive = async (callbacks: Callbacks, { project }: UpdateProjectInteractiveOptions = {}): Promise<number> => {
  const cliVersion = await getVersion();
  if (gt(cliVersion, '3.1.2')) { // TODO: Make this the right version comparison
    const projectStr = project ? `--project "${project}"` : '';
    return cliHook(
      new CLIEmitter(
        'prosv5', [
          'interactive', 'update_project', projectStr
        ].filter(e => e !== '')
      ), callbacks
    );
  } else {
    return Promise.reject(new UnsupportedVersionException(`prosv5 interactive update_project requires version >= 3.1.3. You have ${cliVersion}. Update CLI or downgrade plugin`));
  }
};

export const uploadInteractive = async (callbacks: Callbacks, { project }: UploadInteractiveOptions = {}): Promise<number> => {
  const cliVersion = await getVersion();
  if (gt(cliVersion, '3.1.2')) { // TODO: Make this the right version comparison
    const projectStr = project ? `--project "${project}"` : '';
    return cliHook(
      new CLIEmitter(
        'prosv5', [
          'interactive', 'upload', projectStr
        ].filter(e => e !== '')
      ), callbacks
    );
  } else {
    return Promise.reject(new UnsupportedVersionException(`prosv5 interactive upload requires version >= 3.1.3. You have ${cliVersion}. Update CLI or downgrade plugin`));
  }
};
