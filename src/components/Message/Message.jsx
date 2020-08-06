import React from "react";
import moment from "moment";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "message__other";
};

const timeFromNow = (timestamp) => moment(timestamp).fromNow();

const displayCommentOrImage = (message, content) => {
  if (message.hasOwnProperty("image") && !message.hasOwnProperty("content")) {
    return (
      <img src={message.image} alt="Message img" className="message__image" />
    );
  }

  return;
};

const Message = ({ message, user }) => {
  const { timestamp, content } = message;
  const { avatar, name } = message.user;
  console.log(message.user.id, user.id);
  return (
    <div
      className={`${
        message.user.id === user.id
          ? "message__self__view"
          : "message__other__view"
      } message_view`}
    >
      <img src={avatar} alt="avatar" className="avatar" />
      <div className={isOwnMessage(message, user)}>
        <span className="sender__name">{name}</span>
        <span className="timestamp">{timeFromNow(timestamp)}</span>
        <br />
        <p className="message-content">{content}</p>
      </div>
    </div>
  );
};

export default Message;
