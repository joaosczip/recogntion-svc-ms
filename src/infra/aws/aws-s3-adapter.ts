import { S3 } from "aws-sdk";

import { FileRecover } from "@/application/protocols";
import { File } from "@/domain/models";
import { awsBucket, awsDefaultRegion } from "@/config/aws";

export class AWS3Adapter implements FileRecover {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: awsDefaultRegion,
    });
  }

  async recover(fileName: string): Promise<File | undefined> {
    if (!this.client) {
      throw new Error("No S3 client configured");
    }

    try {
      const { Body } = await this.client
        .getObject({
          Bucket: awsBucket,
          Key: fileName,
        })
        .promise();

      return {
        content: Body as Buffer,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
