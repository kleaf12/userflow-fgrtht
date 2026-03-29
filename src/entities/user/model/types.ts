export interface UserProfile {
  id: string;
  fullName: string;
  role: string;
  department: string;
  team: string;
  isLeader: boolean;
  email: string;
  phone: string;
  location: string;
  workMode: "office" | "hybrid" | "remote";
  status: "active" | "vacation";
  startDate: string;
  managerName: string | null;
  bio: string;
  skills: string[];
}
