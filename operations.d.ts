type AnyEnumerable<T> = Enumerable<T> | Array<T> | Iterator<T>;
interface Enumerable<T> {
  select<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<TResult>;

  orderBy<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<T>;

  groupBy<TResult extends Symbol | Number | String>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): { [K in TResult]: T[] };

  where(this: AnyEnumerable<T>, predicate: (v: T) => boolean): Iterator<T>;

  skip(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  take(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  first(this: AnyEnumerable<T>): T | undefined;
  last(this: AnyEnumerable<T>): T | undefined;
  count(this: AnyEnumerable<T>): number;
  any(this: AnyEnumerable<T>): boolean;
  toArray(this: AnyEnumerable<T>): T[];
}
interface Array<T> {
  select<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<TResult>;

  orderBy<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<T>;

  groupBy<TResult extends Symbol | Number | String>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): { [K in TResult]: T[] };

  where(this: AnyEnumerable<T>, predicate: (v: T) => boolean): Iterator<T>;

  skip(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  take(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  first(this: AnyEnumerable<T>): T | undefined;
  last(this: AnyEnumerable<T>): T | undefined;
  count(this: AnyEnumerable<T>): number;
  any(this: AnyEnumerable<T>): boolean;
  toArray(this: AnyEnumerable<T>): T[];
}

interface Iterator<T> {
  select<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<TResult>;

  orderBy<TResult>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): Iterator<T>;

  groupBy<TResult extends Symbol | Number | String>(
    this: AnyEnumerable<T>,
    selector: (v: T) => TResult
  ): { [K in TResult]: T[] };

  where(this: AnyEnumerable<T>, predicate: (v: T) => boolean): Iterator<T>;

  skip(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  take(this: AnyEnumerable<T>, amount: number): Iterator<T>;
  first(this: AnyEnumerable<T>): T | undefined;
  last(this: AnyEnumerable<T>): T | undefined;
  count(this: AnyEnumerable<T>): number;
  any(this: AnyEnumerable<T>): boolean;
  toArray(this: AnyEnumerable<T>): T[];
}
