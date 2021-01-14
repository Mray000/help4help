import fileSize from "filesize";
import React, { useRef } from "react";
import { truncate } from "../../../../utils/truncate";
import document_icon from "./../../../../images/document.svg";
import "./../../Messanger.scss";

const FilesGroupMessage = ({ files, preview = null }) => {
  let a = useRef();
  let urls;
  if (!preview) {
    urls = files.map((f) => window.URL.createObjectURL(f));
  }
  return (
    <div className="message_files_container">
      {files.map((f) => {
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
              if (!preview) {
                e.stopPropagation();
                a.current.click();
              }
            }}
          >
            <img src={document_icon} alt="биба" style={{ width: "30px" }} />
            <div>
              <div style={{ color: "white" }}>
                {f.name.length > 40 ? truncate(f.name, 30) : f.name}
              </div>
              <div style={{ color: "#A5A5A5" }}>{fileSize(f.size)}</div>
            </div>
            {!preview && (
              <a download={f.name} href={urls[files.indexOf(f)]} ref={a}></a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilesGroupMessage;
