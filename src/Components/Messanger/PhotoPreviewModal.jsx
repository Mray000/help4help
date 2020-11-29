import React from "react";
import { Form, Formik, Field } from "formik";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../Redux/Reducer/DialogsReducer";
import "./Messanger.scss";
import { TextField } from "formik-material-ui";

const PhotoPreviewModal = ({ show, src, handleClose, mobile = false }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="photo_preview_modal_global_container"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="preview_photo_modal_body">
        <div className="photo_preview_modal_images_container">
          <div className="photo_preview_modal_image_container">
            <img src={src} alt="" />
          </div>
          {/* <div className="photo_preview_modal_image_container">
            <img src={src} alt="" className="photo_preview_modal_image" />
          </div> */}
        </div>
        <Formik
          onSubmit={(values, actions) => {
            let message = values.preview_message.split("");
            if (message.length > 30) {
              let countDel = Math.ceil(message.length / 30);
              let i = 1;
              while (i <= countDel + 1) {
                // if (i !== countDel + 1) message.insert(i * 30 - i, "\n");
                message.insert(i * 30 - 1, "\n");
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
                component={TextField}
                multiline
                color="white"
                name="preview_message"
                placeholder="type..."
                className="preview_add_message_in"
                onKeyPress={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    handleSubmit();
                    event.preventDefault();
                    handleClose();
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
  );
};

export default PhotoPreviewModal;
