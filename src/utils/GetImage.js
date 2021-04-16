export const getImage = (dataUrl) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = dataUrl;
    image.onload = () => resolve(image);
  });
};
