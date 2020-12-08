import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddMessage } from "../../Redux/Reducer/DialogsReducer";
import AudioMessage from "./AudioMessage";
import PhotoPreviewModal from "./PhotoPreviewModal";
import "./Messanger.scss";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const MessageForm = ({ display_global_none }) => {
  const mobile = false;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();
  const [display_emoji, setDisplay_emoji] = useState(false);
  const [display_none, setDisplay] = useState(false);
  return (
    <Formik
      onSubmit={(values, actions) => {
        // if (values.message.length > 30) {
        // let message = values.message.split("");
        // let countDel = Math.floor(message.length / 30);
        // let message2 = "";
        // let i = 1;
        // while (i <= countDel + 1) {
        //   let messageChast;
        //   let LastSpace;
        //   if (i === 1) {
        //     messageChast = message.slice(0, i * 30);
        //   } else {
        //     messageChast = message.slice(i * 30, (i + 1) * 30);
        //   }
        //   messageChast.forEach((s, sI) => {
        //     if (s === " ") {
        //       LastSpace = sI;
        //     }
        //   });
        //   messageChast = messageChast.insert(LastSpace, "\n");
        //   message2 = message2 + messageChast.join("");
        //   i++;
        // }
        // message = message2;
        if (values.message) dispatch(AddMessage(values.message));
        actions.resetForm();
      }}
      initialValues={{ message: "", add_photo: "" }}
    >
      {({ handleSubmit, setFieldValue, values, ...props }) => (
        <Form
          onSubmit={handleSubmit}
          className={`add_message_in_${mobile ? "mobile_" : ""}container ${
            display_global_none ? "display_none" : ""
          }`}
        >
          <PhotoPreviewModal src={src} show={show} handleClose={handleClose} />
          <div className="add_photo_container">
            <label htmlFor="add_photo">
              <FontAwesomeIcon
                icon="paperclip"
                color="white"
                size={mobile ? "6x" : "lg"}
                className={`${display_none && "display_none"}`}
              />
            </label>
            <Field
              id="add_photo"
              className="add_photo_input"
              type="file"
              name="add_photo"
              multiple
              onChange={(e) => {
                if (e.target.files.length > 0 && e.target.files.length < 2) {
                  setSrc(window.URL.createObjectURL(e.target.files[0]));
                }
                if (e.target.files.length > 1) {
                  setSrc(window.URL.createObjectURL(e.target.files[0]));
                }
                handleShow();
              }}
            />
          </div>
          <Field
            name="message"
            wrap="hard"
            placeholder="type..."
            as="textarea"
            className={`add_message ${display_none && "display_none"}`}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                handleSubmit();
                event.preventDefault();
              }
            }}
          />
          <div className="emoji_container">
            <div
              style={{
                display: display_emoji ? "block" : "none",
              }}
              className="emoji_picker"
            >
              <Picker
                set="apple"
                onSelect={(e) => {
                  setFieldValue("message", values.message + e.native);
                }}
                theme="dark"
              />
            </div>
            <FontAwesomeIcon
              icon="smile"
              color="white"
              size={mobile ? "6x" : "lg"}
              className={`${display_none && "display_none"}`}
              onClick={() => {
                setDisplay_emoji(!display_emoji);
              }}
            />
          </div>
          <AudioMessage setDisplay={setDisplay} display={display_none} />
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
