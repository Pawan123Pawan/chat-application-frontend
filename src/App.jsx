import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import { Login } from "./components/Login";
import HomePage from "./components/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./store/socketSlice";
import { setOnlineUsers } from "./store/userSlice";
import io from "socket.io-client";

const App = () => {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socketio = io(`http://localhost:8080/`, {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socketio));

      socketio?.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className=" h-screen flex justify-center items-center">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
