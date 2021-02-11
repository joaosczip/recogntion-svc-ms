import { container } from "tsyringe";

import "@/main/ioc";
import { Consumer, Worker } from "@/application/protocols";
import { ImageRecognitionWorker } from "@/presentation/workers/image-recognition";

const consumer = container.resolve<Consumer>("Consumer");
const setUpWorkers = (workers: Worker[]) => {
  return async () => {
    await Promise.all(
      workers.map(async (worker) => {
        await consumer.consume(worker);
      })
    );
  };
};

const workers = [container.resolve(ImageRecognitionWorker)];
export default setUpWorkers(workers);
