import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr] bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
