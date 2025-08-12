import { addToast } from "@heroui/react";

type ToastProps = Parameters<typeof addToast>[0];

type CustomizedToastProps = Omit<
  ToastProps,
  "title" | "description" | "color"
> & {
  description: string;
  title?: string;
};

export const toast = {
  success: (options: CustomizedToastProps) => {
    addToast({
      color: "success",
      ...options,
    });
  },

  error: (options: CustomizedToastProps) => {
    addToast({
      color: "danger",
      ...options,
    });
  },

  warning: (options: CustomizedToastProps) => {
    addToast({
      color: "warning",
      ...options,
    });
  },

  info: (options: CustomizedToastProps) => {
    addToast({
      color: "primary",
      ...options,
    });
  },
};
