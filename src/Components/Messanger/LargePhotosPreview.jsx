import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import "./Messanger.scss";

const LargePhotosPreview = ({
  show,
  setShow,
  photos,
  imgIndex,
  setImgIndex,
}) => {
  const ImgIndexMinus = () => {
    setImgIndex((IN) => {
      if (IN === 0) return photos.length - 1;
      else return imgIndex - 1;
    });
  };
  const ImgIndexPlus = () => {
    setImgIndex((IN) => {
      if (IN === photos.length - 1) return 0;
      else return imgIndex + 1;
    });
  };

  const PhotosPreview = useRef(null);

  useEffect(() => {
    if (show) {
      PhotosPreview.current.focus();
    }
  }, [show]);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className="photos_preview_global_container"
    >
      <Modal.Body className="row">
        <div
          style={{ display: "flex" }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              ImgIndexMinus();
              e.preventDefault();
            }
            if (e.key === "ArrowRight") {
              ImgIndexPlus();
              e.preventDefault();
            }
          }}
          tabIndex={0}
          ref={PhotosPreview}
          className="photos_preview_content"
        >
          <button onClick={ImgIndexMinus} id="left_bottom_photos_preview">
            <FontAwesomeIcon icon="angle-double-left" color="grey" size="2x" />
          </button>
          <img src={photos[imgIndex]} alt="" />
          <button onClick={ImgIndexPlus} id="right_bottom_photos_preview">
            <FontAwesomeIcon icon="angle-double-right" color="grey" size="2x" />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LargePhotosPreview;
