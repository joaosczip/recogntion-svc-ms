export type DispatcherParams<T> = {
  key: string;
  exchange: string;
  data: T;
};

export interface TopicPublisher {
  publish: <T = any>(params: DispatcherParams<T>) => Promise<void>;
}
