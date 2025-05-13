"use client";
import React from "react";
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search ID/Name",
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex py-2">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full max-w-md px-4 py-1 bg-[#F2F7FD] border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="py-1 rounded-r-lg bg-[#EBEFF5] border-r-2 border-t-2 border-b-2 border-gray-300 px-4">
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchBar;
