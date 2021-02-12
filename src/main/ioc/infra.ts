import { container } from "tsyringe";

import { AMQPAdapter } from "@/infra/amqp-adapter";
import { AWS3Adapter, AWSRekognitionAdapter } from "@/infra/aws";
import { LoggerService } from "@/infra/utils";

container.register("Consumer", AMQPAdapter);
container.register("TopicPublisher", AMQPAdapter);
container.registerSingleton("FileRecover", AWS3Adapter);
container.registerSingleton("Recognizer", AWSRekognitionAdapter);
container.registerSingleton("Logger", LoggerService);
