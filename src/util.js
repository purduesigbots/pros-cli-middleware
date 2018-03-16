import { spawn } from 'child_process'
import EventEmitter from 'events'

const PREFIX = 'Uc&42BWAaQ'

// read data from stdout of a cmd and emit it to handler
export class CLIEmitter extends EventEmitter {
  constructor(cmd, opts) {
    super()
    this.cmd = cmd
    this.opts = opts
    this.invokeCommand()
  }
  invokeCommand() {
    this.proc = spawn(this.cmd, [...this.opts, '--machine-output'], { shell: true })
    this.proc.stdout.setEncoding('utf-8')
    this.proc.stdout.on('data', data => {
      for (let e of data.split('\r\n')) {
        if (e.startsWith(PREFIX)) {
          let jdata = JSON.parse(e.substr(PREFIX.length))
          let [ primary ] = jdata.type.split('/')
          this.emit(primary, jdata)
        }
      }
    })
    this.proc.stderr.on('data', data => console.error(data.toString()))
    this.proc.on('close', code => this.emit('exit', code))
  }
}

// fire callbacks as emitter emits events
export const cliHook = (emitter, notify, log, finalize) => {
  emitter.on('notify', d => notify(d))
  emitter.on('log', d => log(d))
  emitter.on('finalize', d => finalize(d))
  return new Promise(
    (resolve, reject) => emitter.on('exit', code => code === 0 ? resolve(code) : reject(code))
  )
}
