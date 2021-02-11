import { Channel, connect } from "amqplib";

import { Consumer, Worker } from "@/application/protocols";
import { connectionUrl } from "@/config/rabbitmq";

export class AMQPAdapter implements Consumer {
  private channel: Channel;

  private async setUpConnection(): Promise<void> {
    const connection = await connect(connectionUrl);
    this.channel = await connection.createChannel();
  }

  async consume(worker: Worker): Promise<void> {
    await this.setUpConnection();

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
}
