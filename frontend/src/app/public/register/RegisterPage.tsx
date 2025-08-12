import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { Mail, Lock, User, Shield } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { PasswordStrengthMeter } from "@/components/forms/PasswordStrengthMeter";
import { registerSchema, type RegisterFormData } from "@/lib/validation";
import { useOAuth } from "../../../hooks/useOAuth";

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { initiateGoogleAuth, isLoading: isOAuthLoading } = useOAuth();

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    console.log("Register data:", data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGoogleRegister = () => {
    initiateGoogleAuth();
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center w-full">
          Create Account
        </h1>
        <p className="text-sm text-default-600 text-center">
          Join us today! Create your account to get started
        </p>
      </CardHeader>
      <CardBody className="gap-4">
        <Form
          schema={registerSchema}
          onSubmit={handleRegister}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              name="firstName"
              type="text"
              label="First Name"
              placeholder="Enter first name"
              startContent={<User className="h-4 w-4 text-default-400" />}
              required
            />
            <Input
              name="lastName"
              type="text"
              label="Last Name"
              placeholder="Enter last name"
              startContent={<User className="h-4 w-4 text-default-400" />}
              required
            />
          </div>

          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            startContent={<Mail className="h-4 w-4 text-default-400" />}
            required
          />

          <div className="flex flex-col gap-2">
            <PasswordInput
              name="password"
              label="Password"
              placeholder="Create a password"
              startContent={<Lock className="h-4 w-4 text-default-400" />}
              required
            />
            <PasswordStrengthMeter name="password" />
          </div>

          <PasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            startContent={<Lock className="h-4 w-4 text-default-400" />}
            required
          />

          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </Form>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <span className="text-small text-default-400">or</span>
          <Divider className="flex-1" />
        </div>

        <Button
          variant="bordered"
          size="lg"
          className="w-full font-semibold"
          startContent={
            <div className="w-5 h-5">
              <GoogleIcon />
            </div>
          }
          onPress={handleGoogleRegister}
          isLoading={isOAuthLoading}
          isDisabled={isLoading || isOAuthLoading}
        >
          Continue with Google
        </Button>

        <div className="text-center pt-4">
          <span className="text-small text-default-600">
            Already have an account?{" "}
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

const GoogleIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    ></path>
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);
