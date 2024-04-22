import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [gender, setGender] = useState("");
  async function handleForm(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/user/register`,
        { ...user, gender },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div
      className=" bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-6
    "
    >
      <h1 className="text-center text-white text-4xl uppercase font-semibold shadow-sm font-sans mb-3">
        Sign UP
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
          type="text"
          name="fullname"
          placeholder="Fullname"
          className=" w-80 px-4 py-2 border-b-2  focus:border-b-gray-300 outline-none bg-transparent text-gray-200 text-md md:text-md"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className=" w-80 px-4 py-2 border-b-2  focus:border-b-gray-300 outline-none bg-transparent text-gray-200 text-md md:text-md"
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
        <input
          type="password"
          name="cpassword"
          placeholder="Conform Password"
          className=" w-80 px-4 py-2 border-b-2  focus:border-b-gray-300 outline-none bg-transparent text-gray-200 text-md md:text-md"
          onChange={(e) =>
            setUser({ ...user, [e.target.name]: e.target.value })
          }
        />
        <div className="flex gap-4">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Male</span>
              <input
                checked={gender === "male"}
                type="checkbox"
                className="ms-2 checkbox border-2 border-gray-200"
                onChange={() => setGender("male")}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text text-md">Female</span>
              <input
                checked={gender === "female"}
                type="checkbox"
                className="ms-2 checkbox border-2 border-gray-200"
                onChange={() => setGender("female")}
              />
            </label>
          </div>
        </div>
        <div className="text-[18px]">
          If you are already register.{" "}
          <span
            className="hover:text-white cursor-pointer font-mono"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
        <button className="mt-3 px-4 pt-1 pb-2 text-2xl text-gray-200 border-2 rounded-md hover:transition-all hover:delay-100 font-semibold">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
