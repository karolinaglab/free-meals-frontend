import { IngredientMeasure } from "./ingredient_measure";

export interface Meal {
  readonly idMeal: string;
  readonly strMeal: string;
  readonly strDrinkAlternate: string | null;
  readonly strCategory: string;
  readonly strArea: string;
  readonly strInstructions: string;
  readonly strMealThumb: string;
  readonly strTags: string;
  readonly strYoutube: string;
  readonly ingredients: IngredientMeasure[];
  readonly strSource: string | null;
  readonly strImageSource: string | null;
  readonly strCreativeCommonsConfirmed: string | null;
  readonly dateModified: boolean | null;
}
