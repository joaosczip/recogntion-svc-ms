export interface Label {
  name: string;
  confidence: number;
}

export interface FileLabels {
  name: string;
  labels: Label[];
}
