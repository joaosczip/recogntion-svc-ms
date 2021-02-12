import { Rekognition } from "aws-sdk";

import { Recognizer } from "@/application/protocols";
import { File, FileLabels } from "@/domain/models";
import { awsDefaultRegion } from "@/config/aws";

export class AWSRekognitionAdapter implements Recognizer {
  private client: Rekognition;

  constructor() {
    this.client = new Rekognition({
      region: awsDefaultRegion,
    });
  }

  async recognize({
    content,
  }: File): Promise<Omit<FileLabels, "name"> | undefined> {
    try {
      const { Labels } = await this.client
        .detectLabels({
          Image: {
            Bytes: content,
          },
          MaxLabels: 5,
          MinConfidence: 90,
        })
        .promise();

      if (Labels) {
        return {
          labels: Labels.map(({ Name, Confidence }) => ({
            name: Name as string,
            confidence: Confidence as number,
          })),
        };
      }
    } catch (error) {
      console.error(error);
    }
  }
}
