export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
}
