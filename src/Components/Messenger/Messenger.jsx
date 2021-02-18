import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../mini-components/Preloader";
import { AddDialogUser } from "../../Redux/Reducer/MessengerReducer";
import { getDialogsList } from "../../Redux/Selectors/MessengerSelector";
import { useQuery } from "../../utils/useQuery";
import { withAuthRedirect } from "../../utils/WithAuthRedirect";
import DialogsList from "./DialogsList/DialogsList";
import MessegeList from "./MessageList/MessageList";
import "./Messenger.scss";

const Messenger = () => {
  let dialogs = useSelector(getDialogsList);
  let self_id = useQuery("self");
  const dispatch = useDispatch();
  let current = dialogs.find((d) => d.self.id === self_id);
  let current_self;
  if (current) current_self = current.self;
  else dispatch(AddDialogUser(self_id));
  if (!dialogs.length) {
    return <div>U not messaging</div>;
  }
  if (!dialogs) return <Preloader />;
  if (!current_self) return <Preloader />;
  return (
    <div className="row global_messanger_container">
      <DialogsList dialogs_list_global={dialogs} />
      <div className="col-1"></div>
      <MessegeList current_self={current_self} />
    </div>
  );
};

export default withAuthRedirect(Messenger);
