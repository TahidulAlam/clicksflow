"use client";

import DataList from "@/components/shared/dataTable/DataList";

const applicationData = [
  {
    id: 1,
    offer: "Offer X",
    partner: "Partner A",
    advertiser: "Advertiser Z",
    partnerManager: "Manager X",
    questionnaire: "Submitted",
    requestedAt: "2025-05-15",
    lastUpdate: "2025-05-17",
    action: "Review",
  },
];

const applicationColumns = [
  {
    header: "Offer",
    accessor: "offer",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Partner",
    accessor: "partner",
    searchable: true,
  },
  {
    header: "Advertiser",
    accessor: "advertiser",
    searchable: true,
  },
  {
    header: "Partner Manager",
    accessor: "partnerManager",
    searchable: true,
  },
  {
    header: "Questionnaire",
    accessor: "questionnaire",
    searchable: true,
  },
  {
    header: "Requested at",
    accessor: "requestedAt",
    searchable: false,
  },
  {
    header: "Last update",
    accessor: "lastUpdate",
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

const ApplicationList = () => (
  <DataList
    data={applicationData}
    columns={applicationColumns}
    addButtonLabel="+ Add Application"
    onAddClick={() => console.log("Add application")}
  />
);

export default ApplicationList;
