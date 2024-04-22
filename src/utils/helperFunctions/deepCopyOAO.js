export function deepCopyOAO(object) {
  return Object.keys(object).reduce((acc, curr) => {
    acc[curr] = object[curr].map(({ id, answer }) => ({
      id,
      answer,
    }));
    return acc;
  }, {});
}
