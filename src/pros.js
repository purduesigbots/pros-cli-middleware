import { CLIEmitter, cliHook } from './util.js'

export const uploadProject = (notify, log, finalize, path, {run, name, slot}={}) => {
  let runStr;
  if (run == undefined) {
    runStr = ''
  } else {
    runStr = `--${run ? '' : 'no-'}run-after`
  }
  let nameStr;
  if (name == undefined) {
    nameStr = ''
  } else {
    nameStr = `--name ${name}`
  }
  let slotStr;
  if (slot == undefined) {
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
    ), notify, log, finalize
  )
}
