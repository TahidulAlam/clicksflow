"use client";

import DataList from "@/components/shared/dataTable/DataList";

const payoutThrottleData = [
  {
    id: 1,
    name: "Throttle Rule 1",
    offers: "Offer A",
    partners: "Partner X",
    conversionStatus: "Enabled",
    throttlePercentage: 30,
    effectiveBetween: "2025-01-01 to 2025-12-31",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutThrottleColumns = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  {
    header: "Conversion Status",
    accessor: "conversionStatus",
    searchable: true,
  },
  {
    header: "Throttle Percentage",
    accessor: "throttlePercentage",
    searchable: false,
  },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const ThrottleRates = () => (
  <DataList
    data={payoutThrottleData}
    columns={payoutThrottleColumns}
    addButtonLabel="+ Add Throttle Rule"
    onAddClick={() => console.log("Add throttle rule")}
  />
);

export default ThrottleRates;
