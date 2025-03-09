"use client";

import { useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { Star } from "@mui/icons-material";
import type { RecipeCardType } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { updateRecipe } from "@/lib/features/recipe/recipeSlice";

const MONTH_NAMES = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

export const RecipeCard = ({
  author,
  date,
  favorite,
  image,
  instructions,
  title,
}: Readonly<RecipeCardType>) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);

    if (!(dateObj instanceof Date && !isNaN(Number(dateObj)))) {
      return "Not a valid date.";
    }

    return `${
      MONTH_NAMES[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  }, [date]);

  const handleFavoriteClick = useCallback(() => {
    dispatch(
      updateRecipe({
        id: title,
        updatedRecipe: {
          favorite: !favorite,
        },
      })
    );
  }, [dispatch, favorite, title]);

  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: `${theme.shape.borderRadius * 2}px`,
      }}
    >
      <CardMedia title={title}>
        <div style={{ position: "relative", width: "300px", height: "225px" }}>
          <Image
            src={image}
            alt={`${title}'s preview image.`}
            width={300}
            height={225}
            style={{
              objectFit: "cover",
              width: "inherit",
              aspectRatio: 3 / 4,
              borderRadius: `${theme.shape.borderRadius * 2}px`,
            }}
          />
          <IconButton
            color={favorite ? "warning" : "default"}
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => handleFavoriteClick()}
          >
            <Star />
          </IconButton>
        </div>
      </CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle2">{instructions}</Typography>
          <Button variant="text">See more</Button>
          <Stack direction="row">
            <Typography variant="subtitle2">Added by: {author}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="subtitle2">Date: {formattedDate}</Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
