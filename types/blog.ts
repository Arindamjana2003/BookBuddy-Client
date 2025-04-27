export interface BlogImage {
  url: string | null;
  public_id: string | null;
}

export interface Blog {
  _id: string;
  user: string;
  title: string;
  description: string;
  image: BlogImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogApiResponse {
  success: boolean;
  message: string;
  data: Blog[];
}
