import { container } from "tsyringe";

import { RemoteRecognition } from "@/application/usecases";

container.registerSingleton("RecognizeImages", RemoteRecognition);
