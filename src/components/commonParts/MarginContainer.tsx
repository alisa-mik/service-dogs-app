import React from "react";

interface MarginContainerProps {
  children: React.ReactNode;
  marginLeft: string;
}

export default function MarginContainer({
  children,
  marginLeft,
}: MarginContainerProps) {
  return (
    <div style={{ marginLeft: marginLeft, display: "flex", gap: "10px" }}>
      {children}
    </div>
  );
}
