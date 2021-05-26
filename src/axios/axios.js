import * as axios from "axios";
import { io } from "socket.io-client";

let instance = axios.create({
  baseURL: "http://localhost:3010/",
  withCredentials: false,
  headers: {
    Autorisation: localStorage.getItem("token") || "",
  },
});

const CreateInstance = (token) => {
  instance = axios.create({
    baseURL: "http://localhost:3010/",
    withCredentials: false,
    headers: { Autorisation: token || "" },
  });
};

export const UsersAPI = {
  getUsers(id, filter) {
    return instance
      .post(`users`, { id: id, filter: filter })
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

export const MessengerAPI = {
  io,
  connect(id) {
    this.io = io("http://localhost:3010", { query: "id=" + id });
    return this.io;
  },
  disconnect() {
    this.io.disconnect();
  },
  IsTyping(from, to, type) {
    this.io.emit("typing", {
      from: from,
      to: to,
      type: type,
    });
  },
  NotTyping(from, to) {
    this.io.emit("not_typing", {
      from: from,
      to: to,
    });
  },
  messagesRead(from, to, c_r_id) {
    this.io.emit("message_read", {
      from: from,
      to: to,
      chat_room_id: c_r_id,
    });
  },
  addMessage(from, to, message) {
    return this.io.emit("message", { from: from, to: to, message: message });
  },
  getMessages(id) {
    return instance.get("messages?cr_id=" + id).then((promise) => promise.data);
  },
  deleteMessage(from, d_id, m_ids, u_m) {
    this.io.emit("delete_message", {
      from: from,
      d_id: d_id,
      m_ids: m_ids,
      u_m: u_m,
    });
  },
  editMessage(from, to, d_id, m_id, new_text) {
    this.io.emit("edit_message", {
      from: from,
      to: to,
      d_id: d_id,
      m_id: m_id,
      new_text: new_text,
    });
  },
  video(img, to) {
    this.io.emit("video", {
      img: img,
      to: to,
    });
  },
  getSocket() {
    return this.io;
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
  addReview(to, review) {
    return instance.post("profile/review", { to: to, review: review });
  },
};

export const AuthAPI = {
  signUp(user) {
    return instance.post("signup", user).then((promise) => promise.data);
  },
  signIn(email, password) {
    return instance
      .post("signin", { email: email, password: password })
      .then((promise) => promise.data)
      .then((data) => {
        CreateInstance(data.token);
        return data;
      });
  },
  getMe() {
    return instance
      .get(`me`)
      .then((promise) => promise.data)
      .then((data) => {
        if (data.no_token) {
          CreateInstance("");
          localStorage.setItem("token", "");
        }
        return data;
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
