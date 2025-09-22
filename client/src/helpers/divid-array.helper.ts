


export function dividArray <T>(array: T[], size: number): T[][] {
  const result = [];
  size = size || 3;
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

