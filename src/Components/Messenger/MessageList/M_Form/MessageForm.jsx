import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddMessage,
  EditMessage,
  IsTyping,
  NotTyping,
} from "../../../../Redux/Reducer/MessengerReducer";
import AudioMessageInput from "./AudioMessageInput";
import PreviewModal from "./PreviewModal";
import "emoji-mart/css/emoji-mart.css";
import "../../Messenger.scss";
import { faPaperclip, faSmile } from "@fortawesome/free-solid-svg-icons";
import { getCurrentSelf } from "../../../../utils/GetCurrentSelf";
import { getAuthId } from "../../../../Redux/Selectors/AuthSelectors";
import { getDialogsList } from "../../../../Redux/Selectors/MessengerSelector";
import { Picker } from "emoji-mart";

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
  const [srcOfImg, setSrcOfImg] = useState([]);
  const [srcOfFiles, setSrcOfFiles] = useState([]);
  const dispatch = useDispatch();
  const [display_emoji, setDisplay_emoji] = useState(false);
  const [display_none, setDisplay] = useState(false);
  let message_ref = useRef(null);
  let formik = useRef(null);
  let timer;
  let typing = useRef(false);
  const to = getCurrentSelf();
  const chat_room_id = useSelector(getDialogsList).find((d) => d.self.id === to)
    .id;
  const my_id = useSelector(getAuthId);
  useEffect(() => {
    if (message_ref.current && reply_messages_id.length)
      message_ref.current.focus();
  }, [reply_messages_id]);

  useEffect(() => {
    if (edit_message && formik.current) {
      formik.current.setFieldValue("message", edit_message.text);
      console.log("даб я");
    }
  }, [edit_message]);
  return (
    <Formik
      onSubmit={(values, actions) => {
        if (values.message) {
          if (edit_message) {
            dispatch(
              EditMessage(
                my_id,
                to,
                chat_room_id,
                edit_message.id,
                values.message
              )
            );
            setEditMessage(0);
          } else {
            dispatch(
              AddMessage(
                values.message,
                null,
                null,
                null,
                reply_messages_id.length ? reply_messages_id : null
              )
            );
            setReplyMessage([]);
          }
        } else if (reply_messages_id.length) {
          dispatch(
            AddMessage(values.message, null, null, null, reply_messages_id)
          );
          setReplyMessage([]);
        }
        clearTimeout(timer);
        typing.current = false;
        actions.resetForm();
      }}
      innerRef={formik}
      initialValues={{ message: "", add_photo: "" }}
    >
      {({ handleSubmit, setFieldValue, values, handleChange, ...props }) => (
        <Form
          onSubmit={handleSubmit}
          className={`add_message_in_${mobile ? "mobile_" : ""}container ${
            display_global_none ? "display_none" : ""
          }`}
          onChange={(e) => {
            if (!e.target.value) {
              dispatch(NotTyping(my_id, to));
              typing.current = false;
              return;
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
              dispatch(NotTyping(my_id, to));
              typing.current = false;
            }, 5000);
            if (!typing.current) {
              dispatch(IsTyping(my_id, to, 1));
              typing.current = true;
            }
          }}
        >
          <PreviewModal
            srcOfImg={srcOfImg}
            setSrcOfImg={setSrcOfImg}
            srcOfFiles={srcOfFiles}
            setSrcOfFiles={setSrcOfFiles}
            show={show}
            handleClose={handleClose}
            AddMessage={AddMessage}
          />
          <div className="add_photo_container">
            <label htmlFor="add_photo" className="icon_opacity">
              <FontAwesomeIcon
                icon={faPaperclip}
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
              innerRef={message_ref}
              autoFocus
              onChange={(e) => {
                let massOfImg = [];
                let massOfFile = [];
                [...e.target.files].forEach((f) => {
                  let extension = f.name.slice(
                    f.name.lastIndexOf(".") + 1,
                    f.name.length
                  );
                  if (
                    extension === "txt" ||
                    extension === "docx" ||
                    extension === "doc" ||
                    extension === "pptx"
                  )
                    massOfFile.push(f);
                  else massOfImg.push(window.URL.createObjectURL(f));
                });
                setSrcOfImg(massOfImg);
                setSrcOfFiles(massOfFile);
                handleShow();
              }}
            />
          </div>
          <Field
            name="message"
            placeholder="type..."
            as="textarea"
            className={`add_message ${display_none && "display_none"}`}
            onKeyPress={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                handleSubmit();
                event.preventDefault();
              }
            }}
            onChange={handleChange}
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
              />
            </div>
            <div className="icon_opacity">
              <FontAwesomeIcon
                icon={faSmile}
                color="white"
                size={mobile ? "6x" : "lg"}
                className={`${display_none && "display_none"}`}
                onClick={() => {
                  setDisplay_emoji(!display_emoji);
                }}
              />
            </div>
          </div>
          <AudioMessageInput
            IsTyping={IsTyping}
            NotTyping={NotTyping}
            my_id={my_id}
            chat_room_id={chat_room_id}
            submit={() => handleSubmit()}
            setDisplay={setDisplay}
            display={display_none}
            message_dirty={Boolean(values.message)}
            to={to}
          />
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;

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
