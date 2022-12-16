export interface PostType {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: number[];
}

export interface CategoryType {
  id: number;
  name: string;
  slug: string;
}

export interface DataType {
  posts: PostType[];
  categories: CategoryType[];
}
