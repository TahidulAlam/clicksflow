"use client";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
  JSX,
} from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export interface Column<T> {
  header: string;
  accessor:
    | keyof T
    | ((row: T) => string | number | JSX.Element | React.ReactNode);
  fixed?: "left" | "right";
  stickyAfter?: number;
  width?: string;
  searchable?: boolean;
}

// Assuming you have this Column<T> type in your DataTable component:
// type Column<T> = {
//   header: string;
//   accessor:
//     | keyof T
//     | ((row: T) => string | number | React.ReactNode | JSX.Element);
//   sortable?: boolean;
//   searchable?: boolean;
//   stickyAfter?: number;
//   width?: string;
//   fixed?: "left" | "right";
// };

// Assuming you have this Column<T> type in your DataTable component:
// type Column<T> = {
//   header: string;
//   accessor: keyof T | ((row: T) => string | number | React.ReactNode);
//   stickyAfter?: number;
//   sortable?: boolean;
//   searchable?: boolean;
//   width?: string;
//   fixed?: "left" | "right";
// };

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  defaultSortField?: keyof T;
  defaultSortOrder?: "asc" | "desc";
}

const throttle = <F extends (...args: never[]) => void>(
  func: F,
  limit: number
): F => {
  let inThrottle = false;
  return ((...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as F;
};

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
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create column map for faster access
  const columnMap = useMemo(() => {
    const map = new Map<string | keyof T, Column<T>>();
    columns.forEach((col) => {
      const key =
        typeof col.accessor === "function" ? col.header : col.accessor;
      map.set(key, col);
    });
    return map;
  }, [columns]);

  // Handle scroll with throttling
  const handleScroll = useCallback(() => {
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const throttledScroll = throttle(handleScroll, 50);
    container.addEventListener("scroll", throttledScroll);
    return () => container.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Calculate sticky states
  const stickyStates = useMemo(
    () =>
      columns.map((col) => ({
        isSticky:
          Boolean(col.fixed) ||
          (col.stickyAfter !== undefined && scrollLeft >= col.stickyAfter),
        side: col.fixed || (col.stickyAfter !== undefined ? "left" : null),
      })),
    [columns, scrollLeft]
  );

  // Precompute column styles
  const [columnStyles, headerStyles] = useMemo(() => {
    let accumulatedLeft = 0;
    const leftOffsets = columns.map((col) => {
      const offset = accumulatedLeft;
      if (col.fixed === "left")
        accumulatedLeft += parseInt(col.width || "150", 10);
      return offset;
    });

    let accumulatedRight = 0;
    const rightOffsets = columns
      .slice()
      .reverse()
      .map((col) => {
        const offset = accumulatedRight;
        if (col.fixed === "right")
          accumulatedRight += parseInt(col.width || "150", 10);
        return offset;
      })
      .reverse();

    const columnStyles = columns.map((col, idx) => {
      const state = stickyStates[idx];
      const style: React.CSSProperties = {
        width: col.width || "150px",
        minWidth: col.width || "150px",
        maxWidth: col.width || "150px",
      };

      if (state.isSticky) {
        style.position = "sticky";
        style.zIndex = 10;
        style.backgroundColor = "#ffffff";
        style[state.side === "right" ? "right" : "left"] =
          state.side === "right" ? rightOffsets[idx] : leftOffsets[idx];
      }

      return style;
    });

    const headerStyles = columns.map((col, idx) => ({
      ...columnStyles[idx],
      zIndex: 30,
      backgroundColor: "#f3f4f6",
    }));

    return [columnStyles, headerStyles, leftOffsets, rightOffsets];
  }, [columns, stickyStates]);

  // Sorting logic
  const sortedData = useMemo(() => {
    if (!sortField) return data;
    const column = columnMap.get(sortField);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const getValue = (item: T) =>
        typeof column.accessor === "function"
          ? column.accessor(item)
          : item[column.accessor as keyof T];

      const aVal = getValue(a);
      const bVal = getValue(b);

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc"
        ? Number(aVal) - Number(bVal)
        : Number(bVal) - Number(aVal);
    });
  }, [data, sortField, sortOrder, columnMap]);

  // Sorting handler
  const handleSort = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const colKey = e.currentTarget.dataset.colkey;
    if (colKey) {
      setSortField((prev) => {
        if (prev === colKey)
          setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
        else setSortOrder("asc");
        return colKey;
      });
    }
  }, []);

  return (
    <div
      className="w-full text-xs font-medium overflow-x-auto"
      ref={containerRef}
    >
      <div className="border border-gray-300 rounded-md max-h-[500px] overflow-auto">
        <table className="table-auto min-w-full border-separate border-spacing-0">
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              {columns.map((col, idx) => {
                const colKey =
                  typeof col.accessor === "function"
                    ? col.header
                    : (col.accessor as string);
                const isSorted = sortField === colKey;

                return (
                  <th
                    key={idx}
                    data-colkey={colKey}
                    onClick={handleSort}
                    className="px-4 py-4 text-start font-semibold text-gray-600 tracking-wider cursor-pointer whitespace-nowrap"
                    style={headerStyles[idx]}
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
            </tr>
          </thead>
          <tbody className="bg-white text-start divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-start text-gray-500"
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
                        : row[col.accessor as keyof T];

                    return (
                      <td
                        key={colIndex}
                        className="px-4 py-3 text-start text-gray-900 whitespace-nowrap"
                        style={columnStyles[colIndex]}
                      >
                        {/* {value ?? "-"} */}
                        {typeof value === "string" ||
                        typeof value === "number" ||
                        React.isValidElement(value)
                          ? value
                          : "-"}
                      </td>
                    );
                  })}
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
