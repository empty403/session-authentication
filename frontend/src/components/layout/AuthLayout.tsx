import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const AuthLayout = () => {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr] bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
