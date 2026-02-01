import { memo, type ReactNode } from "react";

type LabelContentProps = {
  label: string;
  children: ReactNode;
};

const LabelContent = memo(({ label, children }: LabelContentProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>

      {children}
    </div>
  );
});

LabelContent.displayName = "LabelContent";
export default LabelContent;
