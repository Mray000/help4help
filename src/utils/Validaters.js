export const required = (value) =>
  value ? undefined : "This required is field";

export const maxLength = (max) => (value) =>
  value.length > max ? `Max length ${max} symbols` : undefined;

export const email = (value) =>
  value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? undefined
    : "Invalid email address";

export const link = (value) =>
  value && /[A-Z0-9._%+-]\.[A-Z]{2,4}\/?[A-Z0-9._%+-]+$/i.test(value)
    ? undefined
    : "Invalid link";

export const formError = (err) => (err ? { err } : undefined);
