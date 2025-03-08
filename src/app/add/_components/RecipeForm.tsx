"use client";

import { Stack, TextField, Button, Box } from "@mui/material";

export const RecipeForm = () => {
  return (
    <Stack spacing={2}>
      <TextField id="name" label="Your Name" variant="standard" />
      <TextField id="email" label="Email Address" variant="standard" />
      <TextField id="title" label="Title" variant="standard" />
      <TextField
        id="description"
        label="Description"
        multiline
        rows={4}
        variant="standard"
      />
      <TextField
        id="ingredients"
        label="Ingredients"
        multiline
        rows={4}
        variant="standard"
      />
      <TextField
        id="instructions"
        label="Instructions"
        multiline
        rows={4}
        variant="standard"
      />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
        <Button variant="contained">Save</Button>
      </Box>
    </Stack>
  );
};
