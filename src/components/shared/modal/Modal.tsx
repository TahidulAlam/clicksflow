"use client";

import React, { useEffect, useCallback, ReactNode, memo } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseIcon?: boolean;
}

// Static object for better memory allocation
const SIZE_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

// Memoize component to prevent unnecessary re-renders
const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseIcon = true,
}) => {
  // Stable event handler with proper cleanup
  const handleEsc = useCallback(
    (e: KeyboardEvent) => e.key === "Escape" && onClose(),
    [onClose]
  );

  // Efficient event listener management
  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, handleEsc]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 transition-opacity ${
        isOpen
          ? "opacity-100 duration-300 ease-out"
          : "opacity-0 duration-200 ease-in pointer-events-none"
      }`}
    >
      <div
        className={`w-full mx-4 ${SIZE_CLASSES[size]} transition-all ${
          isOpen
            ? "translate-y-0 duration-300 ease-out"
            : "-translate-y-10 duration-200 ease-in"
        }`}
      >
        <div className="relative bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseIcon && (
              <button
                onClick={onClose}
                type="button"
                className="text-white hover:bg-red-600 transition-colors text-2xl w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
          <div className="p-4 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const Modal = memo(ModalComponent);
