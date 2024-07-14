import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserDataProps } from "./types";

const initialState: UserDataProps = {
  _id: "",
  email: "",
  permissions: [],
  permitNo: null,
  avatar: "",
  accountCreatedDate: "",
  lastVisitedDate: "",
  accessToken: null,
  tokenExprTime: 0,
};

export const userSlice = createSlice({
  name: "oidc",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataProps | undefined>) => {
      return { ...state, ...action.payload };
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
