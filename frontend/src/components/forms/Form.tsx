import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z4 from "zod/v4/core";

type Props<T extends z4.$ZodType<unknown, FieldValues>> = {
  schema: T;
  onSubmit: SubmitHandler<z4.infer<T>>;
  children: ReactNode;
  className?: string;
} & Omit<UseFormProps<z4.input<T>, unknown, z4.output<T>>, "resolver">;

export const Form = <T extends z4.$ZodType<unknown, FieldValues>>({
  schema,
  onSubmit,
  children,
  className,
  ...formProps
}: Props<T>) => {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    ...formProps,
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
