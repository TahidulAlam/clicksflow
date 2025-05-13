"use client";
import React, { useMemo, useState, JSX } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEllipsisV } from "react-icons/fa";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => string | number | JSX.Element);
  searchable?: boolean;
  sticky?: boolean;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  defaultSortField?: keyof T;
  defaultSortOrder?: "asc" | "desc";
}

const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  defaultSortField,
  defaultSortOrder = "asc",
}: DataTableProps<T>) => {
  const [sortField, setSortField] = useState<keyof T | string | undefined>(
    defaultSortField
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSortOrder);

  const handleSort = (field: keyof T | string) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    const result = [...data];

    if (sortField) {
      result.sort((a, b) => {
        const col = columns.find((c) =>
          typeof c.accessor === "function"
            ? c.header === sortField
            : c.accessor === sortField
        );

        const getValue = (row: T) =>
          typeof col?.accessor === "function"
            ? col.accessor(row)
            : row[sortField as keyof T];

        const aValue = getValue(a);
        const bValue = getValue(b);

        if (aValue == null || bValue == null) return 0;

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });
    }

    return result;
  }, [data, columns, sortField, sortOrder]);

  return (
    <div className="w-full text-xs font-medium">
      <div className="overflow-x-auto max-h-[500px] border border-gray-300 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {columns.map((col, idx) => {
                const columnKey =
                  typeof col.accessor === "function"
                    ? col.header
                    : (col.accessor as string);
                const isSorted = sortField === columnKey;

                return (
                  <th
                    key={idx}
                    onClick={() => handleSort(columnKey)}
                    className={`px-4 py-5 text-left text-xs font-semibold text-gray-600 whitespace-nowrap tracking-wider cursor-pointer ${
                      col.sticky ? "sticky left-0 bg-gray-100 z-[1000]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.header}
                      {isSorted ? (
                        sortOrder === "asc" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort className="text-gray-400" />
                      )}
                    </div>
                  </th>
                );
              })}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky right-0 z-[1000] bg-gray-100">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              sortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => {
                    const value =
                      typeof col.accessor === "function"
                        ? col.accessor(row)
                        : row[col.accessor];

                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-3 whitespace-nowrap text-center text-gray-900 ${
                          col.sticky ? "sticky left-0 bg-white" : ""
                        }`}
                      >
                        {typeof value === "string" || typeof value === "number"
                          ? value
                          : (value as React.ReactNode) ?? "-"}
                      </td>
                    );
                  })}
                  <td className="sticky px-4 py-3 text-gray-500">
                    <FaEllipsisV className="cursor-pointer" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DataTable;
