import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BlogData, BlogFetchResult } from "../TypeDefinition/TypeDefinition";

export interface BlogArray {
  data: BlogData[];
  isLoading: boolean;
  refetch?: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<BlogData[], unknown>>;
}

const useBlogData = (): BlogFetchResult => {
  const axiosPublic = useAxiosPublic();

  const {
    data = [] as BlogData[],
    isLoading,
    refetch,
  } = useQuery<BlogData[], unknown>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs?category=all");
      return res.data.data;
    },
  });

  return { data, isLoading, refetch };
};

export default useBlogData;
