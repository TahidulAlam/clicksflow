// "use client";

// import React from "react";

// interface ToggleSwitchProps {
//   label?: string;
//   className?: string;
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   disabled?: boolean;
// }

// const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
//   label,
//   checked,
//   className,
//   onChange,
//   disabled = false,
// }) => {
//   return (
//     <div
//       className={`${className ? className : "gap-6"} flex flex-col items-start`}
//     >
//       <label className="text-xs font-bold text-gray-800 truncate">
//         {label}
//       </label>
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={() => onChange(!checked)}
//         className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors
//           ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
//           ${disabled && "opacity-50 cursor-not-allowed"}
//         `}
//       >
//         <span
//           className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform
//             ${checked ? "translate-x-8" : "translate-x-1"}
//           `}
//         />
//       </button>
//     </div>
//   );
// };

// export default ToggleSwitch;

"use client";

import React from "react";

interface ToggleSwitchProps {
  label?: string;
  className?: string;
  labelClassName?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  checked,
  labelClassName,
  className,
  onChange,
  disabled = false,
  size = "lg",
}) => {
  // Define size configurations
  const sizeStyles = {
    sm: {
      toggleWidth: "w-10",
      toggleHeight: "h-5",
      knobSize: "h-3 w-3",
      knobTranslation: checked ? "translate-x-6" : "translate-x-1",
    },
    md: {
      toggleWidth: "w-12",
      toggleHeight: "h-6",
      knobSize: "h-4 w-4",
      knobTranslation: checked ? "translate-x-7" : "translate-x-1",
    },
    lg: {
      toggleWidth: "w-14",
      toggleHeight: "h-7",
      knobSize: "h-5 w-5",
      knobTranslation: checked ? "translate-x-8" : "translate-x-1",
    },
  };

  const { toggleWidth, toggleHeight, knobSize, knobTranslation } =
    sizeStyles[size];

  return (
    <div
      className={`flex flex-col items-start ${className ? className : "gap-4"}`}
    >
      {label && (
        <label
          className={`${labelClassName} text-xs font-bold text-gray-800 truncate`}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex ${toggleWidth} ${toggleHeight} items-center rounded-full
          transition-colors duration-200
          ${checked ? "bg-[#1A2B49]" : "bg-gray-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`
            inline-block ${knobSize} rounded-full bg-white
            transform transition-transform duration-200
            ${knobTranslation}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
