"use client";

import { Add } from "@mui/icons-material";
import { Box, Divider, Fab, Paper, Typography } from "@mui/material";
import { RecipeCard } from "./RecipeCard";
import recipeList from "@/recipeList.json";
import Link from "next/link";

export const RecipeList = () => {
  const hasData = recipeList.length > 0;

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.shape.borderRadius * 2}px`,
        padding: theme.spacing(2),
        width: "100%",
        position: "relative",
        height: "calc(100vh - 184px)",
      })}
    >
      <Link href="/add">
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", right: "24px", top: "24px" }}
        >
          <Add />
        </Fab>
      </Link>
      {hasData ? (
        recipeList.map(() => (
          <>
            <RecipeCard
              author="author"
              date="01/01/2001"
              title="title"
              subtitle="subtitle"
              key={1}
            />
            <Divider variant="fullWidth" />
          </>
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
    </Paper>
  );
};
