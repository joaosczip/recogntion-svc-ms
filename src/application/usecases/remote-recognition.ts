import { inject, injectable } from "tsyringe";

import { RecognizeImages } from "@/domain/usecases";
import { FileRecover, Recognizer } from "@/application/protocols";
import { File } from "@/domain/models";

@injectable()
export class RemoteRecognition implements RecognizeImages {
  constructor(
    @inject("FileRecover")
    private readonly fileRecover: FileRecover,
    @inject("Recognizer")
    private readonly recognizer: Recognizer
  ) {}

  async recoginze(imagesPath: string[]): Promise<void> {
    const files = await Promise.all(
      imagesPath.map(async (path) => this.fileRecover.recover(path))
    );

    const labels = await Promise.all(
      (files as File[]).map(async (file: File) =>
        this.recognizer.recognize(file)
      )
    );
    console.log("labels", labels);
  }
}
