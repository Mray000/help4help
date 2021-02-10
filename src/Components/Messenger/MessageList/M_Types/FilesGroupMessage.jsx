import { Modal } from "react-bootstrap";
import fileSize from "filesize";
import React, { useRef, useState } from "react";
import { truncate } from "../../../../utils/truncate";
import document_icon from "./../../../../images/document.svg";
import "../../Messenger.scss";

const FilesGroupMessage = ({ files, preview = null }) => {
  let a = useRef();
  const [photo, setPhoto] = useState("");
  return (
    <>
      {files.map((f) => {
        let image = f.type.includes("image");
        return (
          <div
            key={files.indexOf(f)}
            className="message_file"
            style={{
              width: `${
                50 +
                (f.name.length > f.size.length
                  ? f.name.length > 40
                    ? truncate(f.name, 30).length
                    : f.name.length
                  : f.size.length) *
                  6
              }px`,
            }}
            onClick={(e) => {
              if (!preview && !image) {
                e.stopPropagation();
                a.current.click();
              }
              if (!preview && image) {
                e.stopPropagation();
                setPhoto(f.file);
              }
            }}
          >
            {image ? (
              <div className="file_mini_img_container">
                <img src={f.file} alt="биба" />
              </div>
            ) : (
              <img
                src={document_icon}
                alt="биба"
                style={{
                  width: "30px",
                }}
              />
            )}
            <div>
              <div style={{ color: "white" }}>
                {f.name.length > 40 ? truncate(f.name, 30) : f.name}
              </div>
              <div style={{ color: "#E1BEE1" }}>{fileSize(f.size)}</div>
            </div>
            {!preview && (
              <>
                {!image && (
                  <a download={f.name} ref={a} href={f.file}>
                    {}
                  </a>
                )}
              </>
            )}
          </div>
        );
      })}
      {!preview && <FilePhotoPreviw photo={photo} setPhoto={setPhoto} />}
    </>
  );
};

const FilePhotoPreviw = ({ setPhoto, photo }) => {
  return (
    <Modal
      show={Boolean(photo)}
      onHide={() => setPhoto("")}
      className="photos_preview_global_container"
    >
      <div className="prt" style={{ position: "relative" }}>
        {/* <FontAwesomeIcon
          icon={faTimes}
          onClick={(e) => {
            e.stopPropagation();
            setShowPhoto([false, ""]);
          }}
          style={{ position: "absolute", top: "2%", left: "90%" }}
        /> */}
        <img src={photo} alt="" />
      </div>
    </Modal>
  );
};

export default FilesGroupMessage;
