// import React from "react";
// import {
//   FieldErrors,
//   UseFormRegister,
//   FieldValues,
//   Path,
// } from "react-hook-form";
// interface TextAreaInputProps<T extends FieldValues> {
//   name: Path<T>;
//   label: string;
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   disabled?: boolean;
//   required?: boolean;
//   placeholder?: string;
//   type?: string;
//   textAreaClassName?: string;
// }
// const TextAreaInput = <T extends FieldValues>({
//   name,
//   label,
//   register,
//   errors,
//   disabled = false,
//   required = false,
//   placeholder = "",
//   textAreaClassName = "h-32",
// }: //   type = "text",
// TextAreaInputProps<T>) => {
//   const error = errors[name];
//   return (
//     <div className="flex flex-col gap-2">
//       <label htmlFor={name} className="text-sm font-semibold text-gray-800">
//         {label} {required && <span className="text-red-700">*</span>}
//       </label>
//       <textarea
//         id={name}
//         placeholder={placeholder}
//         {...register(name)}
//         className={`p-2 border rounded-md ${textAreaClassName} ${
//           error ? "border-red-500" : "border-gray-300"
//         }`}
//         disabled={disabled}
//       />
//       {error && (
//         <p className="text-red-500 text-sm">{error.message?.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default TextAreaInput;
import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

interface TextAreaInputProps<T extends FieldValues> {
  id?: string; // Added id prop
  name: Path<T>;
  label: string;
  className?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
  rows?: number; // Use rows instead of height
}

const TextAreaInput = <T extends FieldValues>({
  id,
  name,
  label,
  className,
  register,
  errors,
  disabled = false,
  required = false,
  placeholder = "",
  rows = 4, // Default to 4 rows
}: TextAreaInputProps<T>) => {
  const error = errors[name];
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-gray-800">
        {label} {required && <span className="text-red-700">*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        rows={rows} // Apply the number of rows here
        className={`${className} p-2 border rounded-md border-gray-300 ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:outline-none focus:ring-0 focus:shadow-md"
        }`}
        disabled={disabled}
      />
      {error && (
        <p className="text-red-500 text-sm">{error.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextAreaInput;
