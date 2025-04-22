import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { resetPasswordSchema } from "@/lib/schemas";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";

export default function ChangePassword() {
  const [isLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    console.log("😈 ~ onSubmit ~ values😈:", values);
    // setIsLoading(true);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Link to="/" className="absolute left-4 top-1/2 -translate-y-1/2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle className="text-center">Change Password</CardTitle>
        </CardHeader>

        <CardContent>
          <ResetPasswordForm isLoading={isLoading} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
