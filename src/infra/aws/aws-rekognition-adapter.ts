import { Rekognition } from "aws-sdk";

import { Recognizer } from "@/application/protocols";
import { File } from "@/domain/models";
import { awsDefaultRegion } from "@/config/aws";

export class AWSRekognitionAdapter implements Recognizer {
  private client: Rekognition;

  constructor() {
    this.client = new Rekognition({
      region: awsDefaultRegion,
    });
  }

  async recognize({ content }: File): Promise<any> {
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

      return Labels;
    } catch (error) {
      console.error(error);
    }
  }
}
