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
      title: "Success",
      color: "success",
      ...options,
    });
  },

  error: (options: CustomizedToastProps) => {
    addToast({
      title: "Error",
      color: "danger",
      ...options,
    });
  },

  warning: (options: CustomizedToastProps) => {
    addToast({
      title: "Warning",
      color: "warning",
      ...options,
    });
  },

  info: (options: CustomizedToastProps) => {
    addToast({
      title: "Info",
      color: "primary",
      ...options,
    });
  },
};
