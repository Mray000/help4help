import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddMessage, EditMessage } from "../../Redux/Reducer/DialogsReducer";
import AudioMessage from "./AudioMessage";
import PhotoPreviewModal from "./PhotoPreviewModal";
import "./Messanger.scss";
import "emoji-mart/css/emoji-mart.css";

const MessageForm = ({
  display_global_none,
  reply_messages_id,
  setReplyMessage,
  edit_message,
  setEditMessage,
}) => {
  const mobile = false;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [src, setSrc] = useState([]);
  const dispatch = useDispatch();
  const [display_emoji, setDisplay_emoji] = useState(false);
  const [display_none, setDisplay] = useState(false);
  let form = React.useRef(null);
  useEffect(() => {
    if (form.current && reply_messages_id.length) {
      form.current[1].focus();
    }
  }, [reply_messages_id]);
  useEffect(() => {
    if (edit_message != null && form.current) {
      var reactHandlerKey = Object.keys(form.current).filter(function (item) {
        return item.indexOf("__reactEventHandlers") >= 0;
      });
      var reactHandler = form.current[reactHandlerKey[0]];
      reactHandler.setMessageValue();
      form.current[1].focus();
    }
  }, [edit_message]);
  return (
    <Formik
      onSubmit={(values, actions) => {
        if (values.message) {
          if (edit_message != null) {
            dispatch(EditMessage(edit_message.id, values.message));
            setEditMessage(null);
            actions.resetForm();
          } else
            dispatch(
              AddMessage(
                values.message,
                null,
                null,
                reply_messages_id.length ? reply_messages_id : null
              )
            );
          setReplyMessage([]);
          actions.resetForm();
        } else if (reply_messages_id.length) {
          dispatch(AddMessage(values.message, null, null, reply_messages_id));
          setReplyMessage([]);
          actions.resetForm();
        }
      }}
      initialValues={{ message: "", add_photo: "" }}
    >
      {({ handleSubmit, setFieldValue, values, handleChange, ...props }) => (
        <Form
          onSubmit={handleSubmit}
          className={`add_message_in_${mobile ? "mobile_" : ""}container ${
            display_global_none ? "display_none" : ""
          }`}
          setMessageValue={() => setFieldValue("message", edit_message.message)}
          ref={form}
        >
          <PhotoPreviewModal
            src={src}
            show={show}
            handleClose={handleClose}
            AddMessage={AddMessage}
          />
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
                let mass = [];
                if (e.target.files.length) {
                  for (let i = 0; i < e.target.files.length; i++) {
                    mass.push(window.URL.createObjectURL(e.target.files[i]));
                  }
                  setSrc(mass);
                  handleShow();
                }
              }}
            />
          </div>
          <Field
            name="message"
            // cols="40"
            // row="8"
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
              {/* <Picker
                set="apple"
                onSelect={(e) => {
                  setFieldValue("message", values.message + e.native);
                }}
                theme="dark"
              /> */}
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
          <AudioMessage
            submit={() => handleSubmit()}
            setDisplay={setDisplay}
            display={display_none}
            message_dirty={Boolean(values.message)}
          />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(MessageForm);

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
