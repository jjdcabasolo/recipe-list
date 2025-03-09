"use client";

import { addRecipe } from "@/lib/features/recipe/recipeSlice";
import { useAppDispatch } from "@/lib/hooks";
import { RecipeCardType, RecipeFormType } from "@/types";
import { Stack, TextField, Button, Box } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { redirect } from "next/navigation";

export const RecipeForm = ({
  addRecipeForm,
}: Readonly<{
  addRecipeForm: UseFormReturn<RecipeFormType>;
}>) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = addRecipeForm;

  const onSubmit = (data: RecipeFormType) => {
    const today = new Date();
    const newRecipe: RecipeCardType = {
      author: data.author,
      date: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`,
      email: data.email,
      favorite: false,
      image: data.image,
      instructions: data.instructions,
      title: data.title,
    };

    dispatch(addRecipe({ newRecipe }));
    redirect("/");
  };

  return (
    <form>
      <Stack spacing={2}>
        <TextField
          id="author"
          label="Your Name"
          variant="standard"
          error={"author" in errors}
          helperText={errors.author?.message}
          {...register("author", { required: "Your Name is required." })}
        />
        <TextField
          id="email"
          label="Email Address"
          variant="standard"
          error={"email" in errors}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email Address is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format.",
            },
          })}
        />
        <TextField
          id="title"
          label="Title"
          variant="standard"
          error={"title" in errors}
          helperText={errors.title?.message}
          {...register("title", { required: "Title is required." })}
        />
        <TextField
          id="instructions"
          label="Instructions"
          multiline
          rows={4}
          variant="standard"
          error={"instructions" in errors}
          helperText={errors.instructions?.message}
          {...register("instructions", {
            required: "Instructions are required.",
          })}
        />
        <Box
          sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
