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
    <div
      onClick={(e) => e.stopPropagation()}
      onFocus={(e) => e.stopPropagation()}
    >
      {files.map((f) => {
        let image = f.type.includes("image");
        let length =
          f.name.length > f.size.length ? f.name.length : f.size.length;
        return (
          <div
            key={files.indexOf(f)}
            className="message_file"
            style={{
              width: `${length > 30 ? 180 : length * 6}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!preview && !image) a.current.click();
              if (!preview && image) setPhoto(f.file);
            }}
          >
            {image ? (
              <div className="file_mini_img_container">
                <img src={f.file} alt="биба" />
              </div>
            ) : (
              <img src={document_icon} alt="биба" style={{ width: "30px" }} />
            )}
            <div>
              <div style={{ color: "white" }}>{truncate(f.name, 30)}</div>
              <div style={{ color: "wheat" }}>{fileSize(f.size)}</div>
            </div>
            {!preview && (
              <>
                {!image && (
                  <a
                    download={f.name}
                    ref={a}
                    href={f.file}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {}
                  </a>
                )}
              </>
            )}
          </div>
        );
      })}
      {!preview && <FilePhotoPreviw photo={photo} setPhoto={setPhoto} />}
    </div>
  );
};

const FilePhotoPreviw = ({ setPhoto, photo }) => {
  return (
    <Modal
      show={Boolean(photo)}
      onHide={(e) => setPhoto("")}
      className="photos_preview_global_container"
    >
      <img src={photo} alt="" />
    </Modal>
  );
};

export default FilesGroupMessage;
