"use client";

import React from "react";

export default function CopyTextButton({
  children,
  className,
  value,
}: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) {
  return (
    <button
      className={className ?? ""}
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    >
      {children}
    </button>
  );
}
