import { Grid2, Stack } from "@mui/material";
import { SortByTitle } from "./_components/SortByTitle";
import { Filter } from "./_components/Filter";
import { RecipeList } from "./_components/RecipeList";

export default function Home() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, md: 4 }} sx={{ py: 3 }}>
        <Stack spacing={4}>
          <SortByTitle />
          <Filter />
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 8 }} sx={{ py: 3 }}>
        <RecipeList />
      </Grid2>
    </Grid2>
  );
}
