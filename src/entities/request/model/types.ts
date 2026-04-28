export type RequestType =
  | "access"
  | "infrastructure"
  | "hardware"
  | "security_exception"
  | "procurement";

export type RequestPriority = "low" | "medium" | "high" | "critical";

export type RequestStatus =
  | "submitted"
  | "in_review"
  | "approved"
  | "in_progress"
  | "done"
  | "rejected";

export interface ServiceRequest {
  id: string;
  title: string;
  type: RequestType;
  priority: RequestPriority;
  status: RequestStatus;
  requester: string;
  assignee: string;
  relatedAssetId: string | null;
  createdAt: string;
  dueAt: string;
}
