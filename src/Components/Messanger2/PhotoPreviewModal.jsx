import React from "react";

import { Form, Formik, Field } from "formik";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../Redux/Reducer/DialogsReducer";
import "./Messanger.scss";

const PhotoPreviewModal = ({ show, src, handleClose, mobile = false }) => {
  const dispatch = useDispatch();
  return (
    <div className="photo_prview_modal_global_container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body className="preview_photo_modal_body">
          <div>
            <img src={src} alt="" className="w-50" />
          </div>
          <Formik
            onSubmit={(values, actions) => {
              let message = values.preview_message.split("");
              if (message.length > 30) {
                let countDel = Math.ceil(message.length / 30);
                let i = 1;
                while (i <= countDel + 1) {
                  if (i !== countDel + 1) message.insert(i * 30 - i - 1, "\n");
                  else message.insert(i * 30 - i, "\n");
                  i++;
                }
                message = message.join("");
                dispatch(AddMessage(message, src));
              } else dispatch(AddMessage(message ? message : null, src));
              actions.resetForm();
            }}
            initialValues={{ preview_message: "" }}
          >
            {({ handleSubmit, values }) => (
              <Form
                onSubmit={handleSubmit}
                className={`preview_add_message_in_${
                  mobile ? "mobile_" : ""
                }container`}
              >
                <Field
                  name="preview_message"
                  wrap="hard"
                  placeholder="type..."
                  as="textarea"
                  className="add_message_in_preview"
                  onKeyPress={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                    }
                  }}
                />
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleSubmit();
                      handleClose();
                    }}
                  >
                    Send
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PhotoPreviewModal;
