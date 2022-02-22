import { IngredientMeasure } from "./IngredientMeasure";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  ingredients?: IngredientMeasure[];
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}
