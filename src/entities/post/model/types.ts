export interface Post {
  id: string;
  title: string;
  body: string;
  category: "news" | "incident" | "release" | "howto";
  author: string;
  createdAt: string;
}

export type CreatePostPayload = {
  title: string;
  body: string;
  category: Post["category"];
  author: string;
};
