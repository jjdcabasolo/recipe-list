"use client";

import { Box, FormHelperText, useTheme } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RecipeFormType } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useAppDispatch } from "@/lib/hooks";
import { uploadImageThunk } from "@/lib/features/recipe/recipeSlice";

export const ImagePicker = ({
  recipeForm,
}: Readonly<{
  recipeForm: UseFormReturn<RecipeFormType>;
}>) => {
  const theme = useTheme()
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = recipeForm;
  const dispatch = useAppDispatch();

  const inputFile = useRef<HTMLInputElement>(null);

  const [uploadedFilePath, setUploadedFile] = useState<string>(getValues("image"));

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;

    if (file) {
      const formData = new FormData();

      formData.append("image", file[0]);

      try {
        dispatch(uploadImageThunk(formData))
          .unwrap()
          .then((response) => {
            setValue("image", response.path);
            setUploadedFile(response.path);
          });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    register("image", { required: "Image is required." });
  }, []);

  return (
    <Box sx={{ width: "100%", cursor: "pointer" }} onClick={handleClick}>
      {uploadedFilePath.length > 0 ? (
        <Image
          src={uploadedFilePath}
          alt="Image picker icon"
          width="400"
          height="200"
          style={{ objectFit: "cover", width: "inherit", aspectRatio: 3 / 4, borderRadius:`${theme.shape.borderRadius * 2}px` }}
        />
      ) : (
        <Image
          src="/image-picker.png"
          alt="Image picker icon"
          width="400"
          height="200"
          style={{ objectFit: "cover", width: "inherit", aspectRatio: 3 / 4, borderRadius:`${theme.shape.borderRadius * 2}px` }}
        />
      )}
      <input
        type="file"
        id="file"
        ref={inputFile}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      {"image" in errors && (
        <FormHelperText error>{errors.image?.message}</FormHelperText>
      )}
    </Box>
  );
};
