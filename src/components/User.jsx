import { useDispatch, useSelector } from "react-redux";
import { selectUserDispatch } from "../store/userSlice";

const User = ({ data }) => {
  const dispacth = useDispatch();
  const { selectUser, onlineUsers } = useSelector((state) => state.user);
  const isOnline = onlineUsers?.includes(data._id);
  function selectUserHandler() {
    dispacth(selectUserDispatch(data));
  }

  return (
    <div
      onClick={() => selectUserHandler(data)}
      className={`flex gap-4 p-2 rounded-md items-center  bg-clip-padding backdrop-filter backdrop-blur-lg cursor-pointer bg-opacity-40 user mb-1 ${
        selectUser?._id === data?._id ? "user-dashboard" : ""
      }`}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="w-12">
          <img src={data.profileimg} alt="image" className="" />
        </div>
      </div>
      <div>
        <p className=" capitalize text-md"> {data.username}</p>
      </div>
    </div>
  );
};

export default User;
