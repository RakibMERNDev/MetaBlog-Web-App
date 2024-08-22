import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../api/useAxiosSecure";
import useAdmin from "./useAdmin";
import { AllUsersData } from "../TypeDefinition/TypeDefinition";

const useGetAllUsersData = () => {
  const axiosSecure = useAxiosSecure();
  const { result, loading } = useAdmin();

  const {
    data = [] as AllUsersData,
    isLoading,
    refetch,
  } = useQuery<AllUsersData>({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure("/admin/users");

      return response.data.data;
    },
    enabled: result.isAdmin,
  });

  return { data, isLoading, loading, result, refetch };
};

export default useGetAllUsersData;
