import React from "react";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

function Box({ title, children, className }: BoxProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4 ${className}`}
    >
      {title && (
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 bg-brand"></div>
          <h3 className="text-xl font-bold text-[#150941]">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

export default Box;
