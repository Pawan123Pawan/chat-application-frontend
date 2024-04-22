import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import User from "./User";
import usegetOther from "../hoocks/usergetOther";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import axios from "axios";
import {
  selectUserDispatch,
  setAuthUser,
  setMessages,
  setOtherUser,
} from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  usegetOther();
  const { userOther } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterUsers, setFilterUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {setFilterUsers(userOther)},[]);

  async function logOutHandler() {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get("http://localhost:8080/api/v1/user/logout", {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUser(null));
      dispatch(selectUserDispatch(null));
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }
  function handleSearchTextChange(e) {
    setSearchText(e.target.value);
    const filter = userOther.filter((user) =>
      user.username.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );
    setFilterUsers(filter);

  }

  return (
    <div className=" flex flex-col w-[35%] min-w-64 shadow-2xl p-3">
      <div className="flex gap-3 items-center justify-between">
        <h1 className="text-3xl text-white  font-semibold font-sans w-full">
          Chat Application
        </h1>
        <div
          onClick={logOutHandler}
          className="text-2xl text-red-700 font-bold cursor-pointer relative group"
        >
          <RiLogoutCircleLine />
          <div
            className={`px-2 pb-1 user-dashboard text-white text-sm font-normal rounded-md absolute right-7 bottom-1  hidden group-hover:block`}
          >
            Logout
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-2 w-full border-b-2 border-gray-200 px-2 my-2">
        <input
          onChange={handleSearchTextChange}
          type="text"
          placeholder="search here..."
          className=" bg-transparent outline-none w-full text-lg"
        />
        <div className="text-xl">
          <CiSearch />
        </div>
      </div>
      <div className="mt-2  custom-scrollbar ">
        {filterUsers?.map((user, index) => (
          <User key={index} data={user} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
