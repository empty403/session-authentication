import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr] bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
};
