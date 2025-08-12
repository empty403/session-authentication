import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { toast } from "@/utils/toast";

type VerificationState = "loading" | "success" | "error" | "expired";

export const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();
  const [verificationState, setVerificationState] =
    useState<VerificationState>("loading");
  const [resendCooldown, setResendCooldown] = useState(0);

  const verifyMutation = useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: () => {
      setVerificationState("success");
      toast.success({ description: "Email verified successfully!" });
    },
    onError: (error) => {
      const message = error?.message || "Verification failed";
      if (message.includes("expired") || message.includes("invalid")) {
        setVerificationState("expired");
      } else {
        setVerificationState("error");
      }
      toast.error({ description: message });
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => authApi.resendVerification(),
    onSuccess: () => {
      toast.success({
        description: "Verification email sent! Please check your inbox.",
      });
      setResendCooldown(60);
    },
    onError: (error) => {
      const message = error?.message || "Failed to resend verification email";
      toast.error({ description: message });
    },
  });

  useEffect(() => {
    if (token) {
      verifyMutation.mutate(token);
    } else {
      setVerificationState("error");
    }
  }, [token]);

  useEffect(() => {
    let interval: number;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleResendVerification = () => {
    if (resendCooldown === 0) {
      resendMutation.mutate();
    }
  };

  const contentMap = {
    loading: (
      <>
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-md">
            <Spinner size="md" color="white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">
            Verifying Your Email
          </h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            Please wait while we verify your email address...
          </p>
        </div>
      </>
    ),

    success: (
      <>
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-success-400 to-success-500 rounded-full flex items-center justify-center shadow-md">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-success-400 to-success-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">
            Email Verified!
          </h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            Your email has been successfully verified. You can now log in to
            your account.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button
            as={Link}
            to="/login"
            color="primary"
            size="md"
            className="w-full"
          >
            Continue to Login
          </Button>
        </div>
      </>
    ),

    expired: (
      <>
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-warning-400 to-orange-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">Link Expired</h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            This verification link has expired or is invalid. Please request a
            new verification email.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button
            onPress={handleResendVerification}
            color="primary"
            size="md"
            className="w-full"
            isLoading={resendMutation.isPending}
            isDisabled={resendCooldown > 0}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Send New Verification Email"}
          </Button>
          <Button
            as={Link}
            to="/login"
            variant="light"
            size="md"
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </>
    ),

    error: (
      <>
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-danger-400 to-danger-500 rounded-full flex items-center justify-center shadow-md">
            <XCircle className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-danger-400 to-danger-500 rounded-full blur opacity-20"></div>
        </div>

        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold text-default-900">
            Verification Failed
          </h1>
          <p className="text-default-600 text-sm max-w-sm leading-relaxed">
            We couldn't verify your email address. The link may be invalid or
            expired.
          </p>
        </div>

        <div className="w-full space-y-3">
          <Button
            onPress={handleResendVerification}
            color="primary"
            size="md"
            className="w-full"
            isLoading={resendMutation.isPending}
            isDisabled={resendCooldown > 0}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Send New Verification Email"}
          </Button>
          <Button
            as={Link}
            to="/login"
            variant="light"
            size="md"
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      </>
    ),
  } as const;

  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardBody className="flex flex-col items-center justify-center py-12 px-8">
        {contentMap[verificationState]}
      </CardBody>
    </Card>
  );
};
