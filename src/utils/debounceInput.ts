let timeoutId: NodeJS.Timeout | undefined = undefined;

export const handleChangeDebounce = (
  e: React.ChangeEvent<HTMLInputElement>
): Promise<string> => {
  const { value } = e.target;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  return new Promise((resolve) => {
    timeoutId = setTimeout(() => {
      resolve(value);
    }, 500);
  });
};
