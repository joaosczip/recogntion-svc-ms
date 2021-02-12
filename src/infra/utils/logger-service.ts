import { inject, injectable } from "tsyringe";

import { Logger, LogParams, TopicPublisher } from "@/application/protocols";

@injectable()
export class LoggerService implements Logger {
  constructor(
    @inject("TopicPublisher")
    private readonly publisher: TopicPublisher
  ) {}

  async log<T = any>({ title, payload }: LogParams<T>): Promise<void> {
    await this.publisher.publish({
      exchange: "files",
      key: "*.recognition.*",
      data: {
        title,
        payload,
      },
    });
  }
}
