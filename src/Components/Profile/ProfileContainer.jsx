import React from "react";
import { Route, Switch } from "react-router";
import { withAuthRedirect } from "../../utils/WithAuthRedirect.jsx";
import Profile from "./Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Selectors/ProfileSelectors";
import { getMyId } from "../../Redux/Selectors/AuthSelectors";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const my_id = useSelector(getMyId);
  const profile = useSelector(getProfile);
  return (
    <Switch>
      <Route
        exact
        path="/profile/edit"
        render={() => <ProfileEdit my_id={my_id} />}
      />
      <Route
        path="/profile/:id"
        render={() => (
          <Profile profile={profile} dispatch={dispatch} my_id={my_id} />
        )}
      />
    </Switch>
  );
};

const ProfileEdit = ({ my_id }) => {
  return <div>Edit</div>;
};

export default withAuthRedirect(ProfileContainer);
