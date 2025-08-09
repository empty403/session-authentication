import { Outlet } from "react-router-dom";

export const ErrorLayout = () => {
  return (
    <div className="min-h-screen grid place-content-center p-4 bg-gradient-to-br from-default-100 via-default-50 to-primary-50">
      <Outlet />
    </div>
  );
};
