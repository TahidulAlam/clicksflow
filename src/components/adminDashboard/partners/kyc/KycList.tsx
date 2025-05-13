"use client";

import DataList from "@/components/shared/dataTable/DataList";

const kycData = [
  {
    id: 1,
    name: "John Doe",
    accountManager: "Manager X",
    salesExecutive: "Executive Y",
    registeredAt: "2025-04-01",
    modifiedAt: "2025-05-01",
    download: "Download",
    action: "Edit",
  },
];

const kycColumns = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Account Manager", accessor: "accountManager", searchable: true },
  { header: "Sales Executive", accessor: "salesExecutive", searchable: true },
  { header: "Registered at", accessor: "registeredAt", searchable: false },
  { header: "Modified at", accessor: "modifiedAt", searchable: false },
  {
    header: "Download",
    accessor: "download",
    searchable: false,
    render: () => (
      <button className="text-blue-600 hover:underline">Download</button>
    ),
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    render: () => (
      <button className="text-blue-600 hover:underline">Edit</button>
    ),
  },
];

const KycList = () => (
  <DataList
    data={kycData}
    columns={kycColumns}
    // addButtonLabel="+ Add KYC"
    onAddClick={() => console.log("Add KYC")}
  />
);

export default KycList;
