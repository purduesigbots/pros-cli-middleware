import { exec, ChildProcess, spawn } from 'child_process';
import { promisify } from 'util';
import { EventEmitter } from 'events';
import { Callbacks } from './types';

const pExec = promisify(exec);
const PREFIX = 'Uc&42BWAaQ';
let cliVersion: string|undefined = undefined;

export const getVersion = async (): Promise<string> => {
  if (cliVersion === undefined) {
    // HACK: docs say that this should return a Promise<{stdout, stderr}>, but
    //       it seems to just return a string, so we make a dangerous cast
    const raw: string = await pExec('prosv5 --machine-output --version') as any;
    const data = JSON.parse(raw.substr(PREFIX.length));
    cliVersion = data.text;
    return data.text;
  } else {
    return cliVersion;
  }
}

// read data from stdout of a cmd and emit it to handler
export class CLIEmitter extends EventEmitter {
  cmd: string;
  opts: string[];
  cwd: string|null|undefined;
  proc: ChildProcess;
  constructor(cmd: string, opts: string[], cwd?: string) {
    super();
    this.cmd = cmd;
    this.opts = opts;
    this.cwd = cwd;
    this.invokeCommand();
  }
  invokeCommand() {
    let procOpts: { cwd?: string, shell: boolean };
    if (this.cwd) {
      procOpts = { cwd: this.cwd, shell: true };
    } else {
      procOpts = { shell: true };
    }
    this.proc = spawn(this.cmd, ['--machine-output', ...this.opts], procOpts);
    this.proc.stdout.setEncoding('utf-8');
    this.proc.stdout.on('data', (data: string) => {
      for (let e of data.split(/\r?\n/)) {
        if (e.startsWith(PREFIX)) {
          let jdata = JSON.parse(e.substr(PREFIX.length));
          let [ primary ] = jdata.type.split('/');
          this.emit(primary, jdata);
        }
      }
    });
    this.proc.stderr.on('data', data => console.error(data.toString()));
    this.proc.on('close', code => this.emit('exit', code));
  }
}

// fire callbacks as emitter emits events
export const cliHook = (emitter: CLIEmitter, callbacks: Callbacks): Promise<number> => {
  const cb = (c: any) => emitter.proc.stdin.write(`${c}\n`);
  emitter.on('notify', d => callbacks.notify(d));
  emitter.on('log', d => callbacks.log(d));
  emitter.on('finalize', d => callbacks.finalize(d));
  emitter.on('prompt', d => callbacks.prompt(d, cb));
  return new Promise(
    (resolve, reject) => emitter.on('exit', (code: number) => code === 0 ? resolve(code) : reject(code))
  );
}

export const argSwitch = (argName: string, yes: string, no: string, value: boolean|null|undefined): string => {
  let rStr: string;
  if (value === undefined) {
    rStr = '';
  } else {
    if (argName) {
      argName = `-${argName}`;
    }
    rStr = `--${value ? yes : no}${argName}`;
  }
  return rStr;
}
