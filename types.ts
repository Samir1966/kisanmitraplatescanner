
export interface DiseaseInfo {
  name: string;
  description: string;
  solution: string[];
}

export interface AnalysisResult {
  plantName: string;
  isHealthy: boolean;
  disease: DiseaseInfo | null;
}
