import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
  userOther: null,
  selectUser: null,
  messages: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUser: (state, action) => {
      state.userOther = action.payload;
    },
    selectUserDispatch: (state, action) => {
      state.selectUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setOtherUser,
  selectUserDispatch,
  setMessages,
  setOnlineUsers,
} = userSlice.actions;
export default userSlice.reducer;
