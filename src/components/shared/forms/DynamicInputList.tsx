"use client";

import React from "react";
import { useFieldArray, UseFormReturn, Path } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FormData } from "../../adminDashboard/offers/add/trackingAndControlForm/TrackingControlForm";

interface DynamicInputListProps {
  form: UseFormReturn<FormData>;
  fieldName: "customFields";
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
}

const DynamicInputList: React.FC<DynamicInputListProps> = ({
  form,
  fieldName,
  label = "Custom Field",
  placeholder = "Enter value",
  isDisabled = false,
}) => {
  const {
    control,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const fieldErrors = errors[fieldName] as
    | Record<number, { value?: { message?: string } }>
    | undefined;

  const handleAdd = () => {
    append({ value: "" });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-3 flex justify-between">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 transition-colors"
          disabled={isDisabled || isSubmitting}
          aria-label={`Add new ${label.toLowerCase()}`}
        >
          <FaPlus size={16} />
          <span className="text-sm font-medium">Add New</span>
        </button>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center">
            <div className="flex-1">
              <input
                type="text"
                id={`${fieldName}.${index}.value`}
                className="block w-full py-1.5 px-3 border border-gray-300 rounded-l-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm disabled:bg-gray-100"
                placeholder={placeholder}
                value={
                  (watch(`${fieldName}.${index}.value` as Path<FormData>) as
                    | string
                    | undefined) || ""
                }
                onChange={(e) =>
                  form.setValue(
                    `${fieldName}.${index}.value` as Path<FormData>,
                    e.target.value
                  )
                }
                disabled={isDisabled || isSubmitting}
                aria-label={`${label} ${index + 1}`}
              />
              {fieldErrors?.[index]?.value && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors[index].value.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="p-2 bg-red-500 border border-red-500 rounded-r-md text-white hover:bg-red-600 disabled:bg-red-300 transition-colors"
              disabled={isDisabled || isSubmitting}
              aria-label={`Remove ${label} ${index + 1}`}
            >
              <MdClose size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicInputList;
