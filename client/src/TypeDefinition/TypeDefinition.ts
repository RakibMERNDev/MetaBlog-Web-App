
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export type BlogData = {
  _id: string;
  title: string;
  photoUrl: string;
  category: string;
  authorName: string;
  authorImg: string;
  published: string;
  content: string;
  slug: string;
  authorId?: string;
  status: string;
  banner? : boolean;
};

export type BlogFetchResult = {
  data: BlogData[];
  isLoading: boolean;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BlogData[], unknown>>;
};

export type UserData = {
  bio: string;
  name: string;
  photo: string;
  date: string;
};

export type AdminData = {
  isAdmin: boolean;
  success: boolean;
};

export type AllUsersData = {
  uid: string;
  email: string;
  photo: string;
  name: string;
  role: string;
}[];

export type RegisterFormData = {
  name: string;
  photo: File[];
  email: string;
  password: string;
};

  
 export type UserStats = {
    total: number;
    draft: number;
    published: number;
  };