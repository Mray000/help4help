export const GetPosition = (el, to) => {
  console.log(window.dri);
  console.log(window.dr);
  return el.current.getBoundingClientRect()[to];
};
