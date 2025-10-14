export const handleFormErrors = <T = any>(
  errorResponse: any
): Array<{
  name: keyof T;
  errors: string[];
}> => {
  if (
    !errorResponse ||
    !errorResponse.errors ||
    typeof errorResponse.errors !== "object"
  ) {
    return [];
  }

  const fieldErrors = Object.entries(errorResponse.errors).map(
    ([fieldName, errorValue]) => ({
      name: fieldName as keyof T,
      errors: Array.isArray(errorValue) ? errorValue : [errorValue],
    })
  );

  return fieldErrors;
};

export const setFormFieldErrors = <T = any>(
  form: any,
  errorResponse: any
): void => {
  const fieldErrors = handleFormErrors<T>(errorResponse);

  if (fieldErrors.length > 0) {
    form.setFields(fieldErrors);
  }
};
