import { inject, injectable } from "tsyringe";

import { RecognizeImages } from "@/domain/usecases";
import { FileRecover, Logger, Recognizer } from "@/application/protocols";
import { File, FileLabels } from "@/domain/models";

@injectable()
export class RemoteRecognition implements RecognizeImages {
  constructor(
    @inject("FileRecover")
    private readonly fileRecover: FileRecover,
    @inject("Recognizer")
    private readonly recognizer: Recognizer,
    @inject("Logger")
    private readonly logger: Logger
  ) {}

  async recoginze(images: string[]): Promise<void> {
    const files = await Promise.all(
      images.map(async (name) => this.fileRecover.recover(name))
    );

    const labels = await Promise.all(
      (files as File[]).map(async (file: File, index) => {
        const { labels } = (await this.recognizer.recognize(file)) as Omit<
          FileLabels,
          "name"
        >;
        return {
          name: images[index],
          labels,
        };
      })
    );

    await this.logger.log({
      title: "Files recognition successful",
      payload: labels,
    });
  }
}
