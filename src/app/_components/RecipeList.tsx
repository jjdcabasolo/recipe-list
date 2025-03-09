"use client";

import { Add } from "@mui/icons-material";
import { Box, Divider, Fab, Paper, Typography, Stack } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import { useCallback, useMemo } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { SORT_OPTIONS } from "./SortByTitle";
import { FILTER_OPTIONS } from "./Filter";

export const RecipeList = () => {
  const recipeList = useAppSelector((state) => state.recipe.recipeList);
  const sort = useAppSelector((state) => state.recipe.sort);
  const filter = useAppSelector((state) => state.recipe.filter);
  const hasData = useMemo(() => recipeList.length > 0, [recipeList]);

  const recipeListToDisplay = useMemo(() => {
    let recipeListCopy = [...recipeList];

    switch (filter) {
      case FILTER_OPTIONS.yes:
        recipeListCopy = [...recipeListCopy.filter((e) => e.favorite)];
        break;
      case FILTER_OPTIONS.no:
        recipeListCopy = [...recipeListCopy.filter((e) => !e.favorite)];
        break;
      case FILTER_OPTIONS.all:
      default:
        recipeListCopy = [...recipeListCopy];
        break;
    }

    switch (sort) {
      case SORT_OPTIONS.asc:
        return [
          ...recipeListCopy.sort((a, b) => a.title.localeCompare(b.title)),
        ];
      case SORT_OPTIONS.desc:
        return [
          ...recipeListCopy.sort((a, b) => b.title.localeCompare(a.title)),
        ];
      case SORT_OPTIONS.none:
      default:
        return [...recipeListCopy];
    }
  }, [sort, recipeList, filter]);

  const handleRedirect = useCallback(() => {
    redirect("/add");
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Paper
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: `${theme.shape.borderRadius * 2}px`,
          height: "calc(100vh - 200px)",
          overflowY: "auto",
          padding: theme.spacing(3),
          width: "100%",
        })}
      >
        <Stack spacing={3} sx={{ height: "100%" }}>
          {hasData ? (
            recipeListToDisplay.map((e, i) => (
              <Stack spacing={3} key={e.title}>
                <RecipeCard
                  author={e.author}
                  date={e.date}
                  favorite={e.favorite}
                  image={e.image}
                  instructions={e.instructions}
                  title={e.title}
                />
                {recipeList.length > i + 1 ? (
                  <Divider variant="fullWidth" />
                ) : (
                  <Box />
                )}
              </Stack>
            ))
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">No Records Found!</Typography>
            </Box>
          )}
        </Stack>
      </Paper>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", right: "-24px", top: "16px" }}
        onClick={handleRedirect}
      >
        <Add />
      </Fab>
    </Box>
  );
};
