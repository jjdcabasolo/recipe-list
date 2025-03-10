"use client";

import { Grid2, Stack } from "@mui/material";
import { BackButton } from "../add/_components/BackButton";
import { RecipeForm } from "../add/_components/RecipeForm";
import { ImagePicker } from "../add/_components/ImagePicker";
import { defaultValues as addDefaultValues } from "../add/page";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function UpdatePage() {
  const recipeList = useAppSelector((state) => state.recipe.recipeList);
  const updateId = useAppSelector((state) => state.recipe.updateId);
  const defaultValues = useMemo(() => {
    const recipeToUpdate = recipeList.find((e) => e.title === updateId);

    return recipeToUpdate ? { ...recipeToUpdate } : { ...addDefaultValues };
  }, [recipeList, updateId]);

  const recipeForm = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (updateId?.length <= 0) {
      redirect("/");
    }
  }, [updateId]);

  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 3 }} sx={{ py: 3 }}>
        <Stack spacing={2}>
          <BackButton />
          <ImagePicker recipeForm={recipeForm} />
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 9 }} sx={{ py: 3 }}>
        <RecipeForm recipeForm={recipeForm} mode="update" />
      </Grid2>
    </Grid2>
  );
}
