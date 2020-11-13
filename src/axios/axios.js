import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "2e37b6a6-93bb-44bd-9465-737ce93e0752",
  },
});

export const UsersAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((promise) => promise.data);
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
  getMe() {
    return instance.get(`auth/me`).then((promise) => promise.data);
  },
  login(email, password, rememberMe, captcha = null) {
    return instance
      .post(`auth/login`, {
        email: email,
        password: password,
        rememberMe: rememberMe,
        captcha: captcha,
      })
      .then((promise) => promise.data);
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
