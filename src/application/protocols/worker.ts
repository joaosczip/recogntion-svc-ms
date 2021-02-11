export abstract class Worker {
  constructor(
    protected readonly exchange: string,
    protected readonly type: string,
    protected readonly key: string
  ) {}

  getExchange(): string {
    return this.exchange;
  }

  getExchangeType(): string {
    return this.type;
  }

  getKey(): string {
    return this.key;
  }

  abstract handle(params: string): Promise<void>;
}
