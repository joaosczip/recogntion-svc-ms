import { container } from "tsyringe";

import { AMQPAdapter } from "@/infra/amqp-adapter";
import { AWS3Adapter, AWSRekognitionAdapter } from "@/infra/aws";

container.registerSingleton("Consumer", AMQPAdapter);
container.registerSingleton("FileRecover", AWS3Adapter);
container.registerSingleton("Recognizer", AWSRekognitionAdapter);
