export type RecipeCardType = {
  author: string;
  date: string;
  email?: string;
  favorite: boolean;
  image: string;
  instructions: string;
  title: string;
};

export type RecipeFormType = Pick<
  RecipeCardType,
  "author" | "email" | "title" | "instructions" | "image"
>;
