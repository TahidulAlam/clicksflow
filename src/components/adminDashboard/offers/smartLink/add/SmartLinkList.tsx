"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

interface Offer extends Record<string, unknown> {
  id: number;
  name: string;
  encodedValue: string;
  offers: number;
  catchAllOffer: boolean;
  showToPartners: boolean;
  todaysRevenue: number;
  todaysPayout: number;
  action: string;
}

const data: Offer[] = [
  {
    id: 1,
    name: "Offer A",
    encodedValue: "offer-a-encoded",
    offers: 5,
    catchAllOffer: true,
    showToPartners: true,
    todaysRevenue: 150,
    todaysPayout: 75,
    action: "View",
  },
];

const columns = [
  { header: "ID", accessor: "id", sortable: true, searchable: true },
  { header: "Name", accessor: "name", sortable: true, searchable: true },
  {
    header: "Encoded Value",
    accessor: "encodedValue",
    sortable: true,
    searchable: true,
  },
  { header: "Offers", accessor: "offers", sortable: true },
  { header: "Catch all offer", accessor: "catchAllOffer", sortable: true },
  { header: "Show to partners", accessor: "showToPartners", sortable: true },
  { header: "Todays Revenue", accessor: "todaysRevenue", sortable: true },
  { header: "Todays Payout", accessor: "todaysPayout", sortable: true },
  { header: "Action", accessor: "action", sortable: false },
];

const SmartLinkList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () =>
      columns.reduce((acc, col) => {
        acc[col.accessor] = true;
        return acc;
      }, {} as Record<string, boolean>)
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleColumnVisibility = (accessor: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor]: !prev[accessor],
    }));
  };

  const restoreAllColumns = () => {
    setVisibleColumns(
      columns.reduce((acc, col) => {
        acc[col.accessor] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.accessor as keyof Offer];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  const visibleCols = useMemo(() => {
    return columns.filter((col) => visibleColumns[col.accessor]);
  }, [visibleColumns]);

  const {
    formState: { isSubmitting, isLoading },
  } = useForm();

  return (
    <div>
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <PrimaryBtn size="md">+ Add Offer</PrimaryBtn>
          <PrimaryBtn size="md">Active</PrimaryBtn>
        </div>

        <div className="flex items-center gap-2 relative">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search offers..."
          />

          <PrimaryBtn size="lg">
            <FaFilter />
          </PrimaryBtn>

          {/* Column Toggle Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <PrimaryBtn
              size="lg"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsThreeDotsVertical />
            </PrimaryBtn>

            {showDropdown && (
              <div className="absolute right-0 top-12 z-50 bg-white border rounded-md shadow-lg p-4 w-72 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Toggle Columns</h4>
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={restoreAllColumns}
                  >
                    Restore All
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {columns.map(({ accessor, header }) => (
                    <div
                      key={accessor}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{header}</span>
                      <ToggleSwitch
                        size="sm"
                        checked={visibleColumns[accessor]}
                        onChange={() => toggleColumnVisibility(accessor)}
                        disabled={isSubmitting || isLoading}
                        aria-label={`Toggle ${header}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredData}
        columns={visibleCols}
        defaultSortField="name"
        defaultSortOrder="asc"
      />
    </div>
  );
};

export default SmartLinkList;
