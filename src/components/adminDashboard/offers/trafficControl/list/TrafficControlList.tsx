"use client";

import DataList from "@/components/shared/dataTable/DataList";

const trafficData = [
  {
    id: 1,
    name: "Control Rule 1",
    offers: "Offer A",
    partners: "Partner X",
    controlAction: "Pause",
    effectiveBetween: "2025-01-01 to 2025-01-31",
    createdAt: "2025-01-01",
    action: "Edit",
  },
];

const trafficColumns = [
  { header: "ID", accessor: "id", searchable: true },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offers", accessor: "offers", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Control Action", accessor: "controlAction", searchable: true },
  {
    header: "Effective Between",
    accessor: "effectiveBetween",
    searchable: false,
  },
  { header: "Created at", accessor: "createdAt", searchable: false },
  { header: "Action", accessor: "action", searchable: false },
];

const TrafficControlList = () => (
  <DataList
    // title="Traffic Controls"
    data={trafficData}
    columns={trafficColumns}
    addButtonLabel="+ Add Traffic Control"
    onAddClick={() => console.log("Add new rule")}
  />
);

export default TrafficControlList;
