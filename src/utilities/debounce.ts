export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => unknown,
  delay: number
): (...args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: TArgs): void => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
