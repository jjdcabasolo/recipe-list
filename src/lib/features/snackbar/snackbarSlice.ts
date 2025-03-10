import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface snackbarState {
  message: string;
  open: boolean;
  severity: string;
}

const initialState: snackbarState = {
  message: "",
  open: false,
  severity: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar: (state, action: PayloadAction<snackbarState>) => {
      state.message = action.payload.message;
      state.open = action.payload.open;
      state.severity = action.payload.severity;
    },
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
