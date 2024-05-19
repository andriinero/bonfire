export const range = (count: number) => {
  if (count <= 0) return undefined;

  const buffer = [];
  for (let i = 0; i < count; i++) buffer.push(i);

  return buffer;
};
