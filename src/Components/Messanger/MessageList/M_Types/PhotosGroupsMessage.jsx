import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import "./../../Messanger.scss";

const PhotosGroupMessage = ({
  photos,
  setImgIndex = null,
  photosForView = null,
  setShow = null,
  preview = null,
  setShowEditModal = null,
}) => {
  const PhotoMessage = ({ src, width }) => {
    return (
      <>
        {preview && (
          <FontAwesomeIcon
            icon={faEdit}
            style={{ position: "absolute" }}
            onClick={() => setShowEditModal([true, src])}
          />
        )}
        <img
          alt="📷"
          src={src}
          style={{
            width: `${width}%`,
            objectFit: "contain",
            display: "block",
            borderRadius: "5px",
          }}
          onClick={(e) => {
            if (!preview) {
              e.stopPropagation();
              setImgIndex(() => {
                return photosForView.indexOf(src);
              });
              setShow(true);
            }
          }}
        />
      </>
    );
  };

  return (
    <div
      className="photos_container"
      style={{ width: "400px", display: "flex" }}
    >
      {(function () {
        if (photos.length === 1) {
          return <PhotoMessage src={photos[0]} width={"100"} />;
        }
        if (photos.length === 2) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <PhotoMessage src={photos[0]} width={"49"} />
              <PhotoMessage src={photos[1]} width={"49"} />
            </div>
          );
        }
        if (photos.length === 3) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "59%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhotoMessage src={photos[0]} width={"100"} />
              </div>
              <div
                style={{
                  width: "39%",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <PhotoMessage src={photos[1]} width={"100"} />
                <div style={{ height: "5px" }}></div>
                <PhotoMessage src={photos[2]} width={"100"} />
              </div>
            </div>
          );
        }
        if (photos.length > 3) {
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  width: "59%",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PhotoMessage src={photos[0]} width={"100"} />
              </div>
              <div
                style={{
                  width: "39%",
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <PhotoMessage src={photos[1]} width={"100"} />
                <div style={{ height: "5px" }}></div>
                <div className="photo_with_plus_photos">
                  <PhotoMessage src={photos[2]} width={"100"} />
                  <div>
                    <span>+{photos.length - 3}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default PhotosGroupMessage;
