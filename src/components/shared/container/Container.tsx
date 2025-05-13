"use client";

import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = "max-w-3xl",
  padding = "p-6",
  className,
}) => {
  return (
    <div className={`${maxWidth} mx-auto ${padding} ${className || ""}`}>
      {children}
    </div>
  );
};

export default Container;
