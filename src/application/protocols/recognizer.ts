import { File, FileLabels } from "@/domain/models";

export interface Recognizer {
  recognize: (file: File) => Promise<Omit<FileLabels, "name"> | undefined>;
}
