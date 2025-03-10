"use client";

import {
  addRecipe,
  deleteRecipe,
  updateRecipe,
} from "@/lib/features/recipe/recipeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RecipeCardType, RecipeFormType } from "@/types";
import { Stack, TextField, Button, Box } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { redirect } from "next/navigation";
import { useCallback, useMemo } from "react";
import { setSnackbar } from "@/lib/features/snackbar/snackbarSlice";

type RecipeFormModeType = "add" | "update";

export const RecipeForm = ({
  mode,
  recipeForm,
}: Readonly<{
  mode: RecipeFormModeType;
  recipeForm: UseFormReturn<RecipeFormType>;
}>) => {
  const dispatch = useAppDispatch();
  const recipeList = useAppSelector((state) => state.recipe.recipeList);
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = recipeForm;

  const isAdd = useMemo(() => mode === "add", [mode]);
  const isUpdate = useMemo(() => mode === "update", [mode]);

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

    const isTitleExisting = recipeList.some((e) => e.title === data.title);

    if (isTitleExisting) {
      dispatch(
        setSnackbar({
          message: "Title should be unique",
          open: true,
          severity: "error",
        })
      );

      return;
    }

    if (isAdd) {
      dispatch(addRecipe({ newRecipe }));
    } else if (isUpdate) {
      dispatch(updateRecipe({ id: newRecipe.title, updatedRecipe: newRecipe }));
    }
    dispatch(
      setSnackbar({
        message: `${newRecipe.title} successfully ${isAdd ? "added" : ""}${
          isUpdate ? "updated" : ""
        }!`,
        open: true,
        severity: "success",
      })
    );
    redirect("/");
  };

  const handleDelete = useCallback(() => {
    const recipeTitle = getValues("title");

    dispatch(deleteRecipe({ id: recipeTitle }));
    dispatch(
      setSnackbar({
        message: `${recipeTitle} deleted!`,
        open: true,
        severity: "success",
      })
    );
    redirect("/");
  }, [dispatch, getValues]);

  return (
    <Box>
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
            disabled={isUpdate}
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ width: "100%" }}
            spacing={2}
          >
            {isUpdate && (
              <Button
                color="warning"
                variant="contained"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
