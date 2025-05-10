export interface Book {
  _id: string;
  name: string;
  description: string;
  author: string;
  publishedDate: string | null;
  averageRating: number;
  totalRatings: number;
  category: {
    _id: string;
    name: string;
  };
  coverImage: {
    url: string;
    public_id: string;
  };
  pdf: {
    url: string;
    public_id: string;
  };
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
