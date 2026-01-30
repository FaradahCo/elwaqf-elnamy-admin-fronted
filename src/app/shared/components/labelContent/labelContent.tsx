import { memo, type ReactNode } from "react";

type LabelContentProps = {
  label: string;
  content: string | ReactNode;
};

const LabelContent = memo(({ label, content }: LabelContentProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>

      {typeof content === "string" ? (
        <p className="p-2 rounded-lg border border-gray-200">{content}</p>
      ) : (
        content
      )}
    </div>
  );
});

LabelContent.displayName = "LabelContent";
export default LabelContent;
