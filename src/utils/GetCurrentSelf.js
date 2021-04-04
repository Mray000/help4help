export const getCurrentSelf = () =>
  new URL(window.location.href).searchParams.get("self");
export const getCurrentProfileId = () =>
  window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
