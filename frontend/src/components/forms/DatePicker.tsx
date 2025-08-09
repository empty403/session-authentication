import { DatePicker as HeroDatePicker, type DatePickerProps } from "@heroui/react";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
} & Omit<DatePickerProps, "value" | "onChange" | "name">;

export const DatePicker = ({ name, ...props }: Props) => {
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
    <HeroDatePicker
      {...props}
      value={field.value}
      onChange={field.onChange}
      isInvalid={!!error}
      errorMessage={errorMessage}
      classNames={{
        inputWrapper: "bg-default-100/60 backdrop-blur-md",
        ...props.classNames,
      }}
    />
  );
};