"use client";

import DataList from "@/components/shared/dataTable/DataList";

const creativeData = [
  {
    id: 1,
    name: "Creative Asset 1",
    offers: "Offer A",
    partners: "Partner X",
    creative: "Banner_728x90.jpg",
    preview: "https://example.com/preview/banner_728x90.jpg",
    download: "https://example.com/download/banner_728x90.jpg",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const creativeColumns = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Creative", accessor: "creative", searchable: true },
  {
    header: "Preview",
    accessor: "preview",
    searchable: false,
    render: (row: { preview: string }) => (
      <a
        href={row.preview}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Preview
      </a>
    ),
  },
  {
    header: "Download",
    accessor: "download",
    searchable: false,
    render: (row: { download: string }) => (
      <a
        href={row.download}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Download
      </a>
    ),
  },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  { header: "Action", accessor: "action", searchable: false },
];

const Creative = () => (
  <DataList
    data={creativeData}
    columns={creativeColumns}
    addButtonLabel="+ Add Creative"
    onAddClick={() => console.log("Add creative")}
  />
);

export default Creative;
