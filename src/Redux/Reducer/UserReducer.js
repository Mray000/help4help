import { UsersAPI, FollowAPI } from "../../axios/axios";
import { ArrayMaping, ArrayFilter } from "../../utils/ArrayTreatment";

const UN_FOLLOW = "UN-FOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET-USERS";
const PAGE_CHOISE = "PAGE-CHOISE";
const TOTAL_USERS_COUNT = "TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = " TOGGLE-IS-FETCHING";
const TOGGLE_IS_FOLLOWING = "TOGGLE_IS_FOLLOWING";

let InintialState = {
  users: null,
  pageSize: 3,
  totalUsersCount: null,
  currentPage: 1,
  isFetching: true,
  isFollowing: [],
};

const UsersReducer = (state = InintialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: ArrayMaping(state.users, "id", action, { followed: true }),
      };
    case UN_FOLLOW:
      return {
        ...state,
        users: ArrayMaping(state.users, "id", action, { followed: false }),
      };
    case PAGE_CHOISE:
      return { ...state, currentPage: action.pageNumber };
    case TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case SET_USERS:
      return { ...state, users: action.users };
    case TOGGLE_IS_FOLLOWING:
      return {
        ...state,
        isFollowing: action.expected
          ? [...state.isFollowing, action.id]
          : ArrayFilter(state.isFollowing, null, action.id),
      };
    default:
      return state;
  }
};

export const follow = (uderId) => ({
  type: FOLLOW,
  id: uderId,
});

export const unfollow = (uderId) => ({
  type: UN_FOLLOW,
  id: uderId,
});

export const SetUsers = (users) => ({
  type: SET_USERS,
  users,
});

export const PageChanged = (pageNumber) => ({
  type: PAGE_CHOISE,
  pageNumber,
});

export const TotalUsersCount = (totalUsersCount) => ({
  type: TOTAL_USERS_COUNT,
  totalUsersCount,
});

export const ToggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

const ToggleIsFollowing = (expected, id) => ({
  type: TOGGLE_IS_FOLLOWING,
  expected,
  id,
});

export const GetUsers = (filter = null) => async (dispatch, getState) => {
  let data = await UsersAPI.getUsers(getState().Auth.id, filter);
  dispatch(SetUsers(data));
};

const FollowUnfollow = async (dispatch, id, action, ApiRequest) => {
  dispatch(ToggleIsFollowing(true, id));
  let data = await ApiRequest(id);
  if (data.resultCode === 0) {
    dispatch(action(id));
    dispatch(ToggleIsFollowing(false, id));
  }
};

export const Follow = (id) => {
  return (dispatch) => {
    FollowUnfollow(dispatch, id, follow, FollowAPI.Follow);
  };
};

export const UnFollow = (id) => {
  return (dispatch) => {
    FollowUnfollow(dispatch, id, unfollow, FollowAPI.UnFollow);
  };
};

export default UsersReducer;
