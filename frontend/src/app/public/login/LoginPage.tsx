import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Link,
  Divider,
} from "@heroui/react";
import { Mail, Lock, Chrome, Shield } from "lucide-react";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Checkbox } from "@/components/forms/Checkbox";
import { loginSchema, type LoginFormData } from "@/lib/validation";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Login data:", data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-3 pb-6 pt-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center w-full">Sign In</h1>
          <p className="text-sm text-default-600 text-center">
            Welcome back! Please sign in to your account
          </p>
        </CardHeader>
        <CardBody className="gap-4">
          <Form
            schema={loginSchema}
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
          >
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              startContent={<Mail className="h-4 w-4 text-default-400" />}
              required
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Enter your password"
              startContent={<Lock className="h-4 w-4 text-default-400" />}
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox name="rememberMe" size="sm" color="primary">
                Remember me
              </Checkbox>
              <Link
                href="/forgot-password"
                size="sm"
                color="primary"
                className="hover:opacity-80"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-semibold"
              isLoading={isLoading}
            >
              Sign In
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
            onPress={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          <div className="text-center pt-4">
            <span className="text-small text-default-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                color="primary"
                className="font-semibold hover:opacity-80"
              >
                Sign up
              </Link>
            </span>
          </div>
        </CardBody>
    </Card>
  );
};
