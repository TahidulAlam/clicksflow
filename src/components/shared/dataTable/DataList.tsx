// "use client";
// import React, { useMemo, useRef, useState } from "react";
// import { FaFilter } from "react-icons/fa";
// // import { BsThreeDotsVertical } from "react-icons/bs";
// import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
// import DataTable from "@/components/shared/dataTable/DataTable";
// import SearchBar from "@/components/shared/dataTable/SearchBar";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
// import MultiLevelDropdown from "../dropdown/MultiLevelDropdown";

// interface Column {
//   header: string;
//   accessor: string;
//   searchable?: boolean;
// }

// interface DataListProps {
//   title?: string;
//   data: Record<string, string | number | boolean | null>[];
//   columns: Column[];
//   addButtonLabel?: string;
//   onAddClick?: () => void;
// }

// const DataList: React.FC<DataListProps> = ({
//   title,
//   data,
//   columns,
//   addButtonLabel = "+ Add Item",
//   onAddClick,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
//     () =>
//       columns.reduce((acc, col) => {
//         acc[col.accessor] = true;
//         return acc;
//       }, {} as Record<string, boolean>)
//   );

//   // useEffect(() => {
//   //   const handleClickOutside = (e: MouseEvent) => {
//   //     if (
//   //       dropdownRef.current &&
//   //       !dropdownRef.current.contains(e.target as Node)
//   //     ) {
//   //       setShowDropdown(false);
//   //     }
//   //   };
//   //   document.addEventListener("mousedown", handleClickOutside);
//   //   return () => document.removeEventListener("mousedown", handleClickOutside);
//   // }, []);

//   const toggleColumnVisibility = (accessor: string) => {
//     setVisibleColumns((prev) => ({
//       ...prev,
//       [accessor]: !prev[accessor],
//     }));
//   };

//   const restoreAllColumns = () => {
//     setVisibleColumns(
//       columns.reduce((acc, col) => {
//         acc[col.accessor] = true;
//         return acc;
//       }, {} as Record<string, boolean>)
//     );
//   };

//   const filteredData = useMemo(() => {
//     if (!searchTerm.trim()) return data;
//     return data.filter((row) =>
//       columns.some((col) => {
//         if (!col.searchable) return false;
//         const value = row[col.accessor];
//         return String(value).toLowerCase().includes(searchTerm.toLowerCase());
//       })
//     );
//   }, [searchTerm, data, columns]);

//   const visibleCols = useMemo(() => {
//     return columns.filter((col) => visibleColumns[col.accessor]);
//   }, [visibleColumns, columns]);

//   return (
//     <div>
//       {/* Optional Title */}
//       {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

//       {/* Top Toolbar */}
//       <div className="flex justify-between items-center mb-4 mt-4">
//         <div className="flex gap-2">
//           <PrimaryBtn size="md" onClick={onAddClick}>
//             {addButtonLabel}
//           </PrimaryBtn>
//           <PrimaryBtn size="md">Active</PrimaryBtn>
//         </div>

//         <div className="flex items-center gap-2 relative">
//           <SearchBar
//             value={searchTerm}
//             onChange={setSearchTerm}
//             placeholder="Search..."
//           />

//           <PrimaryBtn size="lg">
//             <FaFilter />
//           </PrimaryBtn>

//           {/* Column Toggle Dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             {/* <PrimaryBtn
//               size="lg"
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               <BsThreeDotsVertical />
//             </PrimaryBtn> */}

//             {/* {showDropdown && (
//               <div className="absolute right-0 top-12 z-50 bg-white border rounded-md shadow-lg p-4 w-72 max-h-96 overflow-y-auto">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-semibold">Toggle Columns</h4>
//                   <button
//                     className="text-sm text-blue-600 hover:underline"
//                     onClick={restoreAllColumns}
//                   >
//                     Restore to Default
//                   </button>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   {columns.map(({ accessor, header }) => (
//                     <div
//                       key={accessor}
//                       className="flex justify-between items-center text-sm"
//                     >
//                       <span>{header}</span>
//                       <ToggleSwitch
//                         size="sm"
//                         checked={visibleColumns[accessor]}
//                         onChange={() => toggleColumnVisibility(accessor)}
//                         aria-label={`Toggle ${header}`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )} */}
//             <MultiLevelDropdown
//               label=":"
//               position="bottom-right"
//               submenuPosition="left"
//               menuItems={[
//                 {
//                   labelHeader: "Table Actions",
//                   label: "Columns Customization",
//                   children: [
//                     {
//                       // label: "Subitem 1-1",
//                       content: (
//                         <>
//                           <div className="z-50 bg-white w-72 px-2 py-4">
//                             <div className="flex justify-between items-center mb-2">
//                               <h4 className="font-semibold">Toggle Columns</h4>
//                               <button
//                                 className="text-sm text-blue-600 hover:underline"
//                                 onClick={restoreAllColumns}
//                               >
//                                 Restore to Default
//                               </button>
//                             </div>

//                             <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
//                               {columns.map(({ accessor, header }) => (
//                                 <div
//                                   key={accessor}
//                                   className="flex justify-between items-center text-sm"
//                                 >
//                                   <span>{header}</span>
//                                   <ToggleSwitch
//                                     size="sm"
//                                     checked={visibleColumns[accessor]}
//                                     onChange={() =>
//                                       toggleColumnVisibility(accessor)
//                                     }
//                                     aria-label={`Toggle ${header}`}
//                                   />
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </>
//                       ),
//                     },
//                   ],
//                 },
//                 // {
//                 //   label: "Item 2",
//                 //   href: "/item-2",
//                 //   children: [
//                 //     {
//                 //       label: "Subitem 1-1",
//                 //       children: [{ label: "Subitem 1-1-1" }],
//                 //     },
//                 //   ],
//                 // },
//               ]}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Data Table */}
//       <DataTable
//         data={filteredData}
//         columns={visibleCols}
//         defaultSortField="name"
//         defaultSortOrder="asc"
//       />
//     </div>
//   );
// };

// export default DataList;

"use client";
import React, { useMemo, useState } from "react";
// import { FaFilter } from "react-icons/fa";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import DataTable from "@/components/shared/dataTable/DataTable";
import SearchBar from "@/components/shared/dataTable/SearchBar";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import MultiLevelDropdown from "../dropdown/MultiLevelDropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Column {
  header: string;
  accessor: string;
  searchable?: boolean;
}

interface DataListProps {
  title?: string;
  data: Record<string, string | number | boolean | null>[];
  columns: Column[];
  addButtonLabel?: string;
  addDataButtonLabel?: string;
  onAddClick?: () => void;
  onDataClick?: () => void;
}

const DataList: React.FC<DataListProps> = ({
  title,
  data,
  columns,
  addButtonLabel = "+ Add Item",
  // addDataButtonLabel = "All",
  onAddClick,
  // onDataClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
        const value = row[col.accessor];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm, data, columns]);

  const visibleCols = useMemo(
    () => columns.filter((col) => visibleColumns[col.accessor]),
    [visibleColumns, columns]
  );
  const filteredColumn = Object.values(columns).filter((column) =>
    column.header.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      {/* Top Toolbar */}
      <div className="flex justify-between items-center mb-4 mt-4">
        <div className="flex gap-2">
          <PrimaryBtn size="md" onClick={onAddClick}>
            {addButtonLabel}
          </PrimaryBtn>
          {/* <PrimaryBtn size="md" onClick={onDataClick}>
            {addDataButtonLabel}
          </PrimaryBtn> */}
          <MultiLevelDropdown
            label="Unpaid"
            labelClass="text-sm"
            position="bottom-center"
            submenuPosition="left"
            menuItems={[
              {
                label: (
                  <>
                    <span>
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      All
                    </span>
                  </>
                ),
              },
              {
                label: (
                  <span>
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    Paid
                  </span>
                ),
              },
              {
                label: (
                  <span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    Unpaid
                  </span>
                ),
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-2 relative">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search..."
          />

          {/* <PrimaryBtn size="lg">
            <FaFilter />
          </PrimaryBtn> */}

          {/* Column Toggle Dropdown */}
          <MultiLevelDropdown
            label={<BsThreeDotsVertical />}
            position="bottom-right"
            submenuPosition="left"
            menuItems={[
              {
                labelHeader: "Table Actions",
                label: "Customize Columns",
                children: [
                  {
                    content: (
                      <div className="z-50 bg-white w-72 px-2 py-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">Toggle Columns</h4>
                          <button
                            className="text-sm text-blue-600 hover:underline"
                            onClick={restoreAllColumns}
                          >
                            Restore
                          </button>
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Search metrics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full mb-3 p-2 rounded-md text-sm focus:ring-0"
                          />
                        </div>
                        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                          {filteredColumn.map(({ accessor, header }) => (
                            <div
                              key={accessor}
                              className="flex justify-between items-center text-sm"
                            >
                              <span>{header}</span>
                              <ToggleSwitch
                                size="sm"
                                checked={visibleColumns[accessor]}
                                onChange={() =>
                                  toggleColumnVisibility(accessor)
                                }
                                aria-label={`Toggle ${header}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={visibleCols}
        defaultSortField="name"
        defaultSortOrder="asc"
      />
    </div>
  );
};

export default DataList;
