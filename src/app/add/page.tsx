"use client";

import { Grid2, Stack } from "@mui/material";
import { BackButton } from "./_components/BackButton";
import { RecipeForm } from "./_components/RecipeForm";
import { ImagePicker } from "./_components/ImagePicker";
import { useForm } from "react-hook-form";
import { RecipeFormType } from "@/types";

const defaultValues: RecipeFormType = {
  author: "",
  email: "",
  title: "",
  instructions: "",
  image: "",
};

export default function AddPage() {
  const addRecipeForm = useForm({
    defaultValues,
  });

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 3 }} sx={{ py: 3 }}>
        <Stack spacing={2}>
          <BackButton />
          <ImagePicker addRecipeForm={addRecipeForm} />
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 9 }} sx={{ py: 3 }}>
        <RecipeForm addRecipeForm={addRecipeForm} />
      </Grid2>
    </Grid2>
  );
}
