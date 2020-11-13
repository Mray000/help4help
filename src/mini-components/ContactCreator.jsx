import React from "react";
import github from "./../images/GitHub.png";
import vk from "./../images/Vk.png";
import facebook from "./../images/Facebook.png";
import instagram from "./../images/Instagram.png";
import twitter from "./../images/Twitter.png";
import website from "./../images/Website.png";
import youtube from "./../images/Youtube.png";
import mainLink from "./../images/MainLink.png";

const Contact = (link, text_img) => {
  var img = {
    github,
    vk,
    facebook,
    instagram,
    twitter,
    website,
    youtube,
    mainLink,
  };
  const ucSymbols = (text) => {
    if (text === "github") return "GitHub";
    return text[0].toUpperCase() + text.slice(1);
  };
  return (
    <>
      {link && (
        <div className="contact" key={text_img}>
          <img src={img[text_img]} alt="" className="contacts-icon" />
          <a href={"http://" + link}>{ucSymbols(text_img)}</a>
        </div>
      )}
    </>
  );
};

export default Contact;
