"use client";

import { useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
// import Image from "next/image";

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
  title,
  subtitle,
}: Readonly<{
  author: string;
  date: string;
  title: string;
  subtitle: string;
}>) => {
  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);

    if (dateObj instanceof Date && !isNaN(Number(dateObj))) {
      return "Not a valid date.";
    }

    return `${
      MONTH_NAMES[dateObj.getMonth()]
    } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  }, [date]);

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia title="Your title">
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {/* <Image
            src="https://media.themoviedb.org/t/p/w440_and_h660_face/hGaUNLF5VZbg9ovPTyjm9Rv5xWz.jpg"
            alt="A card media URL"
            width={400}
            height={300}
          /> */}
        </div>
      </CardMedia>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
          <Button variant="text">See more</Button>
          <Stack direction="row">
            <Typography variant="subtitle1">Added by: {author}</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="subtitle1">Date: {formattedDate}</Typography>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
};
