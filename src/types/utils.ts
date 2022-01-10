export type ReduceCallbackFnArgsType = {
  prev: Record<string, unknown>;
  cur: string;
  idx: number;
  arr: string[];
};

export type ReduceCallbackFnType<R> = (args: ReduceCallbackFnArgsType) => R;

export type DataWithCountsType<K extends string> = (Record<K, number> &
  Record<string, any>)[];

export type MapCallbackFnArgsType<T> = {
  val: T;
  idx: number;
  arr: T[];
};

export type MapCallbackFnType<U, R> = (args: MapCallbackFnArgsType<U>) => R;
