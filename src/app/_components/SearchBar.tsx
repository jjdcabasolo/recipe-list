"use client";

import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";

export const SearchBar = () => {
  return (
    <InputBase
      placeholder="Search here…"
      inputProps={{ "aria-label": "search" }}
      size="small"
      endAdornment={<Search sx={{ ml: 2 }} />}
      sx={(theme) => ({
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        border: `1px solid ${theme.palette.text.primary}`,
        padding: theme.spacing(1, 3),
        "& input": {
          padding: 0,
        },
        width: 400,
      })}
    />
  );
};
