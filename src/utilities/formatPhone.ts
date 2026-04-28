export function formatPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const digits = value.replace(/\D/g, "");

  if (digits.length !== 11) return null;
  if (digits[0] !== "7" && digits[0] !== "8") return null;

  const normalized = "7" + digits.slice(1);

  const part1 = normalized.slice(1, 4);
  const part2 = normalized.slice(4, 7);
  const part3 = normalized.slice(7, 9);
  const part4 = normalized.slice(9, 11);

  return `+7 (${part1}) ${part2}-${part3}-${part4}`;
}
