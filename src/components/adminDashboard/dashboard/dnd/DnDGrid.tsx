"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { createSwapy, SwapEvent } from "swapy";
import MetricCard from "./MetricCard";
import { FiGrid } from "react-icons/fi";
import CustomizationPanel from "./CustomizationPanel";

export type MetricKey = keyof typeof METRICS;
export type SlotLayout = Record<string, MetricKey>;

export const DEFAULT_LAYOUT: SlotLayout = {
  "1": "cpc",
  "2": "payout",
  "3": "margin",
  "4": "profit",
  "5": "conversions",
  "6": "uniqueClicks",
  "7": "invalidClicks",
  "8": "revenue",
  "9": "grossClick",
  "10": "epc",
  "11": "clicks",
  "12": "impressions",
};

export const METRICS = {
  cpc: { id: "cpc", title: "CPC", unit: "$", isMoney: true },
  payout: { id: "payout", title: "Payout", unit: "$", isMoney: true },
  margin: { id: "margin", title: "Margin", unit: "%", isMoney: false },
  profit: { id: "profit", title: "Profit", unit: "$", isMoney: true },
  conversions: {
    id: "conversions",
    title: "Conversions",
    unit: "",
    isMoney: false,
  },
  uniqueClicks: {
    id: "uniqueClicks",
    title: "Unique Clicks",
    unit: "",
    isMoney: false,
  },
  invalidClicks: {
    id: "invalidClicks",
    title: "Invalid Clicks",
    unit: "",
    isMoney: false,
  },
  revenue: { id: "revenue", title: "Revenue", unit: "$", isMoney: true },
  grossClick: {
    id: "grossClick",
    title: "Gross Click",
    unit: "",
    isMoney: false,
  },
  epc: { id: "epc", title: "EPC", unit: "$", isMoney: true },
  clicks: { id: "clicks", title: "Clicks", unit: "", isMoney: false },
  impressions: {
    id: "impressions",
    title: "Impressions",
    unit: "",
    isMoney: false,
  },
} as const;

const loadLayout = (): SlotLayout => {
  try {
    const saved = localStorage.getItem("metricOrder");
    return saved ? JSON.parse(saved) : DEFAULT_LAYOUT;
  } catch (error) {
    console.error("Error loading layout:", error);
    return DEFAULT_LAYOUT;
  }
};

const saveLayout = (layout: SlotLayout) => {
  try {
    localStorage.setItem("metricOrder", JSON.stringify(layout));
  } catch (error) {
    console.error("Error saving layout:", error);
  }
};

export default function DnDGrid() {
  const [slotItems, setSlotItems] = useState<SlotLayout>(loadLayout);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => saveLayout(slotItems), [slotItems]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const metricCards = useMemo(
    () =>
      Object.entries(slotItems).map(([slot, metricKey]) => {
        const metric = METRICS[metricKey];
        return (
          <div key={slot} data-swapy-slot={slot}>
            <div data-swapy-item={metric.id}>
              <MetricCard {...metric} />
            </div>
          </div>
        );
      }),
    [slotItems]
  );

  const handleSwap = useCallback((event: SwapEvent) => {
    const updatedLayout = (event as unknown as { newState: SlotLayout })
      .newState;
    if (updatedLayout) {
      setSlotItems(updatedLayout);
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".dnd-container");
    if (!(container instanceof HTMLElement)) return;

    const swapy = createSwapy(container);
    swapy.onSwap(handleSwap);
    return () => swapy.destroy();
  }, [handleSwap]);

  return (
    <div className="relative min-h-screen">
      <div className="p-4 z-20">
        <button
          ref={buttonRef}
          onClick={() => setIsPanelOpen(true)}
          className="float-end p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label="Open customization panel"
        >
          <FiGrid className="w-4 h-4 text-blue-950" />
        </button>
        <div className="absolute right-0 mr-5 mt-8">
          <CustomizationPanel
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            metrics={Object.values(METRICS).map((metric) => ({ ...metric }))}
            slotItems={slotItems}
            setSlotItems={setSlotItems}
            defaultLayout={DEFAULT_LAYOUT} // Ensure this matches the updated prop type
            anchorRef={buttonRef as React.RefObject<HTMLElement>}
          />
        </div>
      </div>

      <div className="mt-5 p-4">
        <div className="dnd-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards}
        </div>
      </div>
    </div>
  );
}
