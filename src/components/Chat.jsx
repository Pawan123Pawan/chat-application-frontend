import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Chat = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${
        message?.senderId === authUser?._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profileimg
                : selectUser?.profileimg
            }
          />
        </div>
      </div>
      <div className="chat-header">
        {/* <time className="text-sm opacity-50 text-white ">12:45</time> */}
      </div>
      <div className={`chat-bubble text-white`}>{message?.message}</div>
    </div>
  );
};

export default Chat;
