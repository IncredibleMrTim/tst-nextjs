export enum DateVariant {
  Short = 'short',
  Long = 'long'
}

export const formatDate = (
  dateString: string | Date,
  variant?: DateVariant
) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: variant === 'long' ? 'numeric' : undefined,
    month: 'short',
    year: 'numeric'
  });
};
