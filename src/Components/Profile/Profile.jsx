import {
  faArrowAltCircleUp,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faPaperPlane,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import {
  AddReview,
  GetProfile,
  UpdatePhoto,
} from "../../Redux/Reducer/ProfileReducer";
import { SetError, SetRedirect } from "../../Redux/Reducer/AppReducer";
import { toBase64 } from "../../utils/toBase64";
import { useParams } from "react-router";
import Preloader from "../../mini-components/Preloader";
import { getCurrentProfileId } from "../../utils/GetCurrentSelf";
const ava = "https://mir-avatarok.3dn.ru/_si/0/84829236.jpg";

const Profile = ({ profile, dispatch, my_id }) => {
  const { id } = useParams();
  const is_my_profile = id === my_id;
  const info_reviews = useRef();
  useEffect(() => {
    dispatch(GetProfile(id));
  }, []);
  const [is_submit, setIsSubmit] = useState(false);
  let grade = useRef(0);
  let review_input = useRef();
  const reviews = [
    {
      profile: {
        name: "Aboba",
        surname: "Kukurov",
        id: 90,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 4,
      text:
        "Невероятный человек, очень умен, пунктуален и добр! Сразу после начала общения, он произвел на меня большое впечателние и я поняла, что это именно тот кто сможет обучить меня капрофильскому гей сексу.",
    },
    {
      profile: {
        name: "ДАбаДбадДАб",
        surname: "KOlllololg",
        id: 30,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 2,
      text: "Хуня какая-то",
    },
    {
      profile: {
        name: "Lolik",
        surname: "Partizan",
        id: 10,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 5,
      text: "Ну такой вопстановительно расскеслительный ауешник",
    },
    {
      profile: {
        name: "Rujgdsg",
        surname: "Akgljds",
        id: 70,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 3,
      text: "Крассава чел ваще маолчек крутой очень прям мне понрав.",
    },
    {
      profile: {
        name: "Aboba",
        surname: "Kukurov",
        id: 90,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 4,
      text:
        "Невероятный человек, очень умен, пунктуален и добр! Сразу после начала общения, он произвел на меня большое впечателние и я поняла, что это именно тот кто сможет обучить меня капрофильскому гей сексу.",
    },
    {
      profile: {
        name: "ДАбаДбадДАб",
        surname: "KOlllololg",
        id: 30,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 2,
      text: "Хуня какая-то",
    },
    {
      profile: {
        name: "Lolik",
        surname: "Partizan",
        id: 10,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 5,
      text: "Ну такой вопстановительно расскеслительный ауешник",
    },
    {
      profile: {
        name: "Rujgdsg",
        surname: "Akgljds",
        id: 70,
        ava:
          "https://tehnografi.com/wp-content/uploads/2019/08/1566746059_823_%D0%A2%D0%BE%D0%BF-5-Discord-%D0%B1%D0%BE%D1%82%D0%BE%D0%B2-%D0%BA%D0%B0%D0%B6%D0%B4%D1%8B%D0%B9-%D0%B4%D0%BE%D0%BB%D0%B6%D0%B5%D0%BD-%D0%B8%D0%BC%D0%B5%D1%82%D1%8C.jpg",
      },
      grade: 3,
      text: "Крассава чел ваще маолчек крутой очень прям мне понрав.",
    },
  ];
  reviews.forEach((r) => {
    r.profile.name_surname = r.profile.name + " " + r.profile.surname;
    r.review = { grade: r.grade, text: r.text };
  });
  if (!profile.id) return <Preloader />;
  if (profile.id !== getCurrentProfileId()) return <Preloader />;
  return (
    <div className="global_profile_container">
      <div style={{ alignSelf: "center" }}>
        <div className="profile_avatar_edit">
          <div className="avatar_container">
            <div
              className="center_img"
              style={{ height: "300px", width: "300px" }}
            >
              <img
                src={profile.ava || ava}
                alt="📷"
                className="avatar"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="down">
              <label
                htmlFor="update_photo"
                onClick={(e) => {
                  if (!is_my_profile) {
                    e.preventDefault();
                    dispatch(SetRedirect("/messenger?self=" + profile.id));
                  }
                }}
              >
                <div>
                  <FontAwesomeIcon
                    icon={faArrowAltCircleUp}
                    size="1x"
                    style={{ marginRight: "10px" }}
                  />
                  <span>{is_my_profile ? "Edit photo" : "Send Message"}</span>
                </div>
              </label>
              <input
                id="update_photo"
                type="file"
                name="update_photo"
                onChange={async (e) => {
                  if (is_my_profile) {
                    let img = await toBase64(e.target.files[0]);
                    dispatch(UpdatePhoto(img));
                  }
                }}
              />
            </div>
          </div>
        </div>
        {/* <Button
            style={{ backgroundColor: "black", color: "white", width: "100%" }}
            onClick={() => dispatch(SetRedirect("/profile/edit"))}
          >
            Update Profile
          </Button> */}
      </div>
      <div className="info_reviews" ref={info_reviews}>
        <div className="info">
          <div className="info_header">
            <div>Profile</div>
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              color="black"
              onClick={() =>
                info_reviews.current.scrollTo({
                  left: 1000,
                  behavior: "smooth",
                })
              }
            />
          </div>
          <div className="name_user_form">
            <div className="name_surname">
              <div className="user_form">
                <div className="name_form_title">First name</div>
                <div className="name_form_value">{profile.name}</div>
              </div>
              <div className="user_form">
                <div className="name_form_title">Last name</div>
                <div className="name_form_value">{profile.surname}</div>
              </div>
            </div>
            <div className="full_user_form">
              <div className="full_user_title">Country</div>
              <div className="full_user_value">{profile.country}</div>
            </div>
            <div className="full_user_form">
              <div className="full_user_title">Email</div>
              <div className="full_user_value">{profile.email}</div>
            </div>
            <div className="full_user_form">
              <div className="full_user_title">To teach</div>
              <div className="full_user_value">
                {profile.subjects.to_teach.map((s, i) => (
                  <span>
                    {s +
                      (i === profile.subjects.to_teach.length - 1 ? "." : ", ")}
                  </span>
                ))}
              </div>
            </div>
            <div className="full_user_form">
              <div className="full_user_title">To learn</div>
              <div className="full_user_value">
                {profile.subjects.to_learn.map((s, i) => (
                  <span>
                    {s +
                      (i === profile.subjects.to_learn.length - 1 ? "." : ", ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="reviews">
          <div className="reviews_header">
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              color="black"
              onClick={() =>
                info_reviews.current.scrollTo({
                  left: 0,
                  behavior: "smooth",
                })
              }
            />
            <div>Reviews</div>
          </div>
          <div className="reviews_container">
            {profile.reviews.length ? (
              <>
                {profile.reviews.map((r) => (
                  <div className="review">
                    <div className="review_header">
                      <div
                        className="center_img"
                        style={{ height: "28px", width: "28px" }}
                      >
                        <img src={r.profile.ava} alt="avatar" />{" "}
                      </div>
                      <span style={{ marginLeft: "5px" }}>
                        {r.profile.name_surname}
                      </span>
                      <span style={{ color: "gold", marginLeft: "5px" }}>
                        {(() => {
                          let stars = [];
                          for (let i = 0; i < r.review.grade; i++)
                            stars.push(<FontAwesomeIcon icon={faStar} />);
                          return stars;
                        })()}
                      </span>
                    </div>
                    <div className="review_content">{r.review.text}</div>
                  </div>
                ))}
              </>
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "25px",
                  color: "black",
                  fontWeight: 600,
                }}
              >
                {!is_my_profile
                  ? "Be the first!"
                  : "Reviews about you will be here!"}
              </div>
            )}
          </div>
          <div className="reviews_input_container">
            {is_my_profile ? (
              <span>Reviews about you!</span>
            ) : profile.reviews.find((r) => r.profile.id === my_id) ? (
              <span>Thank for review!😊</span>
            ) : (
              <>
                <input placeholder="leave a review..." ref={review_input} />
                <div
                  className="reviews_stars"
                  ref={(ref) => {
                    if (ref) {
                      let stars = Array.from(ref.children);
                      stars.forEach((star) => {
                        star.addEventListener("mouseenter", function () {
                          stars.forEach(
                            (s) => s.id <= this.id && (s.style.color = "gold")
                          );
                        });
                        star.addEventListener("mouseleave", () => {
                          stars.forEach(
                            (s) =>
                              (s.style.color =
                                s.id <= grade.current ? "gold" : "white")
                          );
                        });
                        star.addEventListener("mousedown", function () {
                          grade.current = Number(this.id);
                        });
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faStar} id={1} />
                  <FontAwesomeIcon icon={faStar} id={2} />
                  <FontAwesomeIcon icon={faStar} id={3} />
                  <FontAwesomeIcon icon={faStar} id={4} />
                  <FontAwesomeIcon icon={faStar} id={5} />
                </div>
                {!is_submit ? (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="paper_plane"
                    onClick={() => {
                      if (grade.current) {
                        dispatch(
                          AddReview(profile.id, {
                            text: review_input.current.value,
                            grade: grade.current,
                          })
                        );
                        setIsSubmit(true);
                      } else dispatch(SetError("Rate it!"));
                    }}
                  />
                ) : (
                  <Preloader width="30px" height="25px" />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
