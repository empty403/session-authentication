// app/register/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/AuthLayout";
import { Link } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { ControlledPassword } from "@/components/ControlledPassword";
import { PasswordStrengthBar } from "@/components/PasswordStrength";
import { useStrengthPassword } from "@/hooks/useStrengthPassword";

const Register = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fName: "",
      lName: "",
    },
  });

  const password = form.watch("password");

  const strengthScore = useStrengthPassword(password);

  const isWeakPassword = strengthScore < 2;

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to get started"
      footerContent={
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="fName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <ControlledPassword
              control={form.control}
              name="password"
              label="Password"
            />
            {password && strengthScore > -1 && (
              <PasswordStrengthBar score={strengthScore} />
            )}
          </div>
          <ControlledPassword
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
          />

          <Button
            disabled={isWeakPassword}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Register;
