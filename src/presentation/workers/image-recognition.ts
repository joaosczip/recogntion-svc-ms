import { inject, injectable } from "tsyringe";

import { Worker } from "@/application/protocols";
import { RecognizeImages } from "@/domain/usecases";

@injectable()
export class ImageRecognitionWorker extends Worker {
  private recognizeImages: RecognizeImages;

  constructor(
    @inject("RecognizeImages")
    recognizeImages: RecognizeImages
  ) {
    const exchangeName = "files";
    const exchangeType = "direct";
    const key = "files.uploaded";

    super(exchangeName, exchangeType, key);
    this.recognizeImages = recognizeImages;
  }

  async handle(params: string): Promise<void> {
    const paths = JSON.parse(params);
    await this.recognizeImages.recoginze(
      paths.map(({ name }: { name: string }) => name)
    );
  }
}
