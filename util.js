import { spawn } from 'child_process'
import EventEmitter from 'events'

const PREFIX = 'Uc&42BWAaQ'

// read data from stdout of a cmd and emit it to handler
export class CLIEmitter extends EventEmitter {
  constructor(cmd, opts) {
    super()
    this.cmd = cmd;
    this.opts = opts;
    this.invokeCommand()
  }
  invokeCommand() {
    this.proc = spawn(this.cmd, [...this.opts, '--machine-output'])
    // functions will subscribe to `cmdname:eventname` events
    this.proc.stdout.on('data', data => this.emit(`${cmd}:data`, data))
    this.proc.stderr.on('data', data => console.error(data))
    this.proc.on('close', code => this.emit(`${cmd}:exit`, code))
  }
  get cmd() { return this.cmd }
}

// fire callbacks as emitter emits events
export const cliHook = async (emitter, notify, log, finalize) => {
  emitter.on(`${emitter.cmd}:data`, data => {
    if (data.startsWith(PREFIX)) {
      data = JSON.parse(data.slice(PREFIX.length))
      const [ primary ] = data.type.split('/')
      switch (primary) {
        case 'notify':
          notify(data)
          break
        case 'log':
          log(data)
          break
        case 'finalize':
          finalize(data)
          break
      }
    }
  })
  return new Promise((resolve, reject) => {
    emitter.on(`${emitter.cmd}:exit`, code => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(code)
      }
    })
  })
}
