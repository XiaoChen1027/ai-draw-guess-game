export interface PredictionResponse {
  status: 'success' | 'error';
  prediction?: string;
  message?: string;
}

export interface AIServiceResponse {
  prediction: string;
  confidence: number;
}