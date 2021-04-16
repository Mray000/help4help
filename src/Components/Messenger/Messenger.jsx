import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Preloader from "../../mini-components/Preloader";
import {
  AddDialogUser,
  SetMessages,
  set_current_self_id,
  set_dialog_index,
} from "../../Redux/Reducer/MessengerReducer";
import { getAuthId } from "../../Redux/Selectors/AuthSelectors";
import {
  getCurrentSelfId,
  getDialogsList,
} from "../../Redux/Selectors/MessengerSelector";
import { getCurrentSelf } from "../../utils/GetCurrentSelf";
import { withAuthRedirect } from "../../utils/WithAuthRedirect";
import DialogsList from "./DialogsList/DialogsList";
import MessegeList from "./MessageList/MessageList";
import "./Messenger.scss";

const Messenger = () => {
  let dialogs = useSelector(getDialogsList);
  let current_self_id = useSelector(getCurrentSelfId);
  let my_id = useSelector(getAuthId);
  let current_self_id_query = getCurrentSelf();
  const dispatch = useDispatch();
  let current_dialog = dialogs.find((d) => d.user_id === current_self_id_query);
  let current_self = current_dialog?.self;

  if (!current_dialog) dispatch(AddDialogUser(current_self_id_query));

  useEffect(() => {
    dispatch(set_dialog_index(dialogs?.indexOf(current_dialog)));
  }, [current_self_id]);
  useEffect(() => {
    if (current_dialog) dispatch(SetMessages(current_dialog.id));
  }, []);

  if (!dialogs) return <Preloader />;

  if (!dialogs.length) return <div>U not messaging</div>;

  if (!current_self) return <Preloader />;

  return (
    <div className="row global_messanger_container">
      <DialogsList
        dialogs_list_global={dialogs}
        current_self_id={current_self_id_query}
      />
      <div className="col-1"></div>

      {current_self_id !== current_self_id_query ? (
        <div className="col-8">
          <Preloader width={50} />
        </div>
      ) : (
        <MessegeList
          current_self={current_self}
          dialogs={dialogs}
          unread_messages={current_dialog.unread_messages}
          dialog_id={current_dialog.id}
        />
      )}
    </div>
  );
};

export default withAuthRedirect(Messenger);
