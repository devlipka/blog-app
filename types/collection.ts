export interface Translation {
  id: string;
  title: string;
  description: string;
}

export interface PostTranslation extends Translation {
  post_id: string;
  language_code: string;
  body: string;
}

export interface CategoryTranslation extends Translation {
  category_id: string;
  languages_id: string;
}

export interface Post {
  id: string;
  slug: string;
  body: string;
  image: string;
  title: string;
  author: Author;
  category: Category;
  description: string;
  date_created: string;
  date_updated: string;
  translations: PostTranslation[];
}

export interface Category {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  translations: CategoryTranslation[];
}

export interface Author {
  id: string;
  last_name: string;
  first_name: string;
}

export interface DirectusSchema {
  category: Category;
  post: Post;
  author: Author;
}
