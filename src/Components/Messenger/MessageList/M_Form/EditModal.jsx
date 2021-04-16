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
  let ctx = useRef();
  let image = useRef();
  let crop = useRef();
  let firstRender = useRef();
  const dispatch = useDispatch();
  let MousePress = false;
  let ImageBottom,
    ImageRight,
    ImageTop,
    ImageLeft = 0;
  let crop_left_top,
    crop_right_top,
    crop_left_bottom,
    crop_right_bottom = false;
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
      ImageBottom = GetPosition(canvas, "bottom");
      ImageRight = GetPosition(canvas, "right");
      ImageTop = GetPosition(canvas, "top");
      ImageLeft = GetPosition(canvas, "left");
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
      let canvas_width =
        GetPosition(canvas, "right") - GetPosition(canvas, "left");

      let canas_height =
        GetPosition(canvas, "bottom") - GetPosition(canvas, "top");

      crop.current.style["max-width"] = `${canvas_width}px`;
      crop.current.style["max-height"] = `${canas_height}px`;
      crop.current.style.width = `${canvas_width}px`;
      crop.current.style.height = `${canas_height}px`;
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
    let canvas_width =
      GetPosition(canvas, "right") - GetPosition(canvas, "left");

    let canvas_height =
      GetPosition(canvas, "bottom") - GetPosition(canvas, "top");
    canvas_submit.width = crop.current.style.width.slice(0, -2);
    canvas_submit.height = crop.current.style.height.slice(0, -2);
    if (canvas_submit.width / canvas_submit.height < 0.1) {
      dispatch(SetError("Picture very small"));
      SetShowEditModal("");
      return;
    }
    ctx_submit.drawImage(
      image,
      (image.naturalWidth / canvas_width) *
        -(ImageLeft - GetPosition(crop, "left")),
      (image.naturalWidth / canvas_width) *
        -(ImageTop - GetPosition(crop, "top")),
      (image.naturalWidth / canvas_width) *
        crop.current.style.width.slice(0, -2),
      (image.naturalWidth / canvas_width) *
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
  useEventListener("mouseup", (e) => {
    crop_left_top = crop_right_top = crop_left_bottom = crop_right_bottom = false;
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
    let x = e.clientX - GetPosition(canvas, "left");
    let y = e.clientY - GetPosition(canvas, "top");
    console.log(x, y);
    if (
      x > 0 &&
      y > 0 &&
      e.clientX < GetPosition(canvas, "right") &&
      e.clientY < GetPosition(canvas, "bottom")
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
    let canvas_height =
      GetPosition(canvas, "bottom") - GetPosition(canvas, "top");
    let canvas_width =
      GetPosition(canvas, "right") - GetPosition(canvas, "left");
    if (e.clientX < ImageLeft) {
      crop.current.style.width =
        canvas_width - crop.current.style.right.slice(0, -2) + "px";
      crop.current.style.left = "0px";
    }
    if (e.clientY < ImageTop) {
      crop.current.style.height =
        canvas_height - crop.current.style.bottom.slice(0, -2) + "px";
      crop.current.style.top = "0px";
    }
    if (e.clientX > ImageRight) {
      crop.current.style.width =
        canvas_width - crop.current.style.left.slice(0, -2) + "px";
      crop.current.style.right = "0px";
    }
    if (e.clientY > ImageBottom) {
      crop.current.style.height =
        canvas_height - crop.current.style.top.slice(0, -2) + "px";
      crop.current.style.bottom = "0px";
    }
    if (t_b === "top") {
      if (e.clientY > ImageTop && e.clientY < ImageBottom - 50) {
        crop.current.style.height =
          canvas_height +
          (ImageTop - e.clientY) -
          crop.current.style.bottom.slice(0, -2) +
          "px";
        crop.current.style.top = e.clientY - ImageTop + "px";
      } else {
        crop_left_top = false;
        crop_right_top = false;
      }
    } else {
      if (e.clientY > ImageTop + 50 && e.clientY < ImageBottom) {
        crop.current.style.height =
          -(ImageTop - e.clientY) - crop.current.style.top.slice(0, -2) + "px";
        crop.current.style.bottom = ImageBottom - e.clientY + "px";
      } else {
        crop_left_bottom = false;
        crop_right_bottom = false;
      }
    }
    if (l_r === "left") {
      if (e.clientX > ImageLeft && e.clientX < ImageRight - 50) {
        crop.current.style.width =
          canvas_width +
          ImageLeft -
          e.clientX -
          crop.current.style.right.slice(0, -2) +
          "px";
        crop.current.style.left = e.clientX - ImageLeft + "px";
      } else {
        crop_left_top = false;
        crop_left_bottom = false;
      }
    } else {
      if (e.clientX < ImageRight && e.clientX > ImageLeft + 50) {
        crop.current.style.width =
          -(ImageLeft - e.clientX) -
          crop.current.style.left.slice(0, -2) +
          "px";
        crop.current.style.right = ImageRight - e.clientX + "px";
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
            style={{ width: "100%" }}
          ></canvas>
          {canvas_for_crop && (
            <div ref={crop} className="image_crop">
              <div className="crop_top">
                <div
                  className="crop_left_top"
                  onMouseDown={() => (crop_left_top = true)}
                ></div>
                <div
                  className="crop_right_top"
                  onMouseDown={() => (crop_right_top = true)}
                ></div>
              </div>
              <div className="crop_bottom">
                <div
                  className="crop_left_bottom"
                  onMouseDown={() => (crop_left_bottom = true)}
                ></div>
                <div
                  className="crop_right_bottom"
                  onMouseDown={() => (crop_right_bottom = true)}
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
