"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { createSwapy, SwapEvent } from "swapy";
import { FiGrid, FiRefreshCw } from "react-icons/fi";
import MetricCard from "./MetricCard";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";

export type MetricKey = keyof typeof METRICS;
export type SlotLayout = Record<string, MetricKey>;

const DEFAULT_LAYOUT: SlotLayout = {
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

const METRICS = {
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
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => saveLayout(slotItems), [slotItems]);

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

  const handleToggle = (metricKey: MetricKey) => {
    setSlotItems((prev) => {
      const isEnabled = Object.values(prev).includes(metricKey);
      const newLayout = { ...prev };

      if (isEnabled) {
        Object.keys(newLayout).forEach((slot) => {
          if (newLayout[slot] === metricKey) delete newLayout[slot];
        });
      } else {
        const defaultSlot = Object.entries(DEFAULT_LAYOUT).find(
          ([, key]) => key === metricKey
        )?.[0];
        if (defaultSlot) newLayout[defaultSlot] = metricKey;
      }

      return newLayout;
    });
  };

  const filteredMetrics = Object.values(METRICS).filter((metric) =>
    metric.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="z-20 flex justify-end">
        <MultiLevelDropdown
          label={<FiGrid className="w-4 h-4 text-blue-950" />}
          position="bottom-right"
          submenuPosition="left"
          menuItems={[
            {
              labelHeader: "Dashboard Customization",
              label: "Matrix",
              children: [
                {
                  content: (
                    <div className=" w-80 p-3 z-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="ml-2 font-medium">Matrix</span>
                        <button
                          onClick={() => setSlotItems(DEFAULT_LAYOUT)}
                          className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
                          title="Reset to Default"
                        >
                          <FiRefreshCw className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Search metrics..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full mb-3 p-2 border rounded-md text-sm"
                      />
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {filteredMetrics.map((metric) => (
                          <div
                            key={metric.id}
                            className="flex items-center justify-between p-1 bg-gray-50 rounded-md hover:bg-gray-100"
                          >
                            <span className="text-sm">{metric.title}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={Object.values(slotItems).includes(
                                  metric.id
                                )}
                                onChange={() => handleToggle(metric.id)}
                                className="sr-only"
                              />
                              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative">
                                <div
                                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                                    Object.values(slotItems).includes(metric.id)
                                      ? "translate-x-5 bg-blue-950"
                                      : ""
                                  }`}
                                />
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ],
            },
            {
              label: "Card",
              children: [{}],
            },
          ]}
        />
      </div>

      <div className="mt-5">
        <div className="dnd-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards}
        </div>
      </div>
    </div>
  );
}
