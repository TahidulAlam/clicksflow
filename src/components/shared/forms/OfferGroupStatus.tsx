"use client";
import React from "react";
import SingleSelect from "../dataTable/SingleSelect";
import ToggleSwitch from "../buttons/ToggleSwitch";

interface OfferGroupStatusProps {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  showSelect: boolean;
  selectedValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const OfferGroupStatus: React.FC<OfferGroupStatusProps> = ({
  toggle,
  setToggle,
  showSelect,
  selectedValue,
  placeholder,
  onChange,
}) => {
  const [value, setValue] = React.useState(selectedValue || "");

  console.log("Selected value:", value);

  return (
    <div className="flex justify-between items-center rounded-md">
      <div className="w-1/5">
        <ToggleSwitch
          label="Offer Group Status"
          checked={toggle}
          onChange={setToggle}
        />
      </div>

      <div className="w-4/5">
        {showSelect && (
          <SingleSelect
            id="offerGroup"
            label="Offer Group"
            required
            options={[
              { value: "option1", label: "Option One" },
              { value: "option2", label: "Option Two" },
              { value: "option3", label: "Option Three" },
            ]}
            value={value}
            onChange={(val) => {
              setValue(val);
              onChange?.(val); // trigger parent handler if provided
            }}
            placeholder={placeholder || "Select an option"}
            error={undefined}
          />
        )}
      </div>
    </div>
  );
};

export default OfferGroupStatus;
