import { Worker } from "@/application/protocols";

export interface Consumer {
  consume: (worker: Worker) => Promise<void>;
}
