import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAuth from "./useAuth";
import { BlogData } from "../TypeDefinition/TypeDefinition";

const useBlogByUser = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data = [] as BlogData[], isLoading } = useQuery({
    queryKey: ["blogByUser", user?.uid],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/author/${user?.uid}`);
      return res.data.data;
    },
  });

  return { data, isLoading };
};

export default useBlogByUser;
