import React from "react";

interface FormActionsProps {
  isSubmitting?: boolean;
  isLoading?: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  isLoading,
  onCancel,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-[#1E3557] text-white rounded-md hover:bg-blue-700"
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Submitting..." : "Continue"}
      </button>
    </div>
  );
};

export default FormActions;
