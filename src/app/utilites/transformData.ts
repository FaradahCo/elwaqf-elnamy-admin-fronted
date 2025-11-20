export const EntityType = {
  institution: "مؤسسة",
  company: "شركة",
  individual: "فرد",
};

export const transformEntityType = (entityType: keyof typeof EntityType) => {
  return EntityType[entityType as keyof typeof EntityType];
};

export const transformFormObjectToFormData = (formDataObj: any) => {
  const formData = new FormData();
  Object.entries(formDataObj).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Send arrays as repeated keys e.g. fields[]=1
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
    } else if (typeof value === "object") {
      // Flatten simple objects as JSON
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const ConvertToNumber = (value: string) => {
  return Number(value.replace(/,/g, ""));
};
