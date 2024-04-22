import React from "react";
import Sidebar from "./Sidebar";
import Messagebar from "./Messagebar";

const HomePage = () => {
  return (
    <div className="h-full w-full bg-green-100  bg-clip-padding backdrop-filter backdrop-blur-none bg-opacity-10 flex text-white">
      <Sidebar />
      <Messagebar />
    </div>
  );
};

export default HomePage;
