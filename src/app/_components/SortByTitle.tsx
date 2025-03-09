"use client";

import { setSort } from "@/lib/features/recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

export const SORT_OPTIONS = Object.freeze({
  none: "",
  asc: "asc",
  desc: "desc",
});

export const SortByTitle = () => {
  const sort = useAppSelector((state) => state.recipe.sort);
  const recipeList = useAppSelector((state) => state.recipe.recipeList);
  const dispatch = useAppDispatch();

  const hasData = useMemo(() => recipeList.length > 0, [recipeList]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSort({ sort: event.target.value }));
  };

  if (!hasData) {
    return <></>;
  }

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
