"use client";

import {
  useRef,
  RefObject,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { FiChevronRight, FiRefreshCw } from "react-icons/fi";
import { MetricKey, DEFAULT_LAYOUT } from "./DnDGrid";

interface MetricType {
  id: MetricKey;
  title: string;
  unit: string;
  isMoney: boolean;
}

interface CustomizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: MetricType[];
  slotItems: Record<string, MetricKey>;
  setSlotItems: Dispatch<SetStateAction<Record<string, MetricKey>>>;
  defaultLayout: typeof DEFAULT_LAYOUT;
  anchorRef: RefObject<HTMLElement>;
}

export default function CustomizationDropdown({
  isOpen,
  onClose,
  metrics,
  slotItems,
  setSlotItems,
  defaultLayout,
  anchorRef,
}: CustomizationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleToggle = (metricKey: MetricKey) => {
    setSlotItems((prev) => {
      const isEnabled = Object.values(prev).includes(metricKey);
      const newLayout = { ...prev };

      if (isEnabled) {
        Object.keys(newLayout).forEach((slot) => {
          if (newLayout[slot] === metricKey) delete newLayout[slot];
        });
      } else {
        const defaultSlot = Object.entries(defaultLayout).find(
          ([, key]) => key === metricKey
        )?.[0];
        if (defaultSlot) newLayout[defaultSlot] = metricKey;
      }

      return newLayout;
    });
  };

  const filteredMetrics = Object.values(metrics).filter((metric) =>
    metric.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="relative mt-2 w-64 rounded-xl p-3 max-h-[80vh]  bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold">Dashboard Customization</h2>
      </div>

      {/* Matrix Section */}
      <div className="mb-4 relative group flex items-center">
        <div className="flex items-center p-1 hover:bg-gray-50 rounded-lg w-full text-left cursor-pointer">
          <FiChevronRight />
          <span className="ml-2 text-sm">Matrix</span>
        </div>
        {/* <button
          onClick={() => setSlotItems(DEFAULT_LAYOUT)}
          className="ml-auto p-2 hover:bg-gray-100 rounded-lg"
          title="Reset to Default"
        >
          <FiRefreshCw className="w-4 h-4" />
        </button> */}

        {/* Hover content (Matrix options) */}
        <div className="absolute right-full top-0 ml-2 hidden group-hover:block bg-white border rounded-lg shadow-lg w-80 p-3 z-99">
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
                    checked={Object.values(slotItems).includes(metric.id)}
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
      </div>

      {/* Card Section */}
      <div className="mb-2 relative group flex items-center">
        <div className="flex items-center p-1 hover:bg-gray-50 rounded-lg w-full text-left cursor-pointer">
          <FiChevronRight />
          <span className="ml-2 text-sm">Card</span>
        </div>

        {/* Hover content (Card options) */}
        <div className="absolute right-full top-0 ml-2 hidden group-hover:block bg-white border rounded-lg shadow-lg w-64 p-3 z-10 text-sm text-gray-500">
          Card customization options (to be implemented)
        </div>
      </div>
    </div>
  );
}
