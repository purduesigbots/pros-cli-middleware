# pros-cli-middleware
node abstraction layer for PROS CLI

## usage
run `npm i --save @purduesigbots/pros-cli-middleware` to add to your project

import functions into files:

```js
import { listTemplates } from '@purduesigbots/pros-cli-middleware'
```

### functions

all the functions listed below return a promise that resolves when the command exits successfully. this means that there are effectively two ways to call any of these functions:

```js
let r
try {
  r = await listTemplates(...)
} catch e {
  console.error(e)
}
```

```js
listTemplates(...).then(r => {...}).catch(e => console.error(e))
```

#### conductor

- `applyTemplate(callbacks, path, query, [options])`
  Upgrade or install a template to a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  - `query`: semver-compliant string (e.g. `template@1.0.1`)
  - `options`: an object containing zero or one each of the following fields
    - `upgrade: boolean`: allow upgrading templates
    - `install: boolean`: allow installing templates
    - `download: boolean`: allow downloading templates (if `false`, will only consider local templates)
    - `user: boolean`: forcibly replace all user files in templates
    - `system: boolean`: force insertion of system files into the project
- `fetchTemplate(callbacks, query)`
  Fetch/dowload a template from a depot
  - `callbacks`: standard set of UI hooks
  - `query`: semver-compliant string (e.g. `template` or `template@^0.7.0` or `template@1.0.0`)
- `listTemplates(callbacks, query, [options])`
  Return all available templates satisfying `query`
  - `callbacks`: standard set of UI hooks
  - `query`: semver-compliant string (e.g. `template` or `template@1.0.1` or `template^0.7.0` or `1.0.0`)
  - `options`: an object containing zero or one each of the following fields
    - `offline: boolean`: return offline templates
    - `online: boolean`: return online templates
    - `refresh: boolean`: force refresh of remote listings
    - `limit: number`: limit number of templates returned
- `purgeTemplate(callbacks, query, [options])`
  Purge templates satisfying `query` from the local cache
  - `callbacks`: standard set of UI hooks
  - `query`: semver-compliant string (e.g. `template` or `template@1.0.1` or `template^0.7.0` or `1.0.0`)
  - `options`: an object containing zero or one each of the following fields
    - `force`: do not prompt for removal of multiple templates
- `getProjectInfo(callbacks, path, [options])`
  Return information about a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  -  `options`: an object containing zero or one each of the following fields
    - `upgrades: boolean`: add list of upgradable versions for templates that are out of date
- `createNewProject(callbacks, path, version, [platform='v5', options])`
  Create a new PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path at which to create project
  - `version`: the version of the kernel to use when creating the project. can be `'latest'`
  - `target`: optionally specify the platform to target. can be either `'v5'` or `'cortex'`
  - `options`: an object containing zero or one each of the following fields
    - `user: boolean`: forcibly replace all user files in templates
    - `system: boolean`: forcibly replace all system files in templates
    - `refresh: boolean`: force refresh of remote listings
    - `compile: boolean`: compile the project immediately after creation from version 1.0.0 (CLI version >=3.0.8)
    - `cache: boolean`: compile the project immediately after creation and build compile_commands.json file for cquery from version 1.0.0 (CLI version >=3.0.8)
- `upgradeProject(callbacks, path, version, [options])`
  Upgrade a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  - `version`: version to upgrade project to
  - `options`: an object containing zero or one each of the following fields
    - `install: boolean`: install libraries that are not already installed
    - `download: boolean`: download templates if not present locally (otherwise use latest available locally)
    - `user: boolean`: forcibly replace all user files in templates
    - `system: boolean` forcibly replace all system files in templates

### general

- `listDevices(callbacks, [target])`
  List connected VEX devices
  - `callbacks`: standard set of UI hooks
  - `target: 'v5'|'cortex`: optionally limit results to those matching the specified target
- `uploadProject(callbacks, path, [options])`
  Upload a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  - `options`: an object containing zero or one each of the following fields
    - `run: boolean`: run the program immmediately after uploading
    - `name: string`: name of the project on the uC (only applies for v5-targeted projects)
    - `slot: number`: the slot to which the program will be uploaded on the uC (only applies for v5-targeted projects)

### v5 utility functions

- `listFiles(callbacks, [port])`
  List files on a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice
- `removeAll(callbacks, [port])`
  Remove all program files on a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice
- `removeFile(callbacks, file, [options, port])`
  Remove a program file from a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `file`: the file to remove
  - `options`: an object containing zero or one each of the following keys
    - `all: boolean`: erase all files matching base name
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice
- `runProgram(callbacks, [file, port])`
  Run a program on a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `file`: the file to run. if unspecified, the CLI will attempt to find the correct name based on the CWD's PROS project (note: this will not work at present-- please specify a file for now)
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice
- `systemStatus(callbacks, [port])`
  Display information about a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice
- `stopProgram(callbacks, [file, port])`
  Stop a program on a connected V5 device
  - `callbacks`: standard set of UI hooks
  - `file`: the file to run. if unspecified, the CLI will attempt to find the correct name based on the CWD's PROS project (note: this will not work at present-- please specify a file for now)
  - `port`: string specifying the port of the device you wish to interact with. if unspecified, the CLI will try to choose a port. if multiple devices are connected, the CLI will prompt for a choice

## callbacks

each function listed above takes for its first parameter a set of callbacks whose purpose is to provide an interface for GUIs to interact with data returned from the CLI. the specification for this object is as follows:

```js
{
  notify: (data: any) => void,
  log: (data: any) => void,
  prompt: (data: any, callback: (val: any) => boolean) => void,
  finalize: (data: any) => void
}
```
each callback corresponds to an event that will be propagated up from an invocation of a CLI command:

- `notify`: fired for general information updates that occur as the command runs. possible events include `notify/progress` (update a progress bar) and `notify/echo` (inform about significant operations, e.g. updating remote listings)
- `log`: fired for debugging information about the invoked command, including warnings and errors that occur
- `prompt`: fired when the command requests user input. this callback must in turn call the passed callback with the result of the user's input
- `finalize`: fired just before the command exits, sending the resultant data from the command to the UI

## development
1. clone the repository
2. run `npm i` in the project root
4. run `npm run build` to generate the transpiled output
5. ...
6. profit
