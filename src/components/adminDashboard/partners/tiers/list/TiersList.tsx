"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

interface Offer {
  id: number;
  name: string;
  margin: string;
  labels: string[];
  status: string;
  action: string;
  [key: string]: unknown;
}

const data: Offer[] = [
  {
    id: 1,
    name: "Sample Offer A",
    margin: "20%",
    labels: ["Top", "Featured"],
    status: "Active",
    action: "View",
  },
  {
    id: 2,
    name: "Sample Offer B",
    margin: "15%",
    labels: ["Seasonal"],
    status: "Paused",
    action: "View",
  },
];

const columns = [
  {
    header: "ID",
    accessor: "id",
    sortable: true,
    searchable: true,
    width: "50px",
    fixed: "left",
  },
  {
    header: "Name",
    accessor: "name",
    sortable: true,
    searchable: true,
    width: "300px",
  },
  {
    header: "Margin",
    accessor: "margin",
    sortable: true,
    searchable: true,
  },
  {
    header: "Labels",
    accessor: "labels",
    sortable: false,
    searchable: true,
  },
  {
    header: "Status",
    accessor: "status",
    sortable: true,
    searchable: true,
  },
  {
    header: "Action",
    accessor: "action",
    sortable: false,
    width: "100px",
    fixed: "right",
  },
];

const TiersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    () =>
      columns.reduce((acc, col) => {
        acc[col.accessor] = true;
        return acc;
      }, {} as Record<string, boolean>)
  );

  const toggleColumnVisibility = (accessor: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [accessor]: !prev[accessor],
    }));
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((row) =>
      columns.some((col) => {
        if (!col.searchable) return false;
        const value = row[col.accessor as keyof Offer];
        if (Array.isArray(value)) {
          return value
            .join(", ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  const visibleCols = useMemo(
    () => columns.filter((col) => visibleColumns[col.accessor]),
    [visibleColumns]
  );

  const {
    formState: { isSubmitting, isLoading },
  } = useForm({
    defaultValues: {
      forceSSL: false,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <PrimaryBtn size="md">+ Add Offer</PrimaryBtn>
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

          <div className="relative" ref={dropdownRef}>
            <PrimaryBtn
              size="lg"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <BsThreeDotsVertical />
            </PrimaryBtn>

            {showDropdown && (
              <div className="absolute right-0 top-12 z-50 bg-white shadow-lg border rounded-md p-4 w-72 max-h-96 overflow-y-auto">
                <div>
                  <h4 className="font-semibold mb-3">Toggle Columns</h4>
                  <button
                    onClick={() =>
                      setVisibleColumns(
                        columns.reduce((acc, col) => {
                          acc[col.accessor] = true;
                          return acc;
                        }, {} as Record<string, boolean>)
                      )
                    }
                    className="text-sm font-medium text-blue-600 hover:underline self-start"
                  >
                    Restore All
                  </button>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {columns.map((col) => (
                    <div
                      key={col.accessor}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{col.header}</span>
                      <ToggleSwitch
                        size="sm"
                        checked={visibleColumns[col.accessor]}
                        onChange={() => toggleColumnVisibility(col.accessor)}
                        disabled={isSubmitting || isLoading}
                        aria-label={`Toggle ${col.header}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DataTable
        data={filteredData.map((offer) => ({
          ...offer,
          labels: Array.isArray(offer.labels)
            ? offer.labels.join(", ")
            : offer.labels,
        }))}
        columns={visibleCols}
        defaultSortField="name"
        defaultSortOrder="asc"
      />
    </div>
  );
};

export default TiersList;
