import { DeletePostFunction, default as ProfileReducer } from "./ProfileReducer";

let state = {
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
};

it("delete post", () => {
  //1.test dat
  let action = DeletePostFunction(1);
  //2.action
  let newState = ProfileReducer(state, action);
  //3.expected
  expect(newState.posts.length).toBe(2);
});


