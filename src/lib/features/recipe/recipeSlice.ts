import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RecipeCardType } from "@/types";

export const uploadImageThunk = createAsyncThunk(
  "recipe/uploadImage",
  async (formData: FormData) => {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const res = await response.json();

    return res;
  }
);

interface RecipeState {
  filter: string;
  recipeList: RecipeCardType[];
  sort: string;
}

const initialState: RecipeState = {
  filter: "",
  recipeList: [],
  sort: "",
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (
      state,
      action: PayloadAction<{ newRecipe: RecipeCardType }>
    ) => {
      state.recipeList = [...state.recipeList, action.payload.newRecipe];
    },
    updateRecipe: (
      state,
      action: PayloadAction<{
        id: string;
        updatedRecipe: Partial<RecipeCardType>;
      }>
    ) => {
      const index = state.recipeList.findIndex(
        (e) => e.title === action.payload.id
      );

      if (index > -1) {
        const updatedRecipeList = [...state.recipeList];

        updatedRecipeList[index] = {
          ...updatedRecipeList[index],
          ...action.payload.updatedRecipe,
        };

        state.recipeList = [...updatedRecipeList];
      }
    },
    deleteRecipe: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.recipeList.findIndex(
        (e) => e.title === action.payload.id
      );

      if (index > -1) {
        const updatedRecipeList = [...state.recipeList];

        state.recipeList = [
          ...updatedRecipeList.slice(0, index),
          ...updatedRecipeList.slice(index + 1),
        ];
      }
    },
    setSort: (state, action: PayloadAction<{ sort: string }>) => {
      state.sort = action.payload.sort;
    },
    setFilter: (state, action: PayloadAction<{ filter: string }>) => {
      state.filter =
        state.filter.length > 0 && state.filter === action.payload.filter
          ? ""
          : action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadImageThunk.fulfilled, () => {});
  },
});

export const { addRecipe, updateRecipe, deleteRecipe, setSort, setFilter } =
  recipeSlice.actions;

export default recipeSlice.reducer;
