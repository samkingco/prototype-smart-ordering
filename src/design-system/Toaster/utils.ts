export const hasDOM =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  window.document.createElement;

export const genUUID = (): string => {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;

  return (
    ("000" + first.toString(36)).slice(-3) +
    ("000" + second.toString(36)).slice(-3)
  );
};
