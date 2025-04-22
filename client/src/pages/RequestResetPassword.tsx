import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Link } from "react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { requestResetPasswordSchema } from "@/lib/schemas";

type FormValue = z.infer<typeof requestResetPasswordSchema>;

export default function RequestResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValue>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: FormValue) {
    setIsLoading(true);
    console.log("Requesting password reset for:", values.email);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <Link
            to="/login"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            aria-label="Back to Login"
          >
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle className="text-center">Forgot Password</CardTitle>
          {!isSubmitted && (
            <CardDescription className="text-center pt-2">
              Enter your email to receive reset instructions.
            </CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <MailCheck className="mx-auto h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold">Check Your Email</p>
              <p className="text-sm text-muted-foreground">
                If an account exists for the email provided, we've sent
                instructions on how to reset your password.
              </p>
              <Button asChild className="w-full"><Link to="/login">Return to Login</Link></Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  Send
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
