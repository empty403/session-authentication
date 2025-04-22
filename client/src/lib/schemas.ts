import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email is required",
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string({
      invalid_type_error: "Password is required",
      required_error: "Password is required",
    })
    .min(1, "Password is required"),
});

export const requestResetPasswordSchema = loginSchema.pick({
  email: true,
});

export const registerSchema = z
  .object({
    fName: z.string().min(1, "First Name is required"),
    lName: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be less than 64 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resetPasswordSchema = z
  .object({
    currentPassword: z
      .string({
        invalid_type_error: "Current password is required",
        required_error: "Current password is required",
      })
      .min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be less than 64 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password must be less than 64 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
