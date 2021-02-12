export type LogParams<T> = {
  title: string;
  payload: T;
};

export interface Logger {
  log: <T = any>(params: LogParams<T>) => Promise<void>;
}
