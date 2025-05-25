"use client";

import DataList from "@/components/shared/dataTable/DataList";

const trafficBlockingData = [
  {
    id: 1,
    partner: "Partner A",
    offer: "Offer X",
    sub1: "Value 1",
    sub2: "Value 2",
    sub3: "Value 3",
    sub4: "Value 4",
    sub5: "Value 5",
    sourceId: "SRC123",
    createdAt: "2025-05-10",
    lastModification: "2025-05-18",
    action: "Block",
  },
];

const trafficBlockingColumns = [
  {
    header: "ID",
    accessor: "id",
    searchable: false,
    fixed: "left",
    width: "60px",
  },
  {
    header: "Partner",
    accessor: "partner",
    searchable: true,
  },
  {
    header: "Offer",
    accessor: "offer",
    searchable: true,
  },
  {
    header: "Sub1",
    accessor: "sub1",
    searchable: true,
  },
  {
    header: "Sub2",
    accessor: "sub2",
    searchable: true,
  },
  {
    header: "Sub3",
    accessor: "sub3",
    searchable: true,
  },
  {
    header: "Sub4",
    accessor: "sub4",
    searchable: true,
  },
  {
    header: "Sub5",
    accessor: "sub5",
    searchable: true,
  },
  {
    header: "Source ID",
    accessor: "sourceId",
    searchable: true,
  },
  {
    header: "Created At",
    accessor: "createdAt",
    searchable: false,
  },
  {
    header: "Last Modification",
    accessor: "lastModification",
    searchable: false,
  },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const TrafficBlockingList = () => (
  <DataList
    data={trafficBlockingData}
    columns={trafficBlockingColumns}
    addButtonLabel="+ Add Traffic Block"
    onAddClick={() => console.log("Add traffic block")}
  />
);

export default TrafficBlockingList;
