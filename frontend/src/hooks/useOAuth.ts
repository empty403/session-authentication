import { useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/utils/toast";

export const useOAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const googleAuthMutation = useMutation({
    mutationFn: async (credential: string) => {
      return authApi.googleAuth(credential);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success({
        description: "Successfully signed in with Google!",
      });
      navigate("/profile");
    },
    onError: (error) => {
      toast.error({
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const initiateGoogleAuth = useGoogleLogin({
    onSuccess: (response) => {
      googleAuthMutation.mutate(response.code);
    },
    onError: (error) => {
      toast.error({
        description:
          error.error_description || "Failed to authenticate with Google",
      });
    },
    flow: "auth-code",
  });

  return {
    initiateGoogleAuth,
    isLoading: googleAuthMutation.isPending,
  };
};
