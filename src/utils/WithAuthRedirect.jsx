import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getIsAuth } from "../Redux/Selectors/AuthSelectors";
export const withAuthRedirect = (Component) => {
  const RedirectComponent = () => {
    const isAuth = useSelector(getIsAuth);
    if (!isAuth) return <Redirect to="/login" />;
    return <Component />;
  };
  return RedirectComponent;
};
