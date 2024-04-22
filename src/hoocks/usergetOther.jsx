import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../store/userSlice";

const usegetOther = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("http://localhost:8080/api/v1/alluser", {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        dispacth(setOtherUser(res?.data.users))
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  return null;
};

export default usegetOther;
