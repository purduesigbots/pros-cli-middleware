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

blocking:
```js
let r
try {
  r = await listTemplates(...)
} catch e {
  console.error(e)
}
```

non-blocking:
```js
listTemplates(...).then(r => {...}).catch(e => console.error(e))
```

#### conductor

- `listTemplates(callbacks, query, [options])`
  Return all available templates satisfying `query`.
  - `callbacks`: standard set of UI hooks
  - `query`: semver-compliant string (e.g. `template@1.0.1` or `^0.7.0`)
  - `options`: an object containing zero or one each of the following fields
    - `offline: boolean`: return offline templates
    - `online: boolean`: return online templates
    - `refresh: boolean`: force refresh of remote listings
    - `limit: number`: limit number of templates returned
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
- `upgradeProject(callbacks, path, version, [options])`
  Upgrade a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  - `version`: version to upgrade project to
  - `options`: an object containing zero or one each of the following fields
    - `install: boolean`: <missing docs>
    - `download: boolean`: download templates if not present locally (otherwise use latest available locally)
    - `user: boolean`: forcibly replace all user files in templates
    - `system: boolean` forcibly replace all system files in templates

### general

- `uploadProject(callbacks, path, [options])`
  Upload a PROS project
  - `callbacks`: standard set of UI hooks
  - `path`: path to PROS project
  - `options`: an object containing zero or one each of the following fields
    - `run: boolean`: run the program immmediately after uploading
    - `name: string`: name of the project on the uC (only applies for v5-targeted projects)
    - `slot: number`: the slot to which the program will be uploaded on the uC (only applies for v5-targeted projects)

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
