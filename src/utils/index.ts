export const throttle = <ReturnType, ArgsType extends unknown[]>(
  func: (...args: ArgsType) => ReturnType,
  delay: number,
) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: ArgsType) => {
    if (timeout) return;

    func(...args);

    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
  };
};
