import * as _path from 'path';
import * as fs from 'fs';

export class ProjectTracker {
  private _last_weak_project: string;
  private _last_strong_project: string;
  private _last_directory: string;

  constructor() {
    this._last_weak_project = null;
    this._last_strong_project = null;
  }

  findProject(path: string, recurseTimes: number = 10): string {
    path = _path.resolve(path);
    try {
      var stat = fs.lstatSync(path);
      if (stat.isFile() && _path.basename(path) === 'project.pros') {
        return _path.dirname(path);
      } else if (stat.isDirectory()) {
        if (fs.lstatSync(_path.join(path, "project.pros")).isFile()) {
          return path;
        }
      }
    } catch (e) { /* ignore */ }
    if(recurseTimes > 0) {
      return this.findProject(_path.dirname(path), recurseTimes - 1);
    } else {
      return null;
    }
  }

  visit(path: string, strong: boolean = false): string {
    const project = this.findProject(path);
    this._last_directory = _path.dirname(path);
    this._last_weak_project = project;
    if (project != null || strong) {
      this._last_strong_project = project;
    }
    return project;
  }

  lastWeakProject(): string {
    return this._last_weak_project;
  }

  lastStrongProject(): string {
    return this._last_strong_project;
  }

  lastDirectory(): string {
    return this._last_directory;
  }
}

export const GlobalProjectTracker = new ProjectTracker();
