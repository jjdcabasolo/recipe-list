import { Grid2, Stack } from "@mui/material";
import { BackButton } from "./_components/BackButton";
import { RecipeForm } from "./_components/RecipeForm";
import { ImagePicker } from "./_components/ImagePicker";

export default function AddPage() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 4 }} sx={{ py: 3 }}>
        <Stack spacing={2}>
          <BackButton />
          <ImagePicker />
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }} sx={{ py: 3 }}>
        <RecipeForm />
      </Grid2>
    </Grid2>
  );
}
