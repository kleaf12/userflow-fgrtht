export type IntegrationType = "ticketing" | "monitoring" | "vcs" | "identity" | "chatops";

export interface IntegrationConnection {
  id: string;
  name: string;
  type: IntegrationType;
  ownerTeam: string;
  status: "connected" | "degraded" | "disconnected";
  lastSyncAt: string | null;
  incidents30d: number;
}
