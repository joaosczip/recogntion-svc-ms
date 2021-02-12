import { Channel, connect } from "amqplib";

import {
  Consumer,
  DispatcherParams,
  TopicPublisher,
  Worker,
} from "@/application/protocols";
import { connectionUrl } from "@/config/rabbitmq";

export class AMQPAdapter implements Consumer, TopicPublisher {
  private channel: Channel;

  async setUpConnection(connectionUrl: string): Promise<void> {
    const connection = await connect(connectionUrl);
    this.channel = await connection.createChannel();
  }

  async consume(worker: Worker): Promise<void> {
    if (!this.channel) {
      await this.setUpConnection(connectionUrl);
    }

    const exchange = worker.getExchange();
    const { queue } = await this.channel.assertQueue("", { exclusive: false });

    await this.channel.assertExchange(exchange, worker.getExchangeType(), {
      durable: false,
    });

    await this.channel.bindQueue(queue, exchange, worker.getKey());
    await this.channel.consume(queue, async (message) => {
      message?.content && (await worker.handle(message.content.toString()));
    });
  }

  async publish<T = any>({
    key,
    exchange,
    data,
  }: DispatcherParams<T>): Promise<void> {
    if (!this.channel) {
      await this.setUpConnection(connectionUrl);
    }

    await this.channel.assertExchange(exchange, "topic", { durable: false });
    console.log("[x] publishing key %s in exchange %s", key, exchange);
    console.log("[x] publishing data", data);
    this.channel.publish(exchange, key, Buffer.from(JSON.stringify(data)));
  }
}
