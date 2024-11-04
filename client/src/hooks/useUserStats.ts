import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAuth from "./useAuth";
import { UserStats } from "../TypeDefinition/TypeDefinition";

const useUserStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} as UserStats, isLoading } = useQuery<UserStats>({
    queryKey: ["dashboard", user?.uid],
    queryFn: async () => {
      const response = await axiosSecure.get("/blogs/stats");
      return response.data.data;
    },
  });
  return { stats, isLoading };
};

export default useUserStats;
