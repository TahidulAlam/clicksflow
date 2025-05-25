"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import DataList from "@/components/shared/dataTable/DataList";
import AdjustmentModal, {
  AdjustmentFormData,
  adjustmentSchema as formSchema,
} from "./AdjustmentModal";

const adjustmentData = [
  {
    id: 1,
    date: "2025-05-01",
    partner: "Partner A",
    offer: "Offer X",
    advertiser: "Advertiser Z",
    totalClicks: 1200,
    uniqueClicks: 1100,
    conversions: 50,
    payout: "$500",
    revenue: "$750",
    grossSale: "$2000",
    note: "Adjustment for April",
    created: "2025-05-02",
    modified: "2025-05-18",
    lastModifiedBy: "AdminUser",
    action: "Edit",
  },
];

const adjustmentColumns = [
  { header: "Date", accessor: "date", searchable: false, fixed: "left" },
  { header: "Partner", accessor: "partner", searchable: true },
  { header: "Offer", accessor: "offer", searchable: true, fixed: "left" },
  { header: "Advertiser", accessor: "advertiser", searchable: true },
  { header: "Total Clicks", accessor: "totalClicks", searchable: false },
  { header: "Unique Clicks", accessor: "uniqueClicks", searchable: false },
  { header: "Conversions", accessor: "conversions", searchable: false },
  { header: "Payout", accessor: "payout", searchable: false },
  { header: "Revenue", accessor: "revenue", searchable: false },
  { header: "Gross Sale", accessor: "grossSale", searchable: false },
  { header: "Note", accessor: "note", searchable: true },
  { header: "Created", accessor: "created", searchable: false },
  { header: "Modified", accessor: "modified", searchable: false },
  { header: "Last modified By", accessor: "lastModifiedBy", searchable: true },
  {
    header: "Action",
    accessor: "action",
    searchable: false,
    fixed: "right",
    width: "100px",
  },
];

const AdjustmentList = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<AdjustmentFormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddOrEditEvent = async (event: AdjustmentFormData) => {
    try {
      const validatedEvent = formSchema.parse(event);
      setIsLoading(true);
      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((e, idx) => (idx === editingIndex ? validatedEvent : e))
        );
        toast.success("Event updated successfully!");
      } else {
        setEvents((prev) => [...prev, validatedEvent]);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Event validation failed:", error);
      toast.error("Invalid event data.");
    } finally {
      setIsLoading(false);
      setIsEventModalOpen(false);
      setEditingIndex(null);
    }
  };

  return (
    <>
      <DataList
        data={adjustmentData}
        columns={adjustmentColumns}
        addButtonLabel="+ Add Adjustment"
        onAddClick={() => setIsEventModalOpen(true)}
      />

      <AdjustmentModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        title="Add Adjustment"
        onSubmit={handleAddOrEditEvent}
        defaultValues={editingIndex !== null ? events[editingIndex] : undefined}
        isSubmittingForm={isLoading}
      />
    </>
  );
};

export default AdjustmentList;
