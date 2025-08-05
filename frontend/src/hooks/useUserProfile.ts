import { useQuery } from "@tanstack/react-query";
import { userApi } from "../lib/api/user";

export const useUserProfile = () => {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: userApi.getProfile,
    retry: false,
    staleTime: Infinity,
  });

  const isAuthenticated = !!user && !error;
  const isUnauthenticated = !user && !isLoading;

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isUnauthenticated,
    refetch,
  };
};
