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
}

export interface Category {
  id: string;
  slug?: string;
  title: string;
  description?: string;
}

export interface Author {
  id: string;
  last_name: string;
  first_name: string;
}
