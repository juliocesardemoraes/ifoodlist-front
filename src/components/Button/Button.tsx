import React from "react";

export default function Button({
  className,
  onClick,
  children,
  type = "button",
}: {
  className: string;
  onClick: any;
  children?: string;
  type: "button" | "submit";
}) {
  return (
    <button
      className={`${className} text-center br-1 mt-4 rounded-md font-semibold `}
      onClick={() => {
        onClick();
      }}
      type={type}
    >
      {children}
    </button>
  );
}
