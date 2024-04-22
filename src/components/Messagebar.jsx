import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { LuSend } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import useGetMeassage from "../hoocks/useGetMeassage";
import axios from "axios";
import { setMessages } from "../store/userSlice";
import Chat from "./Chat";
import useGetRealTimeMessage from "../hoocks/useGetRealTimeMessage";
const Messagebar = () => {
  const text = useRef(null);
  const { selectUser, messages, authUser, onlineUsers } = useSelector(
    (state) => state.user
  );
  const dispacth = useDispatch();
  const isOnline = onlineUsers?.includes(selectUser?._id);
  useGetMeassage();
  useGetRealTimeMessage();
  const [filtermessages, setFilterMessage] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [check, setCheck] = useState(false);

  async function handleMessageSend(e) {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectUser?._id}`,
        { message: text?.current?.value.trim() },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispacth(setMessages([...messages, res?.data?.newMessage]));
      text.current.value = "";
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCheck(false);
  }, []);

  function handleSearchTextChange(e) {
    setCheck(true);
    setSearchText(e.target.value);
    const filter = messages?.filter((user) =>
      user.message.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setFilterMessage(filter);
  }

  return (
    <>
      {selectUser ? (
        <div className="flex-3 w-full overflow-hidden ">
          <div className="flex items-center justify-between p-2 px-5  bg-clip-padding backdrop-filter backdrop-blur-lg cursor-pointer bg-opacity-40 w-full ">
            <div className="flex gap-4 items-center">
              <div className={`avatar ${isOnline ? "online" : ""} `}>
                <div className="w-12">
                  <img
                    src={`${
                      selectUser
                        ? selectUser?.profileimg
                        : "https://avatar.iran.liara.run/public/male"
                    }`}
                    alt="image"
                    className=""
                  />
                </div>
              </div>
              <div>
                <p className=" capitalize text-lg text-nowrap">
                  {selectUser ? selectUser.username : "user name here"}{" "}
                </p>
              </div>
            </div>
            <div className=" flex items-center gap-2  border-b-2 border-gray-200 px-2 my-2 pb-1">
              <input
                onChange={handleSearchTextChange}
                type="text"
                placeholder="search here..."
                className=" bg-transparent outline-none sm:w-30 md:w-48 text-lg text-white placeholder:text-white"
              />
              <div className="text-xl text-white cursor-pointer">
                <CiSearch />
              </div>
            </div>
          </div>
          {/* all messages are */}
          <div className=" custom-scrollbar h-[83vh] px-5">
            {check
              ? filtermessages?.map((message) => {
                  return <Chat key={message?._id} message={message} />;
                })
              : messages?.map((message) => {
                  return <Chat key={message?._id} message={message} />;
                })}
          </div>
          <form
            onSubmit={handleMessageSend}
            className="flex items-center justify-between px-5  w-full py-4  bg-clip-padding backdrop-filter backdrop-blur-lg cursor-pointer bg-opacity-40"
          >
            <input
              ref={text}
              type="text"
              placeholder="Type a message..."
              className="text-[16px] text-white outline-none bg-transparent w-full"
            />
            <button className="text-xl cursor-pointer" type="submit">
              <LuSend />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-center text-3xl font-semibold font-serif">
            Hi! {authUser?.username}
          </h1>
          <p className="text-white text-xl tracking-widest">
            Let's start conversation !!!
          </p>
        </div>
      )}
    </>
  );
};

export default Messagebar;
