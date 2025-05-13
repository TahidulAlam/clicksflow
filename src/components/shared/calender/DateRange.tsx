// import React from 'react'

// const DateRange = () => {
//   return (
//     <div>DateRange</div>
//   )
// }

// export default DateRange
// pages/DateRange.tsx

"use client";

import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";

const DateRange = () => {
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([new Date("2025-04-10"), new Date("2025-05-09")]);

  return (
    <div className="p-4">
      <label className="block mb-2 font-medium">Effective Between Date</label>
      <input
        type="text"
        readOnly
        value={
          selectedRange[0] && selectedRange[1]
            ? `${selectedRange[0].toLocaleDateString()} - ${selectedRange[1].toLocaleDateString()}`
            : ""
        }
        className="border px-3 py-2 rounded w-full mb-4"
      />
      <DateRangePicker
        value={selectedRange}
        onChange={setSelectedRange}
        onApply={(range) => console.log("Applied:", range)}
        onCancel={() => console.log("Cancelled")}
      />
    </div>
  );
};

export default DateRange;
