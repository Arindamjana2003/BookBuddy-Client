export interface BlogImage {
  url: string | null;
  public_id: string | null;
}

export interface BlogUser {
  _id: string;
  name: string;
  email: string;
  profile_pic: BlogImage | null;
}

export interface Blog {
  _id: string;
  user: BlogUser;
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
