export const GetPosition = (el, to) => {
  return el.current.getBoundingClientRect()[to];
};
