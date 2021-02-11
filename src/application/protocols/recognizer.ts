import { File } from "@/domain/models";

export interface Recognizer {
  recognize: (file: File) => Promise<any>;
}
