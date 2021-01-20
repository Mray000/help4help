import { Modal } from "react-bootstrap";
import fileSize from "filesize";
import React, { useRef, useState } from "react";
import { truncate } from "../../../../utils/truncate";
import document_icon from "./../../../../images/document.svg";
import "./../../Messanger.scss";

const FilesGroupMessage = ({ files, preview = null }) => {
  let a = useRef();
  const [show_photo, setShowPhoto] = useState([false, ""]);
  let urls;
  if (!preview) {
    urls = files.map((f) => window.URL.createObjectURL(f));
  }

  return (
    <>
      {files.map((f) => {
        let image = f.type.indexOf("image") !== -1;
        return (
          <div
            className="message_file"
            style={{
              width: `${
                50 +
                (f.name.length > 40
                  ? truncate(f.name, 30).length
                  : f.name.length) *
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
                setShowPhoto([true, urls[files.indexOf(f)]]);
              }
            }}
          >
            {image ? (
              <div className="file_mini_img_container">
                <img src={urls[files.indexOf(f)]} alt="биба" />
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
                {!f.type.indexOf("image") !== -1 && (
                  <a
                    download={f.name}
                    href={urls[files.indexOf(f)]}
                    ref={a}
                  ></a>
                )}
              </>
            )}
          </div>
        );
      })}
      {!preview && (
        <FilePhotoPreviw
          show={show_photo[0]}
          photo={show_photo[1]}
          setShowPhoto={setShowPhoto}
        />
      )}
    </>
    // </div>
  );
};

const FilePhotoPreviw = ({ show, setShowPhoto, photo }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        // e.target.stopPropagation();
        setShowPhoto([false, ""]);
      }}
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
        <img src={photo} alt="" style={{ width: "50%" }} />
      </div>
    </Modal>
  );
};

export default FilesGroupMessage;
