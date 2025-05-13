"use client";

import DataList from "@/components/shared/dataTable/DataList";

const payoutDestinationData = [
  {
    id: 1,
    name: "Redirect Rule 1",
    offers: "Offer A",
    partners: "Partner X",
    destinationUrl: "https://example.com/redirect",
    effectiveBetween: "2025-01-01 to 2025-12-31",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutDestinationColumns = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Destination URL", accessor: "destinationUrl", searchable: true },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  { header: "Action", accessor: "action", searchable: false },
];

const LandingPage = () => (
  <DataList
    data={payoutDestinationData}
    columns={payoutDestinationColumns}
    addButtonLabel="+ Add Redirect Rule"
    onAddClick={() => console.log("Add redirect rule")}
  />
);

export default LandingPage;
