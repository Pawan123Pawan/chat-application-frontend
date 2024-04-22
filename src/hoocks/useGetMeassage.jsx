import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/userSlice";

const useGetMeassage = () => {
  const { selectUser } = useSelector((state) => state.user);
  const dispacth = useDispatch();
  useEffect(() => {
    // 661a4e99defa226b3e48382f
    const fetchMessage = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectUser?._id}`
        );
        dispacth(setMessages(res.data.message));
      } catch (error) {
        console.log(error.message);
      }
    };
    if (selectUser) {
      fetchMessage();
    }
  }, [selectUser?._id, setMessages]);
  return null;
};

export default useGetMeassage;
