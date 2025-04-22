import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {
  const user = {
    fName: "Alex",
    lName: "Chen",
    email: "alex.chen@example.com",
    lastLogin: new Date(),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      {/* User Card with Enhanced Top Accent */}
      <div className="relative w-full max-w-md overflow-hidden bg-card rounded-lg border shadow-sm">
        {/* Premium Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary/20 shadow-sm">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback className="bg-primary/10 text-2xl font-medium">
                {user.fName?.[0]}
                {user.lName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-semibold">
                {user.fName} {user.lName}
              </h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/settings/profile" className="block">
              <Button className="w-full h-9" variant="outline">
                View Profile
              </Button>
            </Link>

            <Link to="/settings/change-password" className="block">
              <Button className="w-full h-9" variant="outline">
                Change Password
              </Button>
            </Link>

            <Button className="w-full h-9">Sign Out</Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground text-center pt-2">
            Last login:{" "}
            {user.lastLogin.toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
