import { Checkbox as HeroCheckbox, type CheckboxProps } from "@heroui/react";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
  className?: string;
} & Omit<CheckboxProps, "isSelected" | "onValueChange" | "name">;

export const Checkbox = ({ name, className, ...props }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const error = errors[name];

  return (
    <div className={className}>
      <HeroCheckbox
        {...props}
        isSelected={!!field.value}
        onValueChange={field.onChange}
        isInvalid={!!error}
      />
      {error && (
        <p className="text-tiny text-danger mt-1">{error.message as string}</p>
      )}
    </div>
  );
};
