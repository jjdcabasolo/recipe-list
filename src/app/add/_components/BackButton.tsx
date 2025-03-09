"use client";

import { ChevronLeft } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useCallback } from "react";

export const BackButton = () => {
  const handleRedirect = useCallback(() => {
    redirect("/");
  }, []);

  return (
    <Stack
      direction="row"
      spacing={2}
      onClick={handleRedirect}
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <IconButton>
        <ChevronLeft />
      </IconButton>
      <Typography variant="h6">Back</Typography>
    </Stack>
  );
};
