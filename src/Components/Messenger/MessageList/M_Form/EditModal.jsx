/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { faCropAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { SetError } from "../../../../Redux/Reducer/AppReducer";
import { useEventListener } from "../../../../utils/UseEventListener";
import { GetPosition } from "../../../../utils/GetPosition";
const EditModal = ({
  SetShowEditModal,
  show_edit_modal,
  setSrcOfImg,
  getImage,
}) => {
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
  let firstRender = useRef();
  const dispatch = useDispatch();
  let crop_left_top = false;
  let crop_right_top = false;
  let crop_left_bottom = false;
  let crop_right_bottom = false;
  useEffect(() => {
    if (show_edit_modal) {
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
      firstRender.current = true;
    }
  }, [show_edit_modal]);
  useEffect(() => {
    if (firstRender.current) {
      ImageBottom.current = GetPosition(canvas, "bottom");
      ImageRight.current = GetPosition(canvas, "right");
      ImageTop.current = GetPosition(canvas, "top");
      ImageLeft.current = GetPosition(canvas, "left");
      firstRender.current = false;
    }
  }, [firstRender.current]);
  useEffect(() => {
    return () => {
      SetCanvasForDrawing(false);
      SetCanvasForCrop(false);
    };
  }, [show_edit_modal]);
  useEffect(() => {
    if (canvas_for_drawing) {
      example_ctx.current = example_canvas.current.getContext("2d");
      PaintExampleCanvas("#0075FF", 25);
    }
  }, [canvas_for_drawing]);
  useEffect(() => {
    if (canvas_for_crop) {
      crop.current.style["max-width"] = `${canvas.current.width}px`;
      crop.current.style["max-height"] = `${canvas.current.height}px`;
      crop.current.style.width = `${canvas.current.width}px`;
      crop.current.style.height = `${canvas.current.height}px`;
    }
  }, [canvas_for_crop]);
  const SaveDrawPicture = () => {
    setSrcOfImg((lastData) => {
      lastData[lastData.indexOf(show_edit_modal)] = canvas.current.toDataURL();
      return [...lastData];
    });
    SetShowEditModal("");
  };
  const SaveCropPicture = async () => {
    let image = await getImage(show_edit_modal);
    canvas_submit.width = crop.current.style.width.slice(0, -2);
    canvas_submit.height = crop.current.style.height.slice(0, -2);
    if (canvas_submit.width / canvas_submit.height < 0.1) {
      dispatch(SetError("Picture very small"));
      SetShowEditModal("");
      return;
    }
    ctx_submit.drawImage(
      image,
      (image.naturalWidth / canvas.current.width) *
        -(ImageLeft.current - GetPosition(crop, "left")),
      (image.naturalWidth / canvas.current.width) *
        -(ImageTop.current - GetPosition(crop, "top")),
      (image.naturalWidth / canvas.current.width) *
        crop.current.style.width.slice(0, -2),
      (image.naturalWidth / canvas.current.width) *
        crop.current.style.height.slice(0, -2),
      0,
      0,
      crop.current.style.width.slice(0, -2),
      crop.current.style.height.slice(0, -2)
    );

    setSrcOfImg((lastData) => {
      lastData[lastData.indexOf(show_edit_modal)] = canvas_submit.toDataURL();
      return [...lastData];
    });
    SetShowEditModal("");
  };
  useEventListener("mousemove", (e) => {
    if (canvas_for_drawing && MousePress) DrowMouseMove(e);
    if (
      crop_left_top ||
      crop_right_top ||
      crop_left_bottom ||
      crop_right_bottom
    )
      CropMouseMove(e);
  });
  const PaintExampleCanvas = (strokeStyle, lineWidth) => {
    example_ctx.current.clearRect(0, 0, 50, 25);
    example_ctx.current.beginPath();
    example_ctx.current.strokeStyle = strokeStyle;
    example_ctx.current.lineWidth = lineWidth * 2;
    example_ctx.current.moveTo(0, 0);
    example_ctx.current.lineTo(50, 0);
    example_ctx.current.stroke();
  };

  const DrowMouseMove = (e) => {
    let x = e.clientX - ImageLeft.current;
    let y = e.clientY - ImageTop.current;

    if (
      x > 0 &&
      y > 0 &&
      e.clientX < ImageRight.current &&
      e.clientY < ImageBottom.current
    ) {
      ctx.current.lineTo(x, y);
      ctx.current.stroke();

      ctx.current.beginPath();
      ctx.current.arc(x, y, ctx.current.lineWidth / 2, 0, Math.PI * 2);
      ctx.current.fill();

      ctx.current.beginPath();
      ctx.current.moveTo(x, y);
    } else {
      MousePress = false;
      ctx.current.beginPath();
    }
  };
  const ChangeCrop = (t_b, l_r, e) => {
    if (e.clientX < ImageLeft.current) {
      crop.current.style.width =
        canvas.current.width - crop.current.style.right.slice(0, -2) + "px";
      crop.current.style.left = "0px";
    }
    if (e.clientY < ImageTop.current) {
      crop.current.style.height =
        canvas.current.height - crop.current.style.bottom.slice(0, -2) + "px";
      crop.current.style.top = "0px";
    }
    if (e.clientX > ImageRight.current) {
      crop.current.style.width =
        canvas.current.width - crop.current.style.left.slice(0, -2) + "px";
      crop.current.style.right = "0px";
    }
    if (e.clientY > ImageBottom.current) {
      crop.current.style.height =
        canvas.current.height - crop.current.style.top.slice(0, -2) + "px";
      crop.current.style.bottom = "0px";
    }
    if (t_b === "top") {
      if (
        e.clientY > ImageTop.current &&
        e.clientY < ImageBottom.current - 50
      ) {
        crop.current.style.height =
          canvas.current.height +
          (ImageTop.current - e.clientY) +
          5 -
          crop.current.style.bottom.slice(0, -2) +
          "px";
        crop.current.style.top = e.clientY - ImageTop.current + "px";
      } else {
        crop_left_top = false;
        crop_right_top = false;
      }
    } else {
      if (
        e.clientY > ImageTop.current + 50 &&
        e.clientY < ImageBottom.current
      ) {
        crop.current.style.height =
          -(ImageTop.current - e.clientY) +
          5 -
          crop.current.style.top.slice(0, -2) +
          "px";
        crop.current.style.bottom = ImageBottom.current - e.clientY + "px";
      } else {
        crop_left_bottom = false;
        crop_right_bottom = false;
      }
    }
    if (l_r === "left") {
      if (
        e.clientX > ImageLeft.current &&
        e.clientX < ImageRight.current - 50
      ) {
        crop.current.style.width =
          canvas.current.width +
          ImageLeft.current -
          e.clientX +
          5 -
          crop.current.style.right.slice(0, -2) +
          "px";
        crop.current.style.left = e.clientX - ImageLeft.current + "px";
      } else {
        crop_left_top = false;
        crop_left_bottom = false;
      }
    } else {
      if (
        e.clientX < ImageRight.current &&
        e.clientX > ImageLeft.current + 50
      ) {
        crop.current.style.width =
          -(ImageLeft.current - e.clientX) +
          5 -
          crop.current.style.left.slice(0, -2) +
          "px";
        crop.current.style.right = ImageRight.current - e.clientX + "px";
      } else {
        crop_right_top = false;
        crop_right_bottom = false;
      }
    }
  };
  const CropMouseMove = (e) => {
    if (
      crop_left_top ||
      crop_right_top ||
      crop_left_bottom ||
      crop_right_bottom
    ) {
      if (crop_left_top) ChangeCrop("top", "left", e);
      if (crop_right_top) ChangeCrop("top", "right", e);
      if (crop_left_bottom) ChangeCrop("bottom", "left", e);
      if (crop_right_bottom) ChangeCrop("bottom", "right", e);
    }
  };
  return (
    <Modal
      onHide={() => {}}
      show={Boolean(show_edit_modal)}
      className="photos_preview_global_container"
    >
      <Modal.Body className="preview_photo_modal_body">
        <div className="photo_preview_modal_images_container">
          <img src={show_edit_modal} ref={image} alt="буба" />
        </div>
        <div onMouseMove={CropMouseMove}>
          <canvas
            ref={canvas}
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
                  onMouseDown={() => (crop_left_top = true)}
                  onMouseUp={() => (crop_left_top = false)}
                ></div>
                <div
                  className="crop_right_top"
                  onMouseDown={() => (crop_right_top = true)}
                  onMouseUp={() => (crop_right_top = false)}
                ></div>
              </div>
              <div className="crop_bottom">
                <div
                  className="crop_left_bottom"
                  onMouseDown={() => (crop_left_bottom = true)}
                  onMouseUp={() => (crop_left_bottom = false)}
                ></div>
                <div
                  className="crop_right_bottom"
                  onMouseDown={() => (crop_right_bottom = true)}
                  onMouseUp={() => (crop_right_bottom = false)}
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
            borderRadius: "10px",
          }}
        >
          {!canvas_for_drawing && !canvas_for_crop && (
            <>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#0075FF",
                }}
                onClick={() => SetShowEditModal("")}
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
                onClick={() => SetShowEditModal("")}
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
                width: "100%",
                height: "50px",
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

export default EditModal;