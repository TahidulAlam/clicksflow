import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register?: UseFormRegister<T>; 
  errors?: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;

  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

 
  inputRightIcon?: React.ReactNode;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  register,
  errors = {},
  disabled = false,
  required = false,
  placeholder = "",
  type = "text",
  value,
  onChange,
  inputRightIcon,
}: TextInputProps<T>) => {
  const error = errors?.[name];

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-xs font-bold text-gray-800">
        {label} {required && <span className="text-red-700">*</span>}
      </label>

      <div className="relative w-full">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...(register ? register(name) : {})}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-3 py-[6px] border rounded-md transition-shadow duration-200 pr-10
            ${error ? "border-red-500" : "border-gray-300"} 
            focus:outline-none focus:ring-0 focus:shadow-md`}
        />

        {inputRightIcon && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {inputRightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextInput;