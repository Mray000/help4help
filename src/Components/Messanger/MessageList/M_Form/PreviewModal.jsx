import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, Field } from "formik";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "./../../Messanger.scss";

import { TextField } from "formik-material-ui";
import FilesGroupMessage from "../M_Types/FilesGroupMessage";
import PhotosGroupMessage from "../M_Types/PhotosGroupsMessage";
import {
  faCropAlt,
  faDownload,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        setSrcOfImg={setSrcOfImg}
      />
    </Modal>
  );
};

const EditModal = ({ SetShowEditModal, show_edit_modal, setSrcOfImg }) => {
  // console.log(show_edit_modal[1]);
  const [canvas_for_drawing, SetCanvasForDrawing] = useState(false);
  const [canvas_for_crop, SetCanvasForCrop] = useState(false);
  let canvas_submit = document.createElement("canvas");
  let ctx_submit = canvas_submit.getContext("2d");
  let example_canvas = useRef();
  let example_ctx = useRef();
  let canvas = useRef();
  let image = useRef();
  let ctx = useRef();
  let crop = useRef();
  let MousePress = false;
  let ImageBottom = useRef();
  let ImageRight = useRef();
  let ImageTop = useRef();
  let ImageLeft = useRef();
  // const getImage2 = (dataUrl) => {
  //   return new Promise((resolve, reject) => {
  //     let image = new Image();
  //     image.src = dataUrl;
  //     debugger;
  //     image.onload = () => {
  //       resolve(image);
  //     };
  //   });
  // };
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
        ctx.current.fillStyle = "#0075FF";
        ctx.current.strokeStyle = "#0075FF";
        ctx.current.lineWidth = 25;
        ImageBottom.current = canvas.current.getBoundingClientRect().bottom;
        ImageRight.current = canvas.current.getBoundingClientRect().right;
        ImageTop.current = canvas.current.getBoundingClientRect().top;
        ImageLeft.current = canvas.current.getBoundingClientRect().left;
      }
      fetchData();
    }
  }, [show_edit_modal[1]]);
  const PaintExampleCanvas = (strokeStyle, lineWidth) => {
    example_ctx.current.clearRect(0, 0, 50, 25);
    example_ctx.current.beginPath();
    example_ctx.current.strokeStyle = strokeStyle;
    example_ctx.current.lineWidth = lineWidth * 2;
    example_ctx.current.moveTo(0, 0);
    example_ctx.current.lineTo(50, 0);
    example_ctx.current.stroke();
  };
  const SaveDrawPicture = () => {
    setSrcOfImg((lastData) => {
      lastData[
        lastData.indexOf(show_edit_modal[1])
      ] = canvas.current.toDataURL();
      return [...lastData];
    });
    SetShowEditModal([false, ""]);
  };
  const SaveCropPicture = async () => {
    let image = await getImage(show_edit_modal[1]);
    console.log(
      (image.naturalWidth / canvas.current.width) *
        crop.current.style.height.slice(0, -2)
    );
    ctx_submit.drawImage(
      image,
      (image.naturalWidth / canvas.current.width) *
        -(
          canvas.current.getBoundingClientRect().left -
          crop.current.getBoundingClientRect().left
        ),
      (image.naturalHeight / canvas.current.height) *
        -(
          canvas.current.getBoundingClientRect().top -
          crop.current.getBoundingClientRect().top
        ),
      Math.ceil(image.naturalWidth / canvas.current.width) *
        crop.current.style.width.slice(0, -2),
      (image.naturalHeight / canvas.current.height) *
        crop.current.style.height.slice(0, -2),
      // (image.naturalWidth / canvas.current.width) *
      //   -(
      //     canvas.current.getBoundingClientRect().left -
      //     crop.current.getBoundingClientRect().left
      //   ),
      // (image.naturalHeight / canvas.current.height) *
      //   -(
      //     canvas.current.getBoundingClientRect().top -
      //     crop.current.getBoundingClientRect().top
      //   ),
      0,
      0,
      crop.current.style.width.slice(0, -2),
      crop.current.style.height.slice(0, -2)
    );
    console.log(canvas_submit.toDataURL());
    // console.log(
    //   "top:" +
    //     (canvas.current.getBoundingClientRect().top -
    //       crop.current.getBoundingClientRect().top)
    // );
    // console.log(
    //   "left:" +
    //     (canvas.current.getBoundingClientRect().left -
    //       crop.current.getBoundingClientRect().left)
    // );
    // console.log(
    //   "bottom:" +
    //     (canvas.current.getBoundingClientRect().bottom -
    //       crop.current.getBoundingClientRect().bottom)
    // );
    // console.log(
    //   "right:" +
    //     (canvas.current.getBoundingClientRect().right -
    //       crop.current.getBoundingClientRect().right)
    // );
  };
  const onMouseMove = (e) => {
    let x = e.clientX - canvas.current.getBoundingClientRect().left;
    let y = e.clientY - canvas.current.getBoundingClientRect().top;

    if (canvas_for_drawing && MousePress) {
      ctx.current.lineTo(x, y);
      ctx.current.stroke();

      ctx.current.beginPath();
      ctx.current.arc(x, y, ctx.current.lineWidth / 2, 0, Math.PI * 2);
      ctx.current.fill();

      ctx.current.beginPath();
      ctx.current.moveTo(x, y);
    }
  };
  useEffect(() => {
    return () => {
      SetCanvasForDrawing(false);
      SetCanvasForCrop(false);
    };
  }, [show_edit_modal[0]]);
  useEffect(() => {
    if (canvas_for_drawing) {
      example_ctx.current = example_canvas.current.getContext("2d");
      PaintExampleCanvas("#0075FF", 25);
    }
  }, [canvas_for_drawing]);
  useEffect(() => {
    if (canvas_for_crop) {
      crop.current.style.width = `${canvas.current.width}px`;
      crop.current.style.height = `${canvas.current.height}px`;
    }
  }, [canvas_for_crop]);
  let crop_left_top = false;
  let crop_right_top = false;
  let crop_left_bottom = false;
  let crop_right_bottom = false;
  const ChangeCrop = (t_b, l_r, e) => {
    if (t_b === "top") {
      crop.current.style.height =
        canvas.current.height +
        (canvas.current.getBoundingClientRect().top - e.clientY) -
        crop.current.style.bottom.slice(0, -2) +
        2 +
        "px";
    } else {
      crop.current.style.height =
        canvas.current.height -
        (canvas.current.getBoundingClientRect().bottom - e.clientY) -
        crop.current.style.top.slice(0, -2) +
        2 +
        "px";
    }
    if (l_r === "left") {
      crop.current.style.width =
        canvas.current.width +
        canvas.current.getBoundingClientRect().left -
        e.clientX -
        crop.current.style.right.slice(0, -2) +
        2 +
        "px";
    } else {
      crop.current.style.width =
        -(canvas.current.getBoundingClientRect().left - e.clientX) -
        crop.current.style.left.slice(0, -2) +
        2 +
        "px";
    }
    if (t_b === "top") {
      crop.current.style.top =
        -(canvas.current.getBoundingClientRect().top - e.clientY) + "px";
    } else {
      crop.current.style.bottom =
        canvas.current.getBoundingClientRect().bottom - e.clientY + "px";
    }
    if (l_r === "left") {
      crop.current.style.left =
        -(canvas.current.getBoundingClientRect().left - e.clientX) + "px";
    } else {
      crop.current.style.right =
        canvas.current.getBoundingClientRect().right - e.clientX + "px";
    }
  };
  const CropMouseMove = (e) => {
    if (
      crop_left_top ||
      crop_right_top ||
      crop_left_bottom ||
      crop_right_bottom
    ) {
      if (crop_left_top) {
        ChangeCrop("top", "left", e);
      }
      if (crop_right_top) {
        ChangeCrop("top", "right", e);
      }
      if (crop_left_bottom) {
        ChangeCrop("bottom", "left", e);
      }
      if (crop_right_bottom) {
        ChangeCrop("bottom", "right", e);
      }
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
        <div onMouseMove={CropMouseMove}>
          <canvas
            ref={canvas}
            onMouseMove={onMouseMove}
            onMouseDown={() => (MousePress = true)}
            onMouseUp={() => {
              MousePress = false;
              ctx.current.beginPath();
            }}
          ></canvas>
          {canvas_for_crop && (
            <div ref={crop} className="image_crop">
              <div className="crop_top">
                <div
                  className="crop_left_top"
                  onMouseDown={() => {
                    crop_left_top = true;
                  }}
                  onMouseUp={() => {
                    crop_left_top = false;
                  }}
                ></div>
                <div
                  className="crop_right_top"
                  onMouseDown={() => {
                    crop_right_top = true;
                  }}
                  onMouseUp={() => {
                    crop_right_top = false;
                  }}
                ></div>
              </div>
              <div className="crop_bottom">
                <div
                  className="crop_left_bottom"
                  onMouseDown={() => {
                    crop_left_bottom = true;
                  }}
                  onMouseUp={() => {
                    crop_left_bottom = false;
                  }}
                ></div>
                <div
                  className="crop_right_bottom"
                  onMouseDown={() => {
                    crop_right_bottom = true;
                  }}
                  onMouseUp={() => {
                    crop_right_bottom = false;
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "white",
            height: "50px",
          }}
        >
          {!canvas_for_drawing && !canvas_for_crop && (
            <>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#0075FF",
                }}
                onClick={() => SetShowEditModal([false, ""])}
              >
                Go Back
              </Button>
              <FontAwesomeIcon
                icon={faPencilAlt}
                color="#0075FF"
                onClick={() => SetCanvasForDrawing(true)}
              />
              <FontAwesomeIcon
                icon={faCropAlt}
                color="#0075FF"
                onClick={() => SetCanvasForCrop(true)}
              />
            </>
          )}
          {canvas_for_drawing && (
            <>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#0075FF",
                }}
                onClick={() => SetShowEditModal([false, ""])}
              >
                Go Back
              </Button>

              <input
                type="range"
                onChange={(e) => {
                  let strokeStyle = example_ctx.current.strokeStyle;
                  ctx.current.lineWidth = e.target.value;
                  example_canvas.current.height = e.target.value;
                  PaintExampleCanvas(strokeStyle, e.target.value * 2);
                }}
                defaultValue={25}
                max={50}
              />
              <input
                type="color"
                defaultValue="#0075FF"
                onChange={(e) => {
                  ctx.current.fillStyle = e.target.value;
                  ctx.current.strokeStyle = e.target.value;
                  example_ctx.current.strokeStyle = e.target.value;
                  PaintExampleCanvas(
                    e.target.value,
                    example_ctx.current.lineWidth
                  );
                }}
              />

              <canvas
                width="50"
                height="25"
                ref={example_canvas}
                style={{ borderRadius: "10px" }}
              ></canvas>
              <Button
                onClick={SaveDrawPicture}
                style={{
                  color: "white",
                  backgroundColor: "#0075FF",
                }}
              >
                Save
              </Button>
            </>
          )}
          {canvas_for_crop && (
            <Button
              onClick={SaveCropPicture}
              style={{
                color: "white",
                backgroundColor: "#0075FF",
              }}
            >
              Save
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(PreviewModal);
