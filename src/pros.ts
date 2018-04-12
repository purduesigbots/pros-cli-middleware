/// <reference path="index.d.ts" />

import { CLIEmitter, cliHook } from './util.js'

export const uploadProject = (callbacks: pros.Callbacks, path: string, {run, name, slot}: pros.UploadProjectOptions={}) => {
  let runStr: string
  if (run === undefined) {
    runStr = ''
  } else {
    runStr = `--${run ? '' : 'no-'}run-after`
  }
  let nameStr: string
  if (name === undefined) {
    nameStr = ''
  } else {
    nameStr = `--name ${name}`
  }
  let slotStr: string
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

export const testUi = (callbacks: pros.Callbacks) => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'test'
      ]
    ), callbacks
  )
}
