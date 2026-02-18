import type React from "react";

type CardProps = {
  type: "finance" | "overview";
  children?: React.ReactNode;
  label?: string;
  value?: string;
  text?: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({
  type,
  children,
  label,
  value,
  className,
  text = "",
}) => {
  if (type === "finance")
    return (
      <div
        className={`grid grid-cols-[1fr_3rem] p-4 py-2 rounded-lg items-center ${className}`}
      >
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium text-gray-600">{label}</h3>
          <div className="flex gap-1 items-center">
            <p className="text-2xl font-semibold">{value}</p>
            <img className="h-6 w-6" src="images/SAR.svg" alt="ريال سعودي" />
          </div>
          <div>{children}</div>
        </div>
        <div className="h-12 w-12 d flex items-center justify-center bg-blue-50 rounded-full">
          <img src="/images/chart-icon.svg" alt="chart icon" />
        </div>
      </div>
    );
  if (type === "overview")
    return (
      <div
        className={`flex flex-col gap-4 rounded-2xl overflow-hidden ${className}`}
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-medium">{label}</h3>
          <p className="text-2xl">
            {value} <span className="text-base">{text}</span>
          </p>
        </div>
        <div>{children}</div>
      </div>
    );
};

export default Card;
