import React from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { SetError } from "../Redux/Reducer/AppReducer";

const Error = () => {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.App.error);
  return (
    <Modal show={Boolean(error)} onHide={() => dispatch(SetError(""))}>
      <div
        style={{
          backgroundColor: "#F8D7DA",
          color: "#721C24",
        }}
      >
        {/* <ModalHeader style={{ textAlign: "right", backgroundColor: "white" }}>
          <FontAwesomeIcon icon={faTimes} />
        </ModalHeader> */}
        <Modal.Body>
          <span>
            <span style={{ color: "#491217", fontWeight: "900" }}>Error!</span>
            {" " + error}
          </span>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default Error;
