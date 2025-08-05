import { Navigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { useUserProfile } from "../../hooks/useUserProfile";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isLoading, isUnauthenticated } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (isUnauthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
