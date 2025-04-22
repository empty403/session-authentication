import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "@/lib/schemas";
import { ControlledPassword } from "@/components/ControlledPassword";
import { PasswordStrengthBar } from "@/components/PasswordStrength";
import { useStrengthPassword } from "@/hooks/useStrengthPassword";

type FormValues = z.infer<typeof resetPasswordSchema>;

type Props = {
  isLoading: boolean;
  onSubmit: (form: FormValues) => void;
};

export function ResetPasswordForm({ isLoading, onSubmit }: Props) {
  console.log("😈 ~ ResetPasswordForm ~ isLoading ~ empty@404 😈:", isLoading);
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const newPassword = form.watch("newPassword");

  const strengthScore = useStrengthPassword(newPassword);

  const isWeakPassword = strengthScore < 2;

  function onSubmitHandler(values: FormValues) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-6">
        {/* Current Password Field */}
        <ControlledPassword
          control={form.control}
          label="Current Password"
          name="currentPassword"
        />

        {/* New Password Field */}
        <div className="space-y-3">
          <ControlledPassword
            control={form.control}
            label="New Password"
            name="newPassword"
          />
          {newPassword && strengthScore > -1 && (
            <PasswordStrengthBar score={strengthScore} />
          )}
        </div>

        {/* Confirm Password Field */}
        <ControlledPassword
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
        />

        <Button type="submit" className="w-full" disabled={isWeakPassword}>
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
