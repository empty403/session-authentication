import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
  Link,
} from "@heroui/react";
import { Lock, CheckCircle, XCircle } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { PasswordStrengthMeter } from "@/components/forms/PasswordStrengthMeter";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";

export const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const tokenValidation = useQuery({
    queryKey: ["validateResetToken", token],
    queryFn: () => authApi.validateResetToken(token!),
    enabled: !!token,
    retry: false,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      authApi.resetPassword(token, password),
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || "Failed to reset password. Please try again.");
    },
  });

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;
    setError("");
    resetPasswordMutation.mutate({ token, password: data.password });
  };

  const getTokenStatus = () => {
    if (!token) return "invalid";
    if (tokenValidation.isPending) return "validating";
    if (tokenValidation.isError) {
      const error = tokenValidation.error;
      const message = error.message || "";
      if (message.includes("expired")) return "expired";
      return "invalid";
    }
    if (tokenValidation.data?.valid) return "valid";
    return "invalid";
  };

  const tokenStatus = getTokenStatus();

  if (tokenStatus === "validating") {
    return (
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardBody className="flex flex-col items-center justify-center py-16 px-8">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur opacity-30 animate-pulse"></div>
          </div>

          <div className="text-center space-y-4 mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Just a moment...
            </h1>
            <p className="text-default-600 text-sm max-w-xs">
              We're preparing everything for you
            </p>
          </div>

          <div className="w-full max-w-xs">
            <Progress
              isIndeterminate
              size="sm"
              className="w-full"
              color="primary"
              classNames={{
                track: "bg-default-100",
                indicator: "bg-gradient-to-r from-primary-400 to-primary-600",
              }}
            />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (tokenStatus === "invalid" || tokenStatus === "expired") {
    return (
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardBody className="flex flex-col items-center justify-center py-12 px-8">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <XCircle className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full blur opacity-20"></div>
          </div>

          <div className="text-center space-y-3 mb-8">
            <h1 className="text-2xl font-bold text-default-900">
              Link No Longer Valid
            </h1>
            <p className="text-default-600 text-sm max-w-sm leading-relaxed">
              This reset link has expired or is no longer valid. No worries
              though — we can send you a new one!
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button
              as={Link}
              href="/forgot-password"
              color="primary"
              size="md"
              className="w-full font-medium"
            >
              Get New Reset Link
            </Button>

            <Button
              as={Link}
              href="/login"
              variant="ghost"
              color="default"
              size="md"
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-center w-full">
            Password Reset!
          </h1>
          <p className="text-sm text-default-600 text-center">
            Your password has been successfully reset.
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <div className="text-center space-y-4">
            <p className="text-small text-default-600">
              You will be redirected to the sign in page in a few seconds...
            </p>

            <Button
              as={Link}
              href="/login"
              color="primary"
              size="lg"
              className="w-full"
            >
              Sign In Now
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center w-full">
          Reset Password
        </h1>
        <p className="text-sm text-default-600 text-center">
          Choose a new password for your account
        </p>
      </CardHeader>
      <CardBody className="gap-4">
        <Form
          schema={resetPasswordSchema}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <PasswordInput
              name="password"
              label="New Password"
              placeholder="Create a strong password"
              startContent={<Lock className="h-4 w-4 text-default-400" />}
              required
            />
            <PasswordStrengthMeter name="password" />
          </div>

          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            startContent={<Lock className="h-4 w-4 text-default-400" />}
            required
          />

          {error && (
            <div className="p-3 rounded-lg bg-danger-50 border border-danger-200">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={resetPasswordMutation.isPending}
          >
            Reset Password
          </Button>
        </Form>

        <div className="text-center pt-4 border-t border-default-200">
          <Link
            href="/login"
            color="primary"
            className="flex items-center justify-center gap-2 hover:opacity-80"
          >
            Back to Sign In
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
