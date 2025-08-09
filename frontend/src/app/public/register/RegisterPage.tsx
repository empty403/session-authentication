import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { Mail, Lock, User, Chrome, Shield } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { PasswordStrengthMeter } from "@/components/forms/PasswordStrengthMeter";
import { registerSchema, type RegisterFormData } from "@/lib/validation";

export const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    console.log("Register data:", data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGoogleRegister = () => {
    console.log("Google register clicked");
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
            startContent={<Chrome className="h-5 w-5" />}
            onPress={handleGoogleRegister}
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
