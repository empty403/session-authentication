import { Textarea as HeroTextarea, type TextAreaProps } from "@heroui/react";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
} & Omit<TextAreaProps, "value" | "onChange" | "onBlur" | "name">;

export const Textarea = ({ name, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <HeroTextarea
      {...props}
      {...field}
      isInvalid={!!error}
      errorMessage={errorMessage}
      classNames={{
        input: "bg-transparent",
        inputWrapper: "bg-default-100/60 backdrop-blur-md",
        ...props.classNames,
      }}
    />
  );
};
