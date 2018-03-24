/** @flow */

import { spawn } from 'child_process'
import EventEmitter from 'events'

import type { Callbacks } from './types.js'

const PREFIX = 'Uc&42BWAaQ'

// read data from stdout of a cmd and emit it to handler
export class CLIEmitter extends EventEmitter {
  cmd: string
  opts: Array<string>
  cwd: ?string
  proc: child_process$ChildProcess
  constructor(cmd: string, opts: Array<string>, cwd: ?string): void {
    super()
    this.cmd = cmd
    this.opts = opts
    this.cwd = cwd
    this.invokeCommand()
  }
  invokeCommand() {
    let procOpts
    if (this.cwd) {
      procOpts = { cwd: this.cwd, shell: true }
    } else {
      procOpts = { shell: true }
    }
    console.log(this.cmd, this.opts, procOpts)
    this.proc = spawn(this.cmd, [...this.opts, '--machine-output'], procOpts)
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
export const cliHook = (emitter: CLIEmitter, callbacks: Callbacks): Promise<any> => {
  const cb = (c: any) => emitter.proc.stdin.write(`${c}\n`)
  emitter.on('notify', d => callbacks.notify(d))
  emitter.on('log', d => callbacks.log(d))
  emitter.on('finalize', d => callbacks.finalize(d))
  emitter.on('prompt', d => callbacks.prompt(d, cb))
  return new Promise(
    (resolve, reject) => emitter.on('exit', code => code === 0 ? resolve(code) : reject(code))
  )
}
