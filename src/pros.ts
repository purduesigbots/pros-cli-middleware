import { CLIEmitter, cliHook } from './util.js'
import { Callbacks, UploadProjectOptions } from './types.js'

export const uploadProject = (callbacks: Callbacks, path: string, {run, name, slot}: UploadProjectOptions={}) => {
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

export const testUi = (callbacks: Callbacks) => {
  return cliHook(
    new CLIEmitter(
      'prosv5', [
        'test'
      ]
    ), callbacks
  )
}
