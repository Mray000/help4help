import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../mini-components/Preloader";
import { SetMessages } from "../../Redux/Reducer/DialogsReducer";
import { getMessages } from "../../Redux/Selectors/DialogsSelector";
import { withAuthRedirect } from "../../utils/WithAuthRedirect";
import DialogsList from "./DialogsList/DialogsList";
import MessegeList from "./MessageList/MessageList";
import "./Messenger.scss";

const Messenger = () => {
  const messages = useSelector(getMessages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetMessages());
  }, []);
  // if (!messages) {
  //   setInterval(() => {
  //     dispatch(SetMessages());
  //   }, 3000);
  //   return <Preloader />;
  // }
  if (!messages.length) return <Preloader />;
  return (
    <div className="row global_messanger_container">
      <DialogsList />
      <div className="col-1"></div>
      <MessegeList />
    </div>
  );
};

export default withAuthRedirect(Messenger);
