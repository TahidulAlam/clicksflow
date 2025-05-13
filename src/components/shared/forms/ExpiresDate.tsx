"use client";

import React, { useRef, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import ToggleSwitch from "../buttons/ToggleSwitch"; // Make sure this import is correct!

interface ExpiresDateProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  showSelect: boolean;
  selectedValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const ExpiresDate: React.FC<ExpiresDateProps> = ({
  toggle,
  setToggle,
  showSelect,
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && onChange) {
      onChange(date.toISOString());
    }
    setShowCalendar(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center relative">
      {/* Toggle Section */}
      <div className="w-1/5">
        <ToggleSwitch label="Expires" checked={toggle} onChange={setToggle} />
      </div>

      {/* Date Picker Section */}
      <div className="w-4/5 relative">
        {showSelect && (
          <div className="relative flex flex-col gap-2" ref={calendarRef}>
            <label className="text-xs font-semibold text-gray-800">
              Valid Until <span className="text-red-600">*</span>
            </label>
            <input
              readOnly
              value={startDate ? format(startDate, "PPP") : ""}
              placeholder="Pick a date"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full border px-4 py-2 rounded-md text-sm cursor-pointer"
            />
            {showCalendar && (
              <div className="absolute mt-16 flex z-10 rounded-md shadow-md">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  inline
                  showIcon
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpiresDate;
