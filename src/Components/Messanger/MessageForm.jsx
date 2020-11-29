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

const MessageForm = () => {
  const mobile = false;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [src, setSrc] = useState("");
  const dispatch = useDispatch();
  const [display_emoji, setDisplay_emoji] = useState(false);
  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
    return this;
  };
  const [display_none, setDisplay] = useState(false);
  return (
    <Formik
      onSubmit={(values, actions) => {
        if (values.message.length > 30) {
          let message = values.message.split("");
          let countDel = Math.ceil(message.length / 30);
          let i = 1;
          while (i <= countDel + 1) {
            if (i !== countDel + 1) message.insert(i * 30 - i - 1, "\n");
            else message.insert(i * 30 - i, "\n");
            i++;
          }
          message = message.join("");
          dispatch(AddMessage(message));
        } else if (values.message) dispatch(AddMessage(values.message));
        actions.resetForm();
      }}
      initialValues={{ message: "" }}
    >
      {({ handleSubmit, setFieldValue, values, ...props }) => (
        <Form
          onSubmit={handleSubmit}
          className={`add_message_in_${mobile ? "mobile_" : ""}container`}
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
                setSrc(window.URL.createObjectURL(e.target.files[0]));
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
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
