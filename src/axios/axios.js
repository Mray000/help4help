import * as axios from "axios";

let instance;

export const UsersAPI = {
  getUsers(currentPage, pageSize) {
    return instance.get(`api/users/`).then((promise) => promise.data);
  },
};

export const FollowAPI = {
  UnFollow(id) {
    return instance.delete(`follow/${id}`).then((promise) => promise.data);
  },
  Follow(id) {
    return instance.post(`follow/${id}`).then((promise) => promise.data);
  },
};

export const ProfileAPI = {
  getProfile(id) {
    return instance.get(`profile/${id}`).then((promise) => promise.data);
  },
  UpdateStatus(status) {
    return instance
      .put(`profile/status`, {
        status: status,
      })
      .then((promise) => promise.data);
  },
  getStatus(id) {
    return instance.get(`profile/status/${id}`).then((promise) => promise.data);
  },
  UpdatePhoto(photo) {
    let formData = new FormData();
    formData.append("image", photo);

    return instance
      .put(`profile/photo`, formData)
      .then((promise) => promise.data);
  },
  UpdateProfile({
    aboutMe = null,
    lookingForAJob = null,
    lookingForAJobDescription = null,
    fullName = null,
    github = null,
    vk = null,
    facebook = null,
    instagram = null,
    twitter = null,
    website = null,
    youtube = null,
    mainLink = null,
  }) {
    return instance
      .put(`profile`, {
        fullName: fullName,
        aboutMe: aboutMe,
        lookingForAJob: lookingForAJob,
        lookingForAJobDescription: lookingForAJobDescription,
        contacts: {
          github: github === "github.com" ? null : github,
          vk: vk === "vk.com" ? null : vk,
          facebook: facebook === "facebook.com" ? null : facebook,
          instagram: instagram === "instagram.com" ? null : instagram,
          twitter: twitter === "twitter.com" ? null : twitter,
          website: website === "website.com" ? null : website,
          youtube: youtube === "youtube.com" ? null : youtube,
          mainLink: mainLink === "mainLink.com" ? null : mainLink,
        },
      })
      .then((promise) => promise.data);
  },
};

export const AuthAPI = {
  signIn(
    email,
    password,
    name,
    surname,
    LessonsForLearning,
    LessonsForHelping
  ) {
    return axios
      .post("https://morning-shore-22478.herokuapp.com/api/users/", {
        user: {
          name: name,
          surname: surname,
          email: email,
          country: "Russia",
          age: 16,
          password: password,
          subjects: {
            to_learn: LessonsForLearning,
            to_teach: LessonsForHelping,
          },
        },
      })
      .then((promise) => promise.data);
  },
  getMe() {
    return instance.get(`auth/me`).then((promise) => promise.data);
  },
  login(email, password) {
    return axios
      .post(`https://afternoon-scrubland-20123.herokuapp.com/api-token-auth/`, {
        username: "user",
        password: "useruser",
      })
      .then((promise) => {
        instance = axios.create({
          baseURL: "https://afternoon-scrubland-20123.herokuapp.com/",
          withCredentials: true,
          headers: {
            Authorization: `Token ${promise.data.token}`,
          },
        });
        return promise.data;
      });
  },
  logout() {
    return instance.delete(`auth/login`).then((promise) => promise.data);
  },
};

export const SecurityAPI = {
  getCaptcha() {
    return instance
      .get(`security/get-captcha-url`)
      .then((promise) => promise.data);
  },
};

export const onNewMessage = async function () {
  // let dispatch = useDispatch();
  let websocket = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  window.s = websocket.send.bind(websocket);
  return websocket;
};
