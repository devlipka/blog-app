import { Category, Post } from "@/types/collection";

export interface Schema {
  category: Category;
  post: Post;
  subscribers: {
    id: string;
    email: string;
  };
  category_translations: {
    id: string;
    category_id: string;
    language_id: string;
    title: string;
    description: string;
  };
}
