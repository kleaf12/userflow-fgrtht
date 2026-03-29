export interface Asset {
  id: string;
  type: "Laptop" | "Server" | "Network" | "License" | "Inventory";
  title: string;
  owner: string;
  assignedTo: string | null;
  storageLocation: string;
  issuedAt: string | null;
  returnDue: string | null;
  status: "in_use" | "in_stock" | "maintenance" | "retired";
}
