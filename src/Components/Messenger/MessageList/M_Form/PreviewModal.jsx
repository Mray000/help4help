import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toBase64 } from "../../../../utils/toBase64.js";
import "../../Messenger.scss";
import { Button } from "@material-ui/core";

import FilesGroupMessage from "../M_Types/FilesGroupMessage";
import PhotosGroupMessage from "../M_Types/PhotosGroupsMessage";

import EditModal from "./EditModal";
import { SetError } from "../../../../Redux/Reducer/AppReducer";
import { getImage } from "../../../../utils/GetImage.js";

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
  const [show_edit_modal, SetShowEditModal] = useState("");
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
      dispatch(SetError(error));
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => {}}
      className="photo_preview_modal_global_container"
    >
      {!show_edit_modal && (
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
                for (let i of srcOfImg) {
                  let image = await getImage(i);
                  canvas.width = image.naturalWidth;
                  canvas.height = image.naturalHeight;
                  ctx.drawImage(image, 0, 0);
                  massOfCompressImg.push(canvas.toDataURL("image/jpeg", 0.1));
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
                let massOfImgFiles = [...srcOfFiles];
                if (!values.compress) {
                  for (let i of srcOfImg) {
                    massOfImgFiles.push(await getFileImg(i));
                  }
                }
                let massForDispatch = [];
                for (let f of massOfImgFiles) {
                  massForDispatch.push({
                    name: f.name,
                    size: f.size,
                    type: f.type,
                    file: await toBase64(f),
                  });
                }
                dispatch(
                  AddMessage(
                    values.preview_message ? values.preview_message : null,
                    null,
                    massForDispatch
                  )
                );
                setSrcOfFiles([]);
                setSrcOfImg([]);
              }
              handleClose();
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
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Field
                      type="checkbox"
                      name="compress"
                      style={{ marginRight: "4px", borderRadius: "10px" }}
                    />
                    <label htmlFor="compress">Compress image</label>
                  </div>
                )}
                <Field
                  multiline="true"
                  name="preview_message"
                  placeholder="type..."
                  className="preview_add_message_in"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                      handleClose();
                    }
                  }}
                />
                <Modal.Footer>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={handleSubmit}>Send</Button>
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
