// "use client";
// import React, { useMemo, useRef, useState, useEffect } from "react";
// import { FaFilter } from "react-icons/fa";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
// import DataTable from "@/components/shared/dataTable/DataTable";
// import SearchBar from "@/components/shared/dataTable/SearchBar";
// import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";

// interface Offer extends Record<string, unknown> {
//   id: number;
//   name: string;
//   type: string;
//   isPrivate: boolean;
//   preview: string;
//   download: string;
//   dateCreated: string;
//   dateModified: string;
//   action: string;
// }

// const data: Offer[] = [
//   {
//     id: 1,
//     name: "Creative 1",
//     type: "Banner",
//     isPrivate: false,
//     preview: "Preview Link",
//     download: "Download Link",
//     dateCreated: "2025-01-01",
//     dateModified: "2025-01-10",
//     action: "Edit",
//   },
//   // Add more data here
// ];

// const columns = [
//   { header: "ID", accessor: "id", searchable: true },
//   { header: "Name", accessor: "name", searchable: true },
//   { header: "Type", accessor: "type", searchable: true },
//   { header: "Is Private", accessor: "isPrivate", searchable: false },
//   { header: "Preview", accessor: "preview", searchable: false },
//   { header: "Download", accessor: "download", searchable: false },
//   { header: "Date Created", accessor: "dateCreated", searchable: false },
//   { header: "Date Modified", accessor: "dateModified", searchable: false },
//   { header: "Action", accessor: "action", searchable: false },
// ];

// const CreativesList = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
//     () =>
//       columns.reduce((acc, col) => {
//         acc[col.accessor] = true;
//         return acc;
//       }, {} as Record<string, boolean>)
//   );

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

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
//         const value = row[col.accessor as keyof Offer];
//         return String(value).toLowerCase().includes(searchTerm.toLowerCase());
//       })
//     );
//   }, [searchTerm]);

//   const visibleCols = useMemo(() => {
//     return columns.filter((col) => visibleColumns[col.accessor]);
//   }, [visibleColumns]);

//   return (
//     <div>
//       {/* Top Toolbar */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex gap-2">
//           <PrimaryBtn size="md">+ Add Creative</PrimaryBtn>
//           <PrimaryBtn size="md">Active</PrimaryBtn>
//         </div>

//         <div className="flex items-center gap-2 relative">
//           <SearchBar
//             value={searchTerm}
//             onChange={setSearchTerm}
//             placeholder="Search creatives..."
//           />

//           <PrimaryBtn size="lg">
//             <FaFilter />
//           </PrimaryBtn>

//           {/* Column Toggle Dropdown */}
//           <div className="relative" ref={dropdownRef}>
//             <PrimaryBtn
//               size="lg"
//               onClick={() => setShowDropdown(!showDropdown)}
//             >
//               <BsThreeDotsVertical />
//             </PrimaryBtn>

//             {showDropdown && (
//               <div className="absolute right-0 top-12 z-50 bg-white border rounded-md shadow-lg p-4 w-72 max-h-96 overflow-y-auto">
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-semibold">Toggle Columns</h4>
//                   <button
//                     className="text-sm text-blue-600 hover:underline"
//                     onClick={restoreAllColumns}
//                   >
//                     Restore All
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
//             )}
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

// export default CreativesList;

"use client";

import DataList from "@/components/shared/dataTable/DataList";

const data = [
  {
    id: 1,
    name: "Creative 1",
    type: "Banner",
    isPrivate: false,
    preview: "Preview Link",
    download: "Download Link",
    dateCreated: "2025-01-01",
    dateModified: "2025-01-10",
    action: "Edit",
  },
];
const columns = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Type", accessor: "type", searchable: true },
  { header: "Is Private", accessor: "isPrivate", searchable: false },
  { header: "Preview", accessor: "preview", searchable: false },
  { header: "Download", accessor: "download", searchable: false },
  { header: "Date Created", accessor: "dateCreated", searchable: false },
  { header: "Date Modified", accessor: "dateModified", searchable: false },
  { header: "Action", accessor: "action", searchable: false },
];

const CreativesList = () => (
  <DataList
    // title="Traffic Controls"
    data={data}
    columns={columns}
    addButtonLabel="+ Add Traffic Control"
    onAddClick={() => console.log("Add new rule")}
  />
);

export default CreativesList;
