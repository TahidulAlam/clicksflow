// "use client";

// import React, {
//   useState,
//   useMemo,
//   useRef,
//   useCallback,
//   useEffect,
// } from "react";
// import { FieldError } from "react-hook-form";
// import { FiChevronDown } from "react-icons/fi";
// import { debounce } from "lodash";

// export interface OptionType {
//   label: string;
//   value: string;
// }

// interface SingleSelectProps {
//   id: string;
//   label?: string;
//   className?: string;
//   required?: boolean;
//   options: OptionType[];
//   value?: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   error?: FieldError;
//   isDisabled?: boolean;
//   suffix?: React.ReactNode;
//   showSearch?: boolean;
//   customModalTrigger?: React.ReactNode;
// }

// const SingleSelect: React.FC<SingleSelectProps> = ({
//   id,
//   label,
//   className = "",
//   required = false,
//   options,
//   value,
//   onChange,
//   placeholder = "Select...",
//   error,
//   isDisabled = false,
//   suffix,
//   showSearch = true,
// }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   const debouncedSetSearchTerm = useMemo(
//     () => debounce((value: string) => setSearchTerm(value), 300),
//     []
//   );

//   const filteredOptions = useMemo(() => {
//     if (!showSearch || !searchTerm) return options;
//     return options.filter((opt) =>
//       opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [options, searchTerm, showSearch]);

//   const selectedOption = useMemo(
//     () => options.find((opt) => opt.value === value) || null,
//     [options, value]
//   );

//   const handleSelect = useCallback(
//     (val: string) => {
//       onChange(val);
//       setShowDropdown(false);
//       setSearchTerm("");
//     },
//     [onChange]
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//         setSearchTerm("");
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside, {
//       passive: true,
//     });
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     if (showDropdown && showSearch && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [showDropdown, showSearch]);

//   const errorId = error ? `${id}-error` : undefined;
//   const dropdownId = `${id}-dropdown`;

//   return (
//     <div
//       ref={dropdownRef}
//       className={`flex flex-col gap-2 relative ${className}`}
//       role="combobox"
//       aria-expanded={showDropdown}
//       aria-controls={dropdownId}
//     >
//       {label && (
//         <div className="flex justify-between items-center">
//           <label
//             htmlFor={id}
//             className="text-xs font-semibold text-gray-800"
//             id={`${id}-label`}
//           >
//             {label}
//             {required && <span className="text-red-700 ml-1">*</span>}
//           </label>
//           {suffix && <div className="flex items-center">{suffix}</div>}
//         </div>
//       )}

//       <button
//         type="button"
//         id={id}
//         onClick={() => setShowDropdown((prev) => !prev)}
//         disabled={isDisabled}
//         className={`
//           w-full flex justify-between items-center text-left text-sm
//           border rounded-md px-3 py-[8px] bg-white
//           ${error ? "border-red-500" : "border-gray-300"}
//           ${
//             isDisabled
//               ? "bg-gray-100 cursor-not-allowed opacity-50"
//               : "hover:border-gray-400"
//           }
//           focus:outline-none focus:ring-2 focus:ring-blue-500
//         `}
//         aria-haspopup="listbox"
//         aria-labelledby={`${id}-label`}
//         aria-describedby={errorId}
//       >
//         <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
//           {selectedOption
//             ? selectedOption.label
//             : options.length > 0
//             ? options[0].label
//             : placeholder}
//         </span>
//         <FiChevronDown
//           className={`w-4 h-4 ml-2 transition-transform duration-200 ${
//             showDropdown ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {showDropdown && (
//         <div
//           id={dropdownId}
//           className="absolute top-full w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
//           role="listbox"
//         >
//           {showSearch && (
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => debouncedSetSearchTerm(e.target.value)}
//               disabled={isDisabled}
//               className="w-full px-3 py-[8px] border-b border-gray-200 text-sm focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed sticky top-0 bg-white"
//               aria-label="Search options"
//             />
//           )}
//           <ul className="max-h-48 overflow-auto">
//             {filteredOptions.length > 0 ? (
//               filteredOptions.map((opt, index) => (
//                 <li
//                   key={opt.value}
//                   id={`${id}-option-${index}`}
//                   className={`
//                     px-3 py-[8px] border-b border-gray-200 text-sm cursor-pointer
//                     hover:bg-gray-100 focus:bg-gray-100
//                     ${value === opt.value ? "bg-blue-50 text-blue-700" : ""}
//                   `}
//                   onClick={() => handleSelect(opt.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       handleSelect(opt.value);
//                       e.preventDefault();
//                     }
//                   }}
//                   role="option"
//                   aria-selected={value === opt.value}
//                   tabIndex={0}
//                 >
//                   {opt.label}
//                 </li>
//               ))
//             ) : (
//               <li className="px-3 py-[8px] text-sm text-gray-500">
//                 No results
//               </li>
//             )}
//           </ul>
//         </div>
//       )}

//       {error && (
//         <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
//           {error.message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default React.memo(SingleSelect);
"use client";

import React, { useState, useMemo, useRef, useEffect, useId } from "react";
import { FieldError } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { debounce } from "lodash";

export interface OptionType {
  label: string;
  value: string;
}

interface SingleSelectProps {
  id?: string;
  label?: string;
  className?: string;
  required?: boolean;
  options: OptionType[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: FieldError;
  isDisabled?: boolean;
  suffix?: React.ReactNode;
  showSearch?: boolean;
  customModalTrigger?: React.ReactNode;
}

const SingleSelect: React.FC<SingleSelectProps> = ({
  id,
  label,
  className = "",
  required = false,
  options,
  value,
  onChange,
  placeholder = "Select...",
  error,
  isDisabled = false,
  suffix,
  showSearch = true,
  // customModalTrigger,
}) => {
  const internalId = useId();
  const inputId = id || internalId;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSetSearchTerm = useMemo(() => {
    return debounce((val: string) => {
      setSearchTerm(val);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, showSearch]);

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value) || null,
    [options, value]
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setShowDropdown(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showDropdown && showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown, showSearch]);

  const errorId = error ? `${inputId}-error` : undefined;
  const dropdownId = `${inputId}-dropdown`;

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col gap-2 relative ${className}`}
      role="combobox"
      aria-expanded={showDropdown}
      aria-controls={dropdownId}
    >
      {label && (
        <div className="flex justify-between items-center">
          <label
            htmlFor={inputId}
            className="text-xs font-bold text-gray-800"
            id={`${inputId}-label`}
          >
            {label}
            {required && <span className="text-red-700 ml-1">*</span>}
          </label>
          {suffix && <div>{suffix}</div>}
        </div>
      )}

      <button
        type="button"
        id={inputId}
        onClick={() => setShowDropdown((prev) => !prev)}
        disabled={isDisabled}
        className={`
          w-full flex justify-between items-center text-left text-sm
          border rounded-md px-3 py-[8px] bg-white
          ${error ? "border-red-500" : "border-gray-300"}
          ${isDisabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}
        `}
        aria-haspopup="listbox"
        aria-labelledby={`${inputId}-label`}
        aria-describedby={errorId}
        style={{ outline: "none", boxShadow: "none" }}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDropdown && (
        <div
          id={dropdownId}
          className="absolute top-full w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-auto"
          role="listbox"
        >
          {showSearch && (
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              onChange={(e) => debouncedSetSearchTerm(e.target.value)}
              disabled={isDisabled}
              className="w-full px-3 py-[8px] border-b border-gray-200 text-sm disabled:bg-gray-100 sticky top-0 bg-white"
              aria-label="Search options"
              style={{ outline: "none", boxShadow: "none" }}
            />
          )}
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <li
                  key={opt.value}
                  id={`${inputId}-option-${index}`}
                  className={`px-3 py-[8px] border-b border-gray-200 text-sm cursor-pointer hover:bg-gray-100 ${
                    value === opt.value ? "bg-blue-50 text-blue-700" : ""
                  }`}
                  onClick={() => handleSelect(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelect(opt.value);
                      e.preventDefault();
                    }
                  }}
                  role="option"
                  aria-selected={value === opt.value}
                  tabIndex={0}
                  style={{ outline: "none" }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-[8px] text-sm text-gray-500">
                No results
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default React.memo(SingleSelect);
