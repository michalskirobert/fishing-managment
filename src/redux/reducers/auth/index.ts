import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileId, UserDataProps } from "./types";
import { TokenProps } from "@src/api/service/auth/types";
import { toast } from "react-toastify";

const initialState: UserDataProps = {
  _id: "",
  email: "",
  permissions: [],
  permitNo: null,
  avatar: "",
  accountCreatedDate: "",
  lastVisitedDate: "",
  accessToken: null,
  isLogin: false,
  showMessage: false,
  profileId: ProfileId.Anonymous,
  registries: [],
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataProps | undefined>) => {
      return { ...state, ...action.payload, isLogin: !!action.payload };
    },
    setToken: (state, action: PayloadAction<TokenProps | null>) => {
      if (!action.payload?.token) {
        toast.error("Token nie został przekazany, zaraz nastąpi wylogowanie");

        location.href = "/sign-out";
        return;
      }

      state.accessToken = action.payload.token;
      state.showMessage = !!action.payload?.showMessage;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
