import { useLocation } from "react-router-dom";

export const useQuery = (name) => {
  const a = new URLSearchParams(useLocation().search);
  return a.get(name);
};
