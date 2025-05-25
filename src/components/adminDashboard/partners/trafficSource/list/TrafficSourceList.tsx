"use client";

import React from "react";
import DataList from "@/components/shared/dataTable/DataList";

const data = [{}];

const columns = [
  {
    header: "ID",
    accessor: "id",
    width: "60px",
    fixed: "left",
  },
  {
    header: "Name",
    accessor: "name",
    width: "250px",
  },
  {
    header: "Postback URL",
    accessor: "postbackUrl",
    width: "400px",
  },
  {
    header: "Tracking Parameters",
    accessor: "trackingParameters",
    width: "300px",
  },
  {
    header: "Action",
    accessor: "action",
    width: "120px",
    fixed: "right",
  },
];

const TrafficSourceList = () => {
  return (
    <div>
      <DataList
        data={data}
        columns={columns}
        // emptyMessage="Data not found"
        addButtonLabel="+ Add Traffic Source"
        onAddClick={() => console.log("Add traffic source")}
      />
    </div>
  );
};

export default TrafficSourceList;
