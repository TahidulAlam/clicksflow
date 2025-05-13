"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTypeAny, z } from "zod";

type FormRenderProps<T extends z.ZodTypeAny> = {
  methods: ReturnType<typeof useForm<z.infer<T>>>;
};

export interface FormAreaProps<T extends ZodTypeAny> {
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: SubmitHandler<z.infer<T>>;
  children: (props: FormRenderProps<T>) => React.ReactNode;
  className?: string;
}

const FormArea = <T extends ZodTypeAny>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className = "flex flex-col gap-6",
}: FormAreaProps<T>) => {
  const methods = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      <span className="text-sm text-gray-600">
        <span className="bg-blue-950 py-0.5 font-serif text-[10px] px-[6px] rounded-full  text-white">
          i
        </span>{" "}
        Fields with an asterisk (<span className="text-red-600">*</span>) are
        mandatory
      </span>
      {children({ methods })}
    </form>
  );
};

export default FormArea;
