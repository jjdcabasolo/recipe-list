"use client";

import { Add } from "@mui/icons-material";
import { Box, Divider, Fab, Paper, Typography, Stack } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import recipeList from "@/recipeList.json";
import { useCallback, useMemo } from "react";
import { redirect } from "next/navigation";

export const RecipeList = () => {
  const hasData = useMemo(() => recipeList.length > 0, []);

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
        <Stack spacing={3}>
          {hasData ? (
            recipeList.map((e, i) => (
              <Stack spacing={3} key={e.title}>
                <RecipeCard
                  author={e.author}
                  date={e.date}
                  favorite={e.favorite}
                  image={e.image}
                  instructions={e.instructions}
                  title={e.title}
                />
                {recipeList.length > i + 1 && <Divider variant="fullWidth" />}
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
