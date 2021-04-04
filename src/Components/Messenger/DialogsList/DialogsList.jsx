import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Dialog.scss";
import { getIsTyping } from "../../../Redux/Selectors/MessengerSelector";
import DialogItem from "./DialogItem.jsx";
import DialogsListHeader from "./DialogsListHeader";

const DialogsList = ({ dialogs_list_global, current_self_id }) => {
  const [people_list, SetPeople_list] = useState(dialogs_list_global);

  const IsTyping = useSelector(getIsTyping);

  const FilterDialogs = (s) => {
    SetPeople_list(() =>
      dialogs_list_global.filter((e) =>
        e.self.name_surname.toLowerCase().includes(s)
      )
    );
  };
  useEffect(() => SetPeople_list(dialogs_list_global), [dialogs_list_global]);

  return (
    <div className="col-3 dialogs_list_global_container">
      <DialogsListHeader FilterDialogs={FilterDialogs} />
      {[...people_list]
        .sort((f, s) => s.new_messages - (f.new_messages || 0))
        .map((d) => (
          <DialogItem
            id={d.self.id}
            last_message={d.last_message}
            self={d.self}
            is_typing={IsTyping.find((t) => t.from === d.self.id)}
            online={d.self.online}
            active={current_self_id === d.self.id}
            new_messages={d.new_messages}
            unread_messages={d.unread_messages}
          />
        ))}
    </div>
  );
};

export default DialogsList;
