import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { SetError } from "../Redux/Reducer/AppReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getGlobalError } from "../Redux/Selectors/AppSelectors";

const Error = () => {
  const dispatch = useDispatch();
  const error = useSelector(getGlobalError);
  useEffect(() => {
    if (error)
      toast(error, {
        type: "error",
        position: "bottom-right",
        onClose: () => dispatch(SetError("")),
      });
  }, [error]);
  return <ToastContainer />;
};
export default Error;
