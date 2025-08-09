import { Select as HeroSelect, type SelectProps } from "@heroui/react";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
} & Omit<SelectProps, "selectedKeys" | "onSelectionChange" | "name">;

export const Select = ({ name, ...props }: Props) => {
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
    <HeroSelect
      {...props}
      selectedKeys={field.value ? [field.value] : []}
      onSelectionChange={(keys) => {
        const selectedValue = Array.from(keys)[0];
        field.onChange(selectedValue);
      }}
      isInvalid={!!error}
      errorMessage={errorMessage}
      classNames={{
        trigger: "bg-default-100/60 backdrop-blur-md",
        ...props.classNames,
      }}
    />
  );
};