import "reflect-metadata";

import setUpWorkers from "@/main/worker";

setUpWorkers().then(() => console.log("Recognition Service up"));
