export default function formatTitleCase(val: string): string {
  const newVal = val.toString();
  const formattedString = newVal.charAt(0).toUpperCase() + newVal.slice(1);

  return formattedString;
}
