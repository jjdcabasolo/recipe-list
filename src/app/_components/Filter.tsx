"use client";

import { setFilter } from "@/lib/features/recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useMemo } from "react";

export const FILTER_OPTIONS = Object.freeze({
  all: "All",
  yes: "Yes",
  no: "No",
});

export const Filter = () => {
  const filter = useAppSelector((state) => state.recipe.filter);
  const recipeList = useAppSelector((state) => state.recipe.recipeList);
  const dispatch = useAppDispatch();

  const hasData = useMemo(() => recipeList.length > 0, [recipeList]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    dispatch(setFilter({ filter: value }));
  };

  if (!hasData) {
    return <></>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Filter</Typography>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Favorites?</FormLabel>
        <RadioGroup
          defaultValue="female"
          name="radio-buttons-group"
          value={filter}
          onChange={handleChange}
        >
          {Object.values(FILTER_OPTIONS).map((e) => (
            <FormControlLabel value={e} control={<Radio />} label={e} key={e} />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
