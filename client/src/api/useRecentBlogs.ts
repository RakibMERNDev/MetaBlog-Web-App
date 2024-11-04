import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BlogData, BlogFetchResult } from "../TypeDefinition/TypeDefinition";

const useRecentBlogs = (): BlogFetchResult => {
  const axiosPublic = useAxiosPublic();

  const { data = [] as BlogData[], isLoading } = useQuery<BlogData[], unknown>({
    queryKey: ["recentBlogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs/recent");
      return res.data.data;
    },
  });

  return { data, isLoading };
};

export default useRecentBlogs;
