export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  if (Number.isInteger(value)) return value.toString();
  const fixed = value.toFixed(4);
  return fixed.replace(/0+$/, '').replace(/\.$/, '');
}
