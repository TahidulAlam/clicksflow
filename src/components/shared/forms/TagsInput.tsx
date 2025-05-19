"use client";
import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";

export interface OptionType {
  label: string;
  value: string;
}

interface TagsInputProps {
  id?: string;
  label?: string;
  labelSpan?: boolean;
  tags: string[];
  setTags: (tags: string[]) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  suggestions?: OptionType[];
}

const TagsInput: React.FC<TagsInputProps> = ({
  id,
  label = "Label",
  labelSpan = false,
  tags,
  setTags,
  inputValue,
  setInputValue,
  suggestions = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTag = (value: string) => {
    if (tags.includes(value)) {
      setTags(tags.filter((tag) => tag !== value));
    } else {
      setTags([...tags, value]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        toggleTag(inputValue.trim());
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const filteredSuggestions = suggestions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-xs font-semibold text-gray-800"
        >
          {label}{" "}
          {labelSpan && (
            <span className="text-xs font-normal text-gray-500">
              Separate multiple label by ,(comma) or{" "}
              <span className="text-red-500">enter</span> key
            </span>
          )}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-2 px-2 py-[6px] bg-white border border-gray-300 rounded-md focus:shadow-md focus:outline-none focus:ring-0">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center text-xs bg-indigo-500 text-white pr-2 rounded"
          >
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="px-1 py-[4px] flex justify-center text-center border-r border-gray-300 text-white hover:text-gray-200"
            >
              ×
            </button>
            <span className="text-sm px-1">{tag}</span>
          </div>
        ))}
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          className="flex-1 min-w-[150px] bg-transparent focus:outline-none"
        />
      </div>

      {isDropdownOpen && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow max-h-48 overflow-y-auto">
          {filteredSuggestions.map((option, index) => {
            const isSelected = tags.includes(option.value);
            return (
              <li
                key={index}
                className={`px-3 py-2 cursor-pointer flex justify-between items-center hover:bg-indigo-100 text-sm ${
                  isSelected ? "bg-indigo-50" : ""
                }`}
                onClick={() => toggleTag(option.value)}
              >
                <span>{option.label ? option.label : "No suggestion"}</span>
                {/* {isSelected && (
                  <span className="text-indigo-500 text-xs">✓ Selected</span>
                )} */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TagsInput;
