/** @flow */

import { CLIEmitter, cliHook } from './util.js'
import type { Callbacks, UploadProjectOptions } from './types.js'

export const uploadProject = (callbacks: Callbacks, path: string, {run, name, slot}: UploadProjectOptions={}) => {
  let runStr;
  if (run === undefined) {
    runStr = ''
  } else {
    runStr = `--${run ? '' : 'no-'}run-after`
  }
  let nameStr;
  if (name === undefined) {
    nameStr = ''
  } else {
    nameStr = `--name ${name}`
  }
  let slotStr;
  if (slot === undefined) {
    slotStr = ''
  } else {
    slotStr = `--slot ${slot}`
  }
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'u', runStr, nameStr, slotStr
      ].filter(e => e !== ''),
      path
    ), callbacks
  )
}

export const testUi = (callbacks: Callbacks) => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'test'
      ]
    ), callbacks
  )
}
