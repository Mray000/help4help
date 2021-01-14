import React from "react";
import { Form, Formik, Field } from "formik";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./../../Messanger.scss";

import { TextField } from "formik-material-ui";
import FilesGroupMessage from "../M_Types/FilesGroupMessage";
import PhotosGroupMessage from "../M_Types/PhotosGroupsMessage";

const PreviewModal = ({
  AddMessage,
  show,
  srcOfImg,
  setSrcOfImg,
  srcOfFiles,
  setSrcOfFiles,
  handleClose,
  mobile = false,
}) => {
  const dispatch = useDispatch();
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="photo_preview_modal_global_container"
    >
      <Modal.Body className="preview_photo_modal_body">
        <div className="photo_preview_modal_images_container">
          {srcOfImg.length ? (
            <div className="photo_preview_modal_image_container">
              <PhotosGroupMessage photos={srcOfImg} preview={true} />
            </div>
          ) : null}
          {srcOfFiles.length ? (
            <FilesGroupMessage files={srcOfFiles} preview={true} />
          ) : null}
        </div>
        <Formik
          onSubmit={(values, actions) => {
            if (srcOfImg.length) {
              dispatch(
                AddMessage(
                  values.preview_message ? values.preview_message : null,
                  srcOfImg
                )
              );
              setSrcOfImg([]);
            }
            if (srcOfFiles.length) {
              dispatch(
                AddMessage(
                  values.preview_message ? values.preview_message : null,
                  null,
                  srcOfFiles
                )
              );
              setSrcOfFiles([]);
            }
            actions.resetForm();
          }}
          initialValues={{ preview_message: "" }}
        >
          {({ handleSubmit }) => (
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

export default PreviewModal;
