export const range = (count: number): number[] => {
  if (!count || count <= 0) return [0];

  const buffer = [];
  for (let i = 0; i <= count; i++) buffer.push(i);

  return buffer;
};
