/**
 * A generic factory for deserializing JSON recieved from input/interactive
 *
 * Create a GenericFactory from a base type (e.g. Application or Component)
 */
export class GenericFactory<T, C extends { new(A: A): T }, A extends { etype: string[] }> {
  classes: Map<string, C>;
  bound_args: Partial<A>;

  constructor(classes: C[], bound_args?: Partial<A>) {
    this.classes = new Map<string, C>(classes.map(c => [c.name, c] as [string, C]));
    this.bound_args = bound_args || {};
  }

  resolveArgs(arg: A) {
    return Object.assign(arg, this.bound_args);
  }

  createInstance(arg: A): T {
    const matches: C[] = arg.etype.map(t => this.classes.get(t)).filter(t => !!t);
    if (!matches.length) {
      return null;
    }
    return new matches[0](this.resolveArgs(arg));
  }
}
