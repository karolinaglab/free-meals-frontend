export interface SearchMealApiResponse {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
  [key: string]: string | undefined;
}