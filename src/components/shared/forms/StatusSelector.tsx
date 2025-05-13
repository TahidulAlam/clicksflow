"use client";
import React, { useEffect } from "react";
import { UseFormSetValue, FieldErrors, Path, PathValue } from "react-hook-form";

interface StatusOption {
  value: string;
  label: string;
  dotColor?: string;
}

interface StatusSelectorProps<T extends Record<string, unknown>> {
  label?: string;
  fieldName?: Path<T>;
  setValue: UseFormSetValue<T>;
  errors: FieldErrors<T>;
  selectedStatus?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  required?: boolean;
  options?: StatusOption[];
}

const defaultOptions: StatusOption[] = [
  { value: "active", label: "Active", dotColor: "bg-green-500" },
  { value: "pending", label: "Pending", dotColor: "bg-yellow-400" },
  { value: "paused", label: "Paused", dotColor: "bg-orange-600" },
  { value: "deleted", label: "Deleted", dotColor: "bg-red-500" },
];

const StatusSelector = <T extends Record<string, unknown>>({
  label,
  fieldName,
  setValue,
  errors,
  selectedStatus,
  isSubmitting = false,
  required = false,
  isLoading = false,
  options = defaultOptions,
}: StatusSelectorProps<T>) => {
  const disabled = isSubmitting || isLoading;
  const statusOptions = options.length > 0 ? options : defaultOptions;

  // Automatically select first option if not already selected
  useEffect(() => {
    if (!selectedStatus && statusOptions[0]) {
      if (fieldName) {
        setValue(fieldName, statusOptions[0].value as PathValue<T, Path<T>>);
      }
    }
  }, [selectedStatus, setValue, fieldName, statusOptions]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-gray-800 capitalize">
        {label || fieldName}
        {required && <span className="text-red-700">*</span>}
        {/* <span className="text-red-500 ml-1">*</span> */}
      </label>
      <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              fieldName &&
              setValue(fieldName, option.value as PathValue<T, Path<T>>)
            }
            className={`flex-1 text-xs flex items-center justify-center gap-2 px-3 py-[8px] rounded-md transition
              ${
                selectedStatus === option.value
                  ? "bg-white border border-gray-300"
                  : "bg-transparent"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={disabled}
          >
            {option.dotColor && (
              <span className={`w-2.5 h-2.5 rounded-full ${option.dotColor}`} />
            )}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      {fieldName && errors[fieldName] && (
        <p className="text-red-500 text-sm">
          {errors[fieldName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default StatusSelector;
