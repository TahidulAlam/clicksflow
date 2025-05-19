"use client";

import DataList from "@/components/shared/dataTable/DataList";

const payoutData = [
  {
    id: 1,
    name: "Revenue Campaign",
    offer: "Offer Z",
    partners: "Partner A",
    description: "Internal notes",
    publicDescription: "Visible to users",
    event: "Purchase",
    revenue: 200,
    payout: 120,
    firePostback: true,
    effectiveBetween: "2025-01-01 to 2025-12-31",
    created: "2025-01-01",
    modified: "2025-05-01",
    action: "Edit",
  },
];

const payoutColumns = [
  {
    header: "ID",
    accessor: "id",
    searchable: true,
    fixed: "left",
    width: "80px",
  },
  { header: "Name", accessor: "name", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true },
  { header: "Partners", accessor: "partners", searchable: true },
  { header: "Description", accessor: "description", searchable: true },
  {
    header: "Public Description",
    accessor: "publicDescription",
    searchable: true,
  },
  { header: "Event", accessor: "event", searchable: true },
  { header: "Revenue", accessor: "revenue", searchable: false },
  { header: "Payout", accessor: "payout", searchable: false },
  { header: "Fire Postback", accessor: "firePostback", searchable: false },
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

const PayoutRevenue = () => (
  <DataList
    data={payoutData}
    columns={payoutColumns}
    addButtonLabel="+ Add Payout Rule"
    onAddClick={() => console.log("Add payout rule")}
  />
);

export default PayoutRevenue;
