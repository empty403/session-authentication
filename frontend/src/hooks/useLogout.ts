import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../lib/api/auth";
import { addToast } from "@heroui/react";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
      addToast({
        title: "Logged out successfully",
        color: "success",
      });
    },
    onError: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
};
