import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Init } from "@api/service/init/types";

export const PermissionsStatus = {
  uninitialized: "uninitialized",
  fullfiled: "fullfiled",
  rejected: "rejected",
} as const;

type TInitDataState = {
  initData: Init | null;
};

const initialState: TInitDataState = {
  initData: null,
};

export const initDataSlice = createSlice({
  name: "initData",
  initialState,
  reducers: {
    setInitData: (state, action: PayloadAction<Init>) => {
      state.initData = action.payload;
    },
  },
});

export const { setInitData } = initDataSlice.actions;

export default initDataSlice.reducer;
