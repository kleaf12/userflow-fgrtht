export type JobCriticality = "low" | "medium" | "high";

export interface AutomationJob {
  id: string;
  name: string;
  owner: string;
  trigger: string;
  criticality: JobCriticality;
  lastRunAt: string;
  successRate: number;
  status: "healthy" | "warning" | "failing";
  linkedRunbookId: string;
}
