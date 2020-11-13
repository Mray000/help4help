import { ProfileAPI } from "../../axios/axios";
import { ArrayFilter } from "../../utils/ArrayTreatment";
import { stopSubmit } from "redux-form";

const ADD_POST = "profile/ADD-POST";
const DELETE_POST = "profile/DELETE_POST";
const SET_PROFILE = "profile/SET-PROFILE";
const SET_STATUS = "profile/SET-STATUS";
const SET_PHOTO = "profile/SET_PHOTO";
const REDIRECT = "profile/REDIRECT";

let InintialState = {
  profile: {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
    },
    fullName: null,
    lookingForAJob: false,
    lookingForAJobDescription: null,
    photos: { small: null, large: null },
    userId: null,
  },
  posts: [
    { id: 1, text: "blabla", likeCount: 12 },
    { id: 2, text: "axaxxax", likeCount: 16 },
    { id: 3, text: "box-foy", likeCount: 1 },
  ],
  redirecting: false,
};

const ProfileReducer = (state = InintialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let NewPost = {
        id: 5,
        text: action.post_text,
        likeCount: 0,
      };
      return { ...state, posts: [...state.posts, NewPost] };
    case DELETE_POST:
      return {
        ...state,
        posts: ArrayFilter(state.posts, "id", action),
      };
    case SET_STATUS:
      return {
        ...state,
        profile: { ...state.profile, aboutMe: action.status },
      };
    case SET_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case REDIRECT:
      return {
        ...state,
        redirecting: action.redirect,
      };
    default:
      return state;
  }
};

export const AddPostFunction = (text) => ({
  type: ADD_POST,
  post_text: text,
});

export const DeletePostFunction = (postId) => ({
  type: DELETE_POST,
  postId,
});

export const SetStatus = (status) => ({
  status: status,
  type: SET_STATUS,
});

export const SetPhoto = (photos) => ({
  photos: photos,
  type: SET_PHOTO,
});

export const SetProfile = (profile) => ({
  profile: profile,
  type: SET_PROFILE,
});

export const Redirect = (redirect) => ({
  redirect: redirect,
  type: REDIRECT,
});

export const GetProfile = (id) => async (dispatch) => {
  dispatch(SetProfile({ aboutMe: null }));
  let profileData = await ProfileAPI.getProfile(id);
  let statusData = await ProfileAPI.getStatus(id);
  dispatch(SetProfile(profileData));
  dispatch(SetStatus(statusData));
};

export const UpdateStatus = (status) => async (dispatch) => {
  let data = await ProfileAPI.UpdateStatus(status);
  if (data.resultCode === 0) {
    dispatch(SetStatus(status));
  }
};

export const UpdatePhoto = (file) => async (dispatch) => {
  let data = await ProfileAPI.UpdatePhoto(file);
  if (data.resultCode === 0) {
    dispatch(SetPhoto(data.data.photos));
  }
};

export const UpdateProfile = (profile) => async (dispatch) => {
  let data = await ProfileAPI.UpdateProfile(profile);
  if (data.resultCode === 0) {
    await dispatch(Redirect(true));
    dispatch(Redirect(false));
  }
  if (data.resultCode === 1) {
    let preErrorLink = data.messages[0].slice(30, -1);
    let errorLink = preErrorLink[0].toLowerCase() + preErrorLink.slice(1);
    dispatch(
      stopSubmit("profile_edit", {
        [errorLink]: `error  ${errorLink} link`,
      })
    );
  }
};

// export const GetStatus = (id) => {
//   return (dispatch) => {
//     ProfileAPI.getStatus(id).then((data) => {
//       dispatch(SetStatus(data));
//     });
//   };
// };

export default ProfileReducer;
