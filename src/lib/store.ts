import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./features/recipe/recipeSlice";
import recipeList from "@/recipeList.json";
import { FILTER_OPTIONS } from "@/app/_components/Filter";
import { SORT_OPTIONS } from "@/app/_components/SortByTitle";

const reducer = {
  recipe: recipeReducer,
};

const preloadedState = {
  recipe: {
    filter: FILTER_OPTIONS.all,
    recipeList: [...recipeList],
    sort: SORT_OPTIONS.none,
  },
};

export const makeStore = () => {
  return configureStore({
    reducer,
    devTools: true,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
