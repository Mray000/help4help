import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, Field } from "formik";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./../../Messanger.scss";

import { TextField } from "formik-material-ui";
import FilesGroupMessage from "../M_Types/FilesGroupMessage";
import PhotosGroupMessage from "../M_Types/PhotosGroupsMessage";
import {
  faEdit,
  faPencilAlt,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getImage = (dataUrl, b = null) => {
  console.log(dataUrl, b);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = dataUrl;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (el, err) => {
      console.log(el);
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
  let canvas, ctx;
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

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
                  let newDataUrl = canvas.toDataURL("image/jpeg", 0.1);
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
      )}
      <EditModal
        SetShowEditModal={SetShowEditModal}
        show_edit_modal={show_edit_modal}
      />
    </Modal>
  );
};

const EditModal = ({ SetShowEditModal, show_edit_modal }) => {
  // console.log(show_edit_modal[1]);
  const [canvas_for_drawing, SetCanvasForDrawing] = useState(false);
  const [canvas_for_crop, SetCanvasForCrop] = useState(false);
  let canvas = useRef();
  let image = useRef();
  let ctx = useRef();
  let MousePress = false;
  useEffect(() => {
    if (show_edit_modal[1]) {
      async function fetchData() {
        canvas.current.width = image.current.width;
        canvas.current.height = image.current.height;
        ctx.current = canvas.current.getContext("2d");
        ctx.current.drawImage(
          image.current,
          0,
          0,
          image.current.width,
          image.current.height
        );
        image.current.style.display = "none";
        ctx.current.lineWidth = 20;
      }
      fetchData();
    }
  }, [show_edit_modal[1]]);

  const onMouseMove = (e) => {
    let x = e.clientX - canvas.current.getBoundingClientRect().left;
    let y = e.clientY - canvas.current.getBoundingClientRect().top;

    if (canvas_for_drawing && MousePress) {
      ctx.current.lineTo(x, y);
      ctx.current.stroke();

      ctx.current.beginPath();
      ctx.current.arc(x, y, 10, 0, Math.PI * 2);
      ctx.current.fill();

      ctx.current.beginPath();
      ctx.current.moveTo(x, y);
    }
  };

  return (
    <Modal
      show={show_edit_modal[0]}
      onHide={() => SetShowEditModal([false, ""])}
      className="photos_preview_global_container"
    >
      <Modal.Body className="preview_photo_modal_body">
        <div className="photo_preview_modal_images_container">
          <img src={show_edit_modal[1]} ref={image} />
        </div>

        <canvas
          ref={canvas}
          onMouseMove={onMouseMove}
          onMouseDown={() => (MousePress = true)}
          onMouseUp={() => {
            MousePress = false;
            ctx.current.beginPath();
          }}
        ></canvas>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "grey",
            height: "50px",
          }}
        >
          {!canvas_for_drawing && !canvas_for_crop && (
            <>
              <FontAwesomeIcon
                icon={faPencilAlt}
                color="white"
                onClick={() => SetCanvasForDrawing(true)}
              />
              <FontAwesomeIcon
                icon={faSquare}
                color="white"
                onClick={() => SetCanvasForCrop(true)}
              />
            </>
          )}
          {canvas_for_drawing && <div>кргу</div>}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(PreviewModal);
