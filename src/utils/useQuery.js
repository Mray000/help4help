import { useLocation } from "react-router-dom";

export const useQuery = (name) => {
  const a = new URLSearchParams(useLocation().search);
  //   console.log(a.get("self"));
  return a.get(name);
};
