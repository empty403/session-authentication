import { useState } from "react";
import { Input as HeroInput, Button, type InputProps } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useFormContext, useController } from "react-hook-form";

type Props = {
  name: string;
} & Omit<
  InputProps,
  "value" | "onChange" | "onBlur" | "name" | "type" | "endContent"
>;

export const PasswordInput = ({ name, ...props }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
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

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <HeroInput
      {...props}
      {...field}
      type={isVisible ? "text" : "password"}
      isInvalid={!!error}
      errorMessage={errorMessage}
      classNames={{
        input: "bg-transparent",
        inputWrapper: "bg-default-100/60 backdrop-blur-md",
        ...props.classNames,
      }}
      endContent={
        <Button
          className="focus:outline-none"
          type="button"
          onPress={toggleVisibility}
          size="sm"
          variant="light"
          isIconOnly
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4 text-default-400 pointer-events-none" />
          ) : (
            <Eye className="h-4 w-4 text-default-400 pointer-events-none" />
          )}
        </Button>
      }
    />
  );
};
