"use client";

import {
  Alert,
  AlertColor,
  Snackbar as MuiSnackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSnackbar } from "@/lib/features/snackbar/snackbarSlice";

export const RecipeSnackbar = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.snackbar.message);
  const open = useAppSelector((state) => state.snackbar.open);
  const severity = useAppSelector((state) => state.snackbar.severity);

  const handleClose = (_, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setSnackbar({ open: !open, message: "", severity: "" }));
  };

  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity as AlertColor}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};
