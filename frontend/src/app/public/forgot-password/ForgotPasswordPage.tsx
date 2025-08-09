import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Link } from "@heroui/react";
import { Mail, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { toast } from "@/utils/toast";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [cooldownTime, setCooldownTime] = useState(0);

  const {
    mutate: forgotPasswordMutate,
    isPending: forgotPasswordPending,
    isSuccess: forgotPasswordSuccess,
  } = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      startCooldown();
    },
    onError: (error) => {
      toast.error({
        description:
          error.message || "Failed to send reset email. Please try again.",
      });
    },
  });

  const { mutate: resendMutate, isPending: resendPending } = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      startCooldown();
    },
    onError: (error) => {
      toast.error({
        description:
          error.message || "Failed to resend email. Please try again.",
      });
    },
  });

  const startCooldown = () => {
    setCooldownTime(60);
    const timer = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setEmail(data.email);
    forgotPasswordMutate(data.email);
  };

  const handleResend = () => {
    if (cooldownTime > 0) return;
    resendMutate(email);
  };

  if (forgotPasswordSuccess) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-center w-full">
            Check Your Email
          </h1>
          <p className="text-sm text-default-600 text-center">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <div className="text-center space-y-4">
            <p className="text-small text-default-600">
              Didn't receive the email? Check your spam folder or click below to
              resend.
            </p>

            <Button
              variant="bordered"
              size="lg"
              className="w-full"
              onPress={handleResend}
              isLoading={resendPending}
              isDisabled={cooldownTime > 0}
              startContent={
                cooldownTime > 0 ? <Clock className="h-4 w-4" /> : undefined
              }
            >
              {cooldownTime > 0 ? `Resend in ${cooldownTime}s` : "Resend Email"}
            </Button>

            <div className="pt-4 border-t border-default-200">
              <Link
                href="/login"
                color="primary"
                className="flex items-center justify-center gap-2 hover:opacity-80"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center w-full">
          Forgot Password?
        </h1>
        <p className="text-sm text-default-600 text-center">
          No worries! Enter your email address and we'll send you a reset link.
        </p>
      </CardHeader>
      <CardBody className="gap-4">
        <Form
          schema={forgotPasswordSchema}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email address"
            startContent={<Mail className="h-4 w-4 text-default-400" />}
            required
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={forgotPasswordPending}
          >
            Send Reset Link
          </Button>
        </Form>

        <div className="text-center pt-4 border-t border-default-200">
          <span className="text-small text-default-600">
            Remember your password?{" "}
            <Link
              href="/login"
              color="primary"
              className="font-semibold hover:opacity-80"
            >
              Sign in
            </Link>
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
