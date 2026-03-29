export type KnowledgeCategory = "runbook" | "policy" | "howto" | "architecture";

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: KnowledgeCategory;
  tags: string[];
  ownerTeam: string;
  updatedAt: string;
  summary: string;
  status: "approved" | "draft";
}
