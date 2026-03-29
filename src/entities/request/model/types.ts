/* eslint-disable @typescript-eslint/no-explicit-any */

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
  id: any;
  title: any;
  type: any;
  priority: any;
  status: any;
  requester: any;
  assignee: any;
  relatedAssetId: any | null;
  createdAt: any;
  dueAt: any;
}
