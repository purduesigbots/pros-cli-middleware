import { platform, EOL } from 'os';
import { exec, ChildProcess, spawn } from 'child_process';
import { promisify } from 'util';
import { EventEmitter } from 'events';
import { Callbacks, CallbackFunctionArguments } from './types';

const pExec = promisify(exec);
const PREFIX = 'Uc&42BWAaQ';
let cliVersion: string | undefined = undefined;

export const getVersion = async (): Promise<string> => {
  if (cliVersion === undefined) {
    // HACK: sometimes this is a string, and sometimes it's a {stdout: string, stderr: string}. not sure why.
    let raw: any = await pExec('prosv5 --machine-output --version');
    raw = (typeof raw === 'string') ? raw : raw.stdout;
    for (var line of raw.split(EOL)) {
      if(!line.startsWith(PREFIX)) {
        console.error(line);
        continue;
      }

      const data = JSON.parse(line.substr(PREFIX.length));
      if (data.hasOwnProperty("text")) {
        cliVersion = data.text.trim();
        break;
      }
    }
  }
  return cliVersion;
}

// read data from stdout of a cmd and emit it to handler
export class CLIEmitter extends EventEmitter {
  cmd: string;
  opts: string[];
  cwd: string | null | undefined;
  proc: ChildProcess;
  suppressExit: boolean;
  constructor(cmd: string, opts: string[], cwd?: string) {
    super();
    this.cmd = cmd;
    this.opts = opts;
    this.cwd = cwd;
    this.suppressExit = false;
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
          let [primary] = jdata.type.split('/');
          this.emit(primary, jdata);
        } else if (e.trim()) {
          console.log(e);
        }
      }
    });
    this.proc.stderr.on('data', data => console.error(data.toString()));
    this.proc.on('close', code => this.emit('exit', code));
  }
}

// fire callbacks as emitter emits events
export const cliHook = (emitter: CLIEmitter, callbacks: Callbacks): Promise<number> => {
  const makeArgs = (d: any): CallbackFunctionArguments => {
    return {
      d,
      output: (c: any) => {
        console.log(`${c}\n`);
        return emitter.proc.stdin.write(`${c}\n`);
      },
      kill: () => {
        emitter.suppressExit = true;
        if (platform() === 'win32') {
          exec(`taskkill /pid ${emitter.proc.pid} /T /F`);
        } else {
          emitter.proc.kill();
        }
      }
    }
  }
  emitter.on('notify', d => callbacks.notify(makeArgs(d)));
  emitter.on('log', d => callbacks.log(makeArgs(d)));
  emitter.on('finalize', d => callbacks.finalize(makeArgs(d)));
  emitter.on('prompt', d => callbacks.prompt(makeArgs(d)));
  emitter.on('input', d => callbacks.input(makeArgs(d)));
  emitter.on('wakeme', d => emitter.proc.stdin.write('\n'));
  return new Promise(
    (resolve, reject) => emitter.on('exit', (code: number) => code === 0 || emitter.suppressExit ? resolve(code) : reject(code))
  );
}

export const argSwitch = (argName: string, yes: string, no: string, value: boolean | null | undefined): string => {
  let rStr: string;
  if (value === undefined) {
    rStr = '';
  } else {
    if (argName) {
      argName = `${argName}`;
    }
    let prefix: string = '';
    if(value && yes) {
      prefix = `${yes}-`
    } else if(!value && no) {
      prefix = `${no}-`
    }
    rStr = `--${prefix}${argName}`;
  }
  return rStr;
}
