"use client";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const SORT_OPTIONS = Object.freeze({
  none: "",
  asc: "asc",
  desc: "desc",
});

export const SortByTitle = () => {
  const [sort, setSort] = useState<string>(SORT_OPTIONS.none);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Sort by Title</Typography>
      <FormControl size="small" fullWidth>
        <Select id="sort-by-title" value={sort} onChange={handleChange}>
          {Object.values(SORT_OPTIONS).map((e) => (
            <MenuItem value={e} key={e}>
              {e !== "" ? e.toUpperCase() : <Box component="em">None</Box>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};
