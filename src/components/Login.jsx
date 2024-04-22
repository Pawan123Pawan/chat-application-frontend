import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthUser } from "../store/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const dispacth = useDispatch();
  async function handleForm(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/login`,
        {
          ...user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      dispacth(setAuthUser(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div
      className=" bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-6 py-10
    "
    >
      <h1 className="text-center text-white text-4xl uppercase font-semibold shadow-sm font-sans mb-3">
        Login
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleForm}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className=" w-80 px-4 py-2 border-b-2  focus:border-b-gray-300 outline-none bg-transparent text-gray-200 text-md md:text-md "
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className=" w-80 px-4 py-2 border-b-2  focus:border-b-gray-300 outline-none bg-transparent text-gray-200 text-md md:text-md"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <div className="text-[18px]">
          If you are not register.{" "}
          <span
            className="hover:text-white cursor-pointer font-mono"
            onClick={() => navigate("/register")}
          >
            SignUp
          </span>
        </div>
        <button className="mt-3 px-4 pt-1 pb-2 text-2xl text-gray-200 border-2 rounded-md hover:transition-all hover:delay-100 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};
