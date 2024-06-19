export function addRange(prevRanges, newRange) {
  prevRanges.push(newRange);
  prevRanges.sort((a, b) => a[0] - b[0]);

  const resultRanges = [];

  prevRanges.forEach((range, idx) => {
    if (idx === 0) resultRanges.push(range);
    else {
      const [start, end] = range;
      const prevEnd = resultRanges.at(-1)[1];

      if (start > prevEnd) resultRanges.push(range);
      else resultRanges.at(-1)[1] = Math.max(prevEnd, end);
    }
  });

  return resultRanges;
}
