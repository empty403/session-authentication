import { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router";
import { CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/schemas";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { cn } from "@/lib/utils";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function ResetPassword() {
  const [searchParams] = useSearchParams();

  const [isValidToken, setIsValidToken] = useState<null | boolean>(null);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = searchParams.get("token");

  const isError = isValidToken === false || isSuccess === false;

  useEffect(() => {
    const verifyToken = async () => {
      setErrorMessage(null);
      try {
        console.log("Verifying token:", token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const isValid = true;
        if (isValid) {
          setIsValidToken(true);
        } else {
          setErrorMessage(
            "This password reset link is invalid or has expired."
          );
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setErrorMessage(
          "Could not verify reset token. Please try again later."
        );
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, []);

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    console.log("😈 ~ onSubmit ~ values ~ empty@404 😈:", values);

    setErrorMessage(null);

    try {
      console.log("Submitting new password with token:", token);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Password reset failed:", error);
      if (error?.message?.includes("token")) {
        setErrorMessage(
          "This password reset link expired while you were submitting. Please request a new one."
        );
        setIsValidToken(false);
      } else {
        setErrorMessage(
          "An error occurred while resetting your password. Please try again."
        );
      }
    }
  }

  const renderTitle = () => {
    if (isError) {
      return "Error!";
    }
    if (isSuccess) {
      return "Success!";
    }

    return "Set New Password";
  };

  const renderContent = () => {
    if (isValidToken === false) {
      return (
        <div className="space-y-4 text-center p-4">
          <XCircle className="mx-auto h-12 w-12 text-destructive" />
          <p className="text-sm text-muted-foreground">
            {errorMessage ||
              "This password reset link is invalid or has expired."}
          </p>
          <Button asChild className="w-full">
            <Link to="/forgot-password">Request New Link</Link>
          </Button>
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="space-y-4 text-center p-4">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <p className="text-lg font-semibold">Password Reset Successful!</p>
          <p className="text-sm text-muted-foreground">
            You can now log in with your new password.
          </p>
          <Button asChild className="w-full">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      );
    }

    return <ResetPasswordForm isLoading={true} onSubmit={onSubmit} />;
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isValidToken === null) {
    return (
      <div className="grid place-content-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle
              className={cn(
                "text-center font-semibold text-2xl",
                isError && "text-destructive",
                isSuccess && "text-green-600"
              )}
            >
              {renderTitle()}
            </CardTitle>
            {isValidToken && isSuccess === null && (
              <CardDescription className="text-center pt-2">
                Choose a strong new password for your account.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>{renderContent()}</CardContent>
        </Card>
      </div>

      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-green-600">
              Password Changed Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-2 ">
              For enhanced security, would you like to log out of all other
              devices and browser sessions?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex !flex-col sm:justify-center gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1">
              Keep Other Sessions
            </Button>
            <Button type="button" variant="destructive" className="flex-1">
              Log Out Everywhere Else
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
