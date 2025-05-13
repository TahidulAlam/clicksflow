// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";

// interface TextInputProps<T extends FieldValues> {
//   name: Path<T>;
//   label: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
// }

// const TextInput = <T extends FieldValues>({
//   name,
//   label,
//   register,
//   errors,
//   disabled = false,
//   required = false,
//   placeholder = "",
//   type = "text",
// }: TextInputProps<T>) => {
//   const error = errors[name];

//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={name} className="text-xs font-bold text-gray-800">
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>
//       <input
//         id={name}
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`px-3 py-[6px] border rounded-md transition-shadow duration-200
//           ${error ? "border-red-500" : "border-gray-300"}
//           focus:outline-none focus:ring-0 focus:shadow-md`}
//         disabled={disabled}
//       />
//       {error && (
//         <p className="text-red-500 text-sm">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default TextInput;

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
  register?: UseFormRegister<T>; // Optional for controlled use
  errors?: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;

  // New props for controlled use
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Optional right-side icon/button (e.g., regenerate 🔄)
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

// import React from "react";
// import { UseFormRegister, FieldErrors } from "react-hook-form";
// import { FormData } from "./GenarelAddForm";

// interface TextInputProps {
//   name: keyof FormData;
//   label: string;
//   type?: string;
//   register: UseFormRegister<FormData>;
//   errors: FieldErrors<FormData>;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
//   "aria-describedby"?: string;
// }

// const TextInput: React.FC<TextInputProps> = ({
//   name,
//   label,
//   type = "text",
//   register,
//   errors,
//   required,
//   disabled,
//   className,
//   "aria-describedby": ariaDescribedBy,
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         htmlFor={name}
//         className="text-sm font-semibold text-gray-800"
//         aria-required={required}
//       >
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>
//       <input
//         id={name}
//         type={type}
//         {...register(name)}
//         className={`p-2 border rounded-md ${className} ${
//           errors[name] ? "border-red-500" : "border-gray-300"
//         }`}
//         disabled={disabled}
//         aria-describedby={ariaDescribedBy}
//       />
//       {errors[name] && (
//         <p
//           className="text-red-500 text-sm"
//           id={`${name}-error`}
//           role="alert"
//           aria-live="polite"
//         >
//           {errors[name]?.message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default React.memo(TextInput);
