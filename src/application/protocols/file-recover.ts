import { File } from "@/domain/models";

export interface FileRecover {
  recover: (fileName: string) => Promise<File | undefined>;
}
