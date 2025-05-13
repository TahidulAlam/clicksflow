"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";

const conversionData = [
  {
    id: 1,
    partner: "John Doe",
    offer: "Offer A",
    level: "Level 1",
    method: "GET",
    postbackURL: "https://example.com/postback",
    htmlCode: "<script>console.log('pixel');</script>",
    descriptions: "Sample pixel for tracking conversions",
    created: "2025-04-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const conversionColumns = [
  { header: "Pixel ID", accessor: "id", searchable: true },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Level", accessor: "level", searchable: true },
  { header: "Method", accessor: "method", searchable: true },
  { header: "Postback URL", accessor: "postbackURL", searchable: false },
  { header: "HTML Code", accessor: "htmlCode", searchable: false },
  { header: "Descriptions", accessor: "descriptions", searchable: false },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    render: () => (
      <button className="text-blue-600 hover:underline">Edit</button>
    ),
  },
];

const Conversion = () => {
  return (
    <DataList
      data={conversionData}
      columns={conversionColumns}
      addButtonLabel="+ Add Pixel"
      onAddClick={() => console.log("Add Pixel")}
    />
  );
};

export default Conversion;
