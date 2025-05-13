// components/DateRangePicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  value: [Date | null, Date | null];
  onChange: (range: [Date | null, Date | null]) => void;
  onApply?: (range: [Date | null, Date | null]) => void;
  onCancel?: () => void;
  placeholder?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  onApply,
  onCancel,
  placeholder = "Select date range",
}) => {
  const [tempRange, setTempRange] = useState<[Date | null, Date | null]>(value);

  const handleApply = () => {
    onChange(tempRange);
    onApply?.(tempRange);
  };

  const handleCancel = () => {
    setTempRange(value);
    onCancel?.();
  };

  return (
    <div className="relative inline-block">
      <DatePicker
        selectsRange
        startDate={tempRange[0]}
        endDate={tempRange[1]}
        onChange={(update: [Date | null, Date | null]) => setTempRange(update)}
        placeholderText={placeholder}
        inline
        monthsShown={2}
      />
      <div className="flex justify-between px-4 py-2">
        <button
          onClick={handleCancel}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
