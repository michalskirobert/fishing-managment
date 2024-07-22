import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HistoryPropsState = {
  previousPage: string;
};

const initialState: HistoryPropsState = {
  previousPage: "/",
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setPreviousPage: (state, action: PayloadAction<string>) => {
      const pathname = action.payload;

      if (pathname === "/sign-in") {
        state.previousPage = "/";
      } else {
        state.previousPage = action.payload;
      }
    },
  },
});

export const { setPreviousPage } = historySlice.actions;

export default historySlice.reducer;
