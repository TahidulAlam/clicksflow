/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */

"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
  Children,
  isValidElement,
  cloneElement,
  memo,
} from "react";

// Type definitions
type BoxHeaderProps = {
  children: ReactNode;
  onToggle?: () => void;
  isOpen?: boolean;
  id?: string;
  controlToggle?: boolean;
  className?: string;
};

type BoxContentProps = {
  children: ReactNode;
  isOpen?: boolean;
  id?: string;
  maxHeight?: string;
  controlToggle?: boolean;
  contentRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  contentClassName?: string;
};

type BoxAccordionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  onToggle?: (id: string) => void;
  defaultOpen?: boolean;
};

// Memoized components to prevent unnecessary re-renders
const BoxHeaderComponent = memo(
  ({
    children,
    onToggle = () => {},
    isOpen = false,
    id = "",
    controlToggle = false,
    className = "",
  }: BoxHeaderProps) => {
    return (
      <button
        id={`accordion-button-${id}`}
        onClick={() => {
          if (controlToggle) onToggle();
        }}
        className={`w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 rounded-t-xl focus:outline-none  focus:ring-0  transition-colors ${className}`}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        type="button"
        disabled={!controlToggle}
      >
        {children}
      </button>
    );
  }
);

const BoxContentComponent = memo(
  ({
    children,
    isOpen = false,
    id = "",
    maxHeight = "0",
    contentRef,
    className = "",
    contentClassName = "",
  }: BoxContentProps) => {
    return (
      <div
        id={`accordion-content-${id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
        style={{ maxHeight: isOpen ? maxHeight : "0" }}
        role="region"
        aria-labelledby={`accordion-button-${id}`}
      >
        <div
          ref={contentRef}
          className={`px-4 py-3 border-t border-gray-200 text-sm text-gray-700 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    );
  }
);

// Main BoxAccordion component
const BoxAccordion = ({
  children,
  className = "",
  id = "accordion-default",
  onToggle,
  defaultOpen = true,
}: BoxAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [maxHeight, setMaxHeight] = useState("none");
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Calculate max height when content changes or accordion opens/closes
  const updateMaxHeight = useCallback(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0");
    }
  }, [isOpen]);

  useEffect(() => {
    updateMaxHeight();
  }, [updateMaxHeight, children]); // Recalculate when children change

  // Setup and cleanup ResizeObserver
  useEffect(() => {
    if (!contentRef.current) return;

    resizeObserverRef.current = new ResizeObserver(updateMaxHeight);
    resizeObserverRef.current.observe(contentRef.current);

    return () => {
      if (resizeObserverRef.current && contentRef.current) {
        resizeObserverRef.current.unobserve(contentRef.current);
      }
    };
  }, [updateMaxHeight]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    onToggle?.(id);
  }, [id, onToggle]);

  // Memoize children rendering to prevent unnecessary re-renders
  const renderedChildren = React.useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      const childProps = {
        onToggle: handleToggle,
        isOpen,
        id,
        ...(child.type === BoxContentComponent || child.type === BoxContent
          ? { maxHeight, contentRef }
          : {}),
      };

      return cloneElement(
        child as ReactElement<BoxHeaderProps | BoxContentProps>,
        childProps
      );
    });
  }, [children, handleToggle, isOpen, id, maxHeight]);

  return (
    <div
      className={`rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 ${className}`}
    >
      {renderedChildren}
    </div>
  );
};

// Create type aliases for the components
const BoxHeader = BoxHeaderComponent;
const BoxContent = BoxContentComponent;

// Attach components to BoxAccordion for compound pattern
BoxAccordion.Header = BoxHeader;
BoxAccordion.Content = BoxContent;

// Export everything correctly
export { BoxHeader, BoxContent };
export default BoxAccordion;
