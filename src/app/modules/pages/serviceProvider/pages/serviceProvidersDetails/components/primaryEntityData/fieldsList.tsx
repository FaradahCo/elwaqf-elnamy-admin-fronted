import { memo } from "react";

const FieldsList = memo(({ fields }: { fields: string[] }) => {
  return (
    <div>
      {fields.map((field, index) => (
        <p
          className="rounded-md inline-block py-2 text-md border ml-2 px-3 border-gray-200"
          key={index}
        >
          {field}
        </p>
      ))}
    </div>
  );
});

FieldsList.displayName = "FieldsList";
export default FieldsList;
