import { ProfileAPI } from "../../axios/axios";
import { ArrayFilter } from "../../utils/ArrayTreatment";
import { getCurrentSelf } from "../../utils/GetCurrentSelf";
import { SetRedirect } from "./AppReducer";

const SET_PROFILE = "profile/SET-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const RESET_PROFILE = "profile/RESET_PROFILE";
const UPDATE_PHOTO = "profile/UPDATE_PHOTO";
const ADD_REVIEW = "profile/ADD_REVIEW";

let InintialState = {
  id: null,
  name: null,
  surname: null,
  ava: null,
  email: null,
  birthday: null,
  subjects: {
    to_learn: null,
    to_teach: null,
  },
  reviews: null,
};

const ProfileReducer = (state = InintialState, action) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        aboutMe: action.status,
      };
    case UPDATE_PHOTO:
      return {
        ...state,
        ava: action.img,
      };
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
      };

    case SET_PROFILE:
      return action.profile;
    case RESET_PROFILE:
      return InintialState;
    default:
      return state;
  }
};

export const reset_profile = () => ({ type: RESET_PROFILE });

const update_photo = (img) => ({ type: UPDATE_PHOTO, img: img });

// export const AddPostFunction = (text) => ({
//   type: ADD_POST,
//   post_text: text,
// });

// export const DeletePostFunction = (postId) => ({
//   type: DELETE_POST,
//   postId,
// });

// export const SetStatus = (status) => ({
//   status: status,
//   type: SET_STATUS,
// });

// export const SetPhoto = (photos) => ({
//   photos: photos,
//   type: SET_PHOTO,
// });

// export const SetProfile = (profile) => ({
//   profile: profile,
//   type: SET_PROFILE,
// });

export const set_profile = (profile) => ({
  profile: profile,
  type: SET_PROFILE,
});

export const add_review = (review) => ({
  review: review,
  type: ADD_REVIEW,
});

export const GetProfile = (id) => async (dispatch) => {
  let data = await ProfileAPI.getProfile(id);
  if (data.no_user) dispatch(SetRedirect("/page_not_found"));
  else dispatch(set_profile(data));
};

export const UpdatePhoto = (img) => async (dispatch) => {
  dispatch(update_photo(img));
  await ProfileAPI.updatePhoto(img);
};
export const AddReview = (to, review) => async (dispatch, getState) => {
  let me = await ProfileAPI.getProfile(getState().Auth.id);
  let profile = {
    id: me.id,
    name_surname: me.name + " " + me.surname,
    ava: me.ava,
  };
  dispatch(add_review({ profile: profile, review: review }));
  await ProfileAPI.addReview(to, review);
};

// export const UpdateProfile = (profile) => async (dispatch) => {
//   let data = await ProfileAPI.UpdateProfile(profile);
//   if (data.resultCode === 0) {
//     await dispatch(Redirect(true));
//     dispatch(Redirect(false));
//   }
//   if (data.resultCode === 1) {
//     let preErrorLink = data.messages[0].slice(30, -1);
//     let errorLink = preErrorLink[0].toLowerCase() + preErrorLink.slice(1);
//     dispatch(
//       stopSubmit("profile_edit", {
//         [errorLink]: `error  ${errorLink} link`,
//       })
//     );
//   }
// };

// export const GetStatus = (id) => {
//   return (dispatch) => {
//     ProfileAPI.getStatus(id).then((data) => {
//       dispatch(SetStatus(data));
//     });
//   };
// };

export default ProfileReducer;
