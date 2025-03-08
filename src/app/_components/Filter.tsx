"use client";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent } from "react";

export const FILTER_OPTIONS = Object.freeze({
  yes: "Yes",
  no: "No",
});

export const Filter = () => {
  const [filter, setFilter] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setFilter((e) => (e.length > 0 && e === value ? "" : value));
  };

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
