/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";

"use client";

import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";
import DataList from "@/components/shared/dataTable/DataList";

const InvoiceListData = [
  {
    id: 1,
    invoiceId: "INV-001",
    partner: "Partner A",
    status: "Pending",
    visibility: "Private",
    paymentTerms: "Net 30",
    paymentMethod: "Bank Transfer",
    isPayable: true,
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    amount: "$1,200.00",
    publicNotes: "Expected to clear within 30 days",
    internalNotes: "Partner has good history",
    dateCreated: "2025-05-01",
    lastModified: "2025-05-20",
    action: "Review",
  },
];

const adjustmentColumns = [
  {
    header: "Invoice ID",
    accessor: "invoiceId",
    searchable: true,
    fixed: "left",
  },
  {
    header: "Partner",
    accessor: "partner",
    searchable: true,
  },
  {
    header: "Status",
    accessor: "status",
    searchable: true,
  },
  {
    header: "Visibility",
    accessor: "visibility",
    searchable: true,
  },
  {
    header: "Payment Terms",
    accessor: "paymentTerms",
    searchable: true,
  },
  {
    header: "Payment Method",
    accessor: "paymentMethod",
    searchable: true,
  },
  {
    header: "Is Payable",
    accessor: "isPayable",
    searchable: false,
    cell: (row: any) => (row.isPayable ? "Yes" : "No"),
  },
  {
    header: "Start Date",
    accessor: "startDate",
    searchable: false,
  },
  {
    header: "End Date",
    accessor: "endDate",
    searchable: false,
  },
  {
    header: "Amount",
    accessor: "amount",
    searchable: false,
  },
  {
    header: "Public Notes",
    accessor: "publicNotes",
    searchable: true,
    width: "200px",
  },
  {
    header: "Internal Notes",
    accessor: "internalNotes",
    searchable: true,
  },
  {
    header: "Date Created",
    accessor: "dateCreated",
    searchable: false,
  },
  {
    header: "Last Modification",
    accessor: "lastModified",
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

const InvoiceList = () => {
  return (
    <>
      <BoxAccordion>
        <BoxHeader controlToggle={false}>
          <h2 className="text-lg font-semibold">Invoice List</h2>
        </BoxHeader>
        <BoxContent>
          <p className="text-sm text-gray-600">
            This section contains additional information about the invoice.
          </p>
        </BoxContent>
      </BoxAccordion>
      <DataList
        data={InvoiceListData}
        columns={adjustmentColumns}
        addButtonLabel="+ Add Adjustment"
        onAddClick={() => console.log("Add adjustment")}
      />
    </>
  );
};
export default InvoiceList;
