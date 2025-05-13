// "use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "ghost";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      icon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-white text-[#23395d] focus:ring-[#23395d] border-2 border-gray-300",
      secondary:
        "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200 focus:ring-gray-300",
      ghost:
        "bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-blue-100 focus:ring-blue-300",
    };

    const sizes = {
      sm: "text-xs px-3 py-1",
      md: "text-sm px-4 py-[5px]",
      lg: "text-base px-5 py-[8px]",
      ghost: "text-sm px-2 py-1",
    };

    const combinedClass = [
      base,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      icon || isLoading ? "gap-2" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClass}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            <span className="">{children}</span>
          </>
        )}
      </button>
    );
  }
);

PrimaryBtn.displayName = "Button";

export default PrimaryBtn;
