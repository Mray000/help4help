import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./../../Messanger.scss";

import { TextField } from "formik-material-ui";
import FilesGroupMessage from "../M_Types/FilesGroupMessage";
import PhotosGroupMessage from "../M_Types/PhotosGroupsMessage";

import EditModal from "./EditModal";

const getImage = (dataUrl, b = null) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      resolve(image);
    };
  });
};

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
  const [show_edit_modal, SetShowEditModal] = useState([false, ""]);
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");

  const dispatch = useDispatch();

  const getFileImg = async (dataUrl) => {
    try {
      let file = await fetch(dataUrl)
        .then((res) => res.blob())
        .then((res) => new File([res], "Photo", { type: res.type }));
      return file;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="photo_preview_modal_global_container"
    >
      {!show_edit_modal[0] && (
        <Modal.Body className="preview_photo_modal_body">
          <div className="photo_preview_modal_images_container">
            {srcOfImg.length ? (
              <div className="photo_preview_modal_image_container">
                <PhotosGroupMessage
                  photos={srcOfImg}
                  preview={true}
                  setShowEditModal={SetShowEditModal}
                />
              </div>
            ) : null}
            {srcOfFiles.length ? (
              <FilesGroupMessage files={srcOfFiles} preview={true} />
            ) : null}
          </div>
          <Formik
            onSubmit={async (values, actions) => {
              if (srcOfImg.length && values.compress) {
                let massOfCompressImg = [];
                for (let i = 0; i < srcOfImg.length; i++) {
                  let image = await getImage(srcOfImg[i]);
                  canvas.width = image.naturalWidth;
                  canvas.height = image.naturalHeight;
                  ctx.drawImage(image, 0, 0);
                  let newDataUrl = canvas.toDataURL("image/jpeg", 0.5);
                  massOfCompressImg.push(newDataUrl);
                }
                dispatch(
                  AddMessage(
                    values.preview_message ? values.preview_message : null,
                    massOfCompressImg
                  )
                );
                setSrcOfImg([]);
              }
              if (srcOfFiles.length || !values.compress) {
                let massOfImgFiles = [];
                if (!values.compress) {
                  for (let i = 0; i < srcOfImg.length; i++) {
                    let file = await getFileImg(srcOfImg[i]);
                    massOfImgFiles.push(file);
                  }
                }
                dispatch(
                  AddMessage(
                    values.preview_message ? values.preview_message : null,
                    null,
                    [...srcOfFiles, ...massOfImgFiles]
                  )
                );
                setSrcOfFiles([]);
                setSrcOfImg([]);
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
                {srcOfImg.length && (
                  <label
                    style={{
                      color: "white",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="compress"
                      style={{ marginRight: "4px" }}
                    />
                    COMPRESS IMAGE
                  </label>
                )}
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
                  <Button onClick={handleClose}>Close</Button>
                  <Button
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
      )}
      <EditModal
        SetShowEditModal={SetShowEditModal}
        show_edit_modal={show_edit_modal}
        setSrcOfImg={setSrcOfImg}
        getImage={getImage}
      />
    </Modal>
  );
};

export default PreviewModal;
