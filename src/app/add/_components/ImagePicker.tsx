"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useRef } from "react";

export const ImagePicker = () => {
  const inputFile = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  return (
    <Box sx={{ width: "100%", cursor: "pointer" }} onClick={handleClick}>
      <Image
        src={`/image-picker.png`}
        alt="Image picker icon"
        width="400"
        height="300"
        style={{ objectFit: "contain", width: "inherit", aspectRatio: 3 / 4 }}
      />
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
      />
    </Box>
  );
};
