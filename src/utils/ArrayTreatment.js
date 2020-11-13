export const ArrayMaping = (massive, comparisonEl, action, difference) => {
  return massive.map((el) => {
    if (el[comparisonEl] === action[comparisonEl]) {
      return { ...el, ...difference };
    }
    return el;
  });
};

export const ArrayFilter = (massive, comparisonEl, action) => {
  return massive.filter((el) => el[comparisonEl] !== action[comparisonEl]);
};
