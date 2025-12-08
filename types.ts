export interface HealthTip {
  title: string;
  content: string;
  icon: string;
}

export interface BraGuideStep {
  step: number;
  title: string;
  description: string;
}

export interface VideoMetadata {
  title: string;
  description: string;
  warning: string;
  src?: string; // Optional URL if hosted
}