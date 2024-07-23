import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HistoryPropsState = {
  previousPage: string;
};

const initialState: HistoryPropsState = {
  previousPage: "/",
};

const blacklist = ["/sign-in", "/sign-out"];

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setPreviousPage: (state, action: PayloadAction<string>) => {
      const pathname = action.payload;

      if (blacklist.includes(pathname)) {
        state.previousPage = "/";
      } else {
        state.previousPage = action.payload;
      }
    },
  },
});

export const { setPreviousPage } = historySlice.actions;

export default historySlice.reducer;
